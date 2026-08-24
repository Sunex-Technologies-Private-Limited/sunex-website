using System.Diagnostics;
using System.Net;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Sunex.Api.Contracts;
using Sunex.Api.Data;
using Sunex.Api.Health;
using Sunex.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddJsonConsole();
builder.Services.AddSingleton<MySqlConnectionFactory>();
builder.Services.AddSingleton<ContactInquiryRepository>();
builder.Services.AddSingleton<ContactRateLimitService>();
builder.Services.AddHealthChecks().AddCheck<DatabaseHealthCheck>("database", failureStatus: HealthStatus.Unhealthy);
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("contact-write", httpContext => RateLimitPartition.GetFixedWindowLimiter(
        GetContactRateLimitPartition(httpContext),
        _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 8,
            Window = TimeSpan.FromMinutes(10),
            QueueLimit = 0,
            AutoReplenishment = true,
        }));
});

static string GetContactRateLimitPartition(HttpContext httpContext)
{
    // This private endpoint only accepts loopback traffic. The public Node gateway
    // supplies the client address after its managed-proxy trust boundary is applied.
    // Do not consume an arbitrary browser-supplied forwarded-address header here.
    var gatewayClientIp = httpContext.Request.Headers["X-Sunex-Client-IP"].FirstOrDefault();
    if (IPAddress.TryParse(gatewayClientIp, out var parsedClientIp)) return parsedClientIp.ToString();
    return httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
}

var bindUrl = builder.Configuration["SUNEX_API_BIND"] ?? "http://127.0.0.1:5090";
builder.WebHost.UseUrls(bindUrl);
var app = builder.Build();

app.UseRateLimiter();
app.Use(async (context, next) =>
{
    var stopwatch = Stopwatch.StartNew();
    await next();
    app.Logger.LogInformation("internal_request {Method} {Path} {StatusCode} {ElapsedMilliseconds}ms {TraceIdentifier}", context.Request.Method, context.Request.Path, context.Response.StatusCode, stopwatch.ElapsedMilliseconds, context.TraceIdentifier);
});

var internalApi = app.MapGroup("/internal").AddEndpointFilter(async (invocation, next) =>
{
    var remoteIp = invocation.HttpContext.Connection.RemoteIpAddress;
    if (remoteIp is null || !IPAddress.IsLoopback(remoteIp)) return Results.NotFound();
    return await next(invocation);
});

internalApi.MapHealthChecks("/health/live", new HealthCheckOptions { Predicate = _ => false });
internalApi.MapHealthChecks("/health/ready", new HealthCheckOptions { Predicate = check => check.Name == "database" });

internalApi.MapPost("/v1/contact-inquiries", async Task<Results<Ok<ContactInquiryResponse>, ValidationProblem, ProblemHttpResult>> (
    ContactInquiryRequest request,
    HttpContext context,
    ContactInquiryRepository repository,
    ContactRateLimitService contactRateLimits,
    ILogger<Program> logger,
    CancellationToken cancellationToken) =>
{
    var errors = ContactInquiryValidator.Validate(request);
    if (errors.Count > 0) return TypedResults.ValidationProblem(errors);

    var idempotencyKey = context.Request.Headers["Idempotency-Key"].FirstOrDefault();
    if (string.IsNullOrWhiteSpace(idempotencyKey) || idempotencyKey.Length > 72)
    {
        return TypedResults.Problem(statusCode: StatusCodes.Status400BadRequest, title: "A valid idempotency key is required.");
    }

    var normalized = ContactInquiryValidator.Normalize(request);
    try
    {
        var clientIp = GetContactRateLimitPartition(context);
        var clientFingerprint = context.Request.Headers["X-Sunex-Client-Fingerprint"].FirstOrDefault();
        if (!await contactRateLimits.TryConsumeAsync(clientIp, clientFingerprint, cancellationToken))
        {
            logger.LogWarning("contact_inquiry_rate_limited {RequestId}", context.TraceIdentifier);
            return TypedResults.Problem(statusCode: StatusCodes.Status429TooManyRequests, title: "Too many contact requests. Please try again later.");
        }

        var id = await repository.CreateOrGetAsync(normalized, idempotencyKey, cancellationToken);
        var requestId = Activity.Current?.Id ?? context.TraceIdentifier;
        logger.LogInformation("contact_inquiry_persisted {InquiryId} {Solution} {RequestId}", id, normalized.Solution, requestId);
        return TypedResults.Ok(new ContactInquiryResponse(true, id, requestId));
    }
    catch (Exception exception)
    {
        logger.LogError(exception, "contact_inquiry_persistence_failed {RequestId}", context.TraceIdentifier);
        return TypedResults.Problem(statusCode: StatusCodes.Status503ServiceUnavailable, title: "The enquiry service is temporarily unavailable.", extensions: new Dictionary<string, object?> { ["requestId"] = context.TraceIdentifier });
    }
}).RequireRateLimiting("contact-write");

app.Run();

public partial class Program;
