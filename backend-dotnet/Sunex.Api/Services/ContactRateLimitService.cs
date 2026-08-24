using System.Security.Cryptography;
using System.Text;
using MySqlConnector;
using Sunex.Api.Data;

namespace Sunex.Api.Services;

public sealed class ContactRateLimitService(MySqlConnectionFactory connections, IConfiguration configuration)
{
    private const int PermitLimit = 8;
    private static readonly TimeSpan Window = TimeSpan.FromMinutes(10);
    private readonly byte[] _secret = Encoding.UTF8.GetBytes(
        configuration["SUNEX_RATE_LIMIT_SECRET"]
        ?? configuration["JWT_SECRET"]
        ?? throw new InvalidOperationException("A server rate-limit secret is required."));

    public async Task<bool> TryConsumeAsync(string clientIp, string? clientFingerprint, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var windowStart = new DateTime(now.Ticks - now.Ticks % Window.Ticks, DateTimeKind.Utc);
        var bucket = CreateBucket(clientIp, clientFingerprint, windowStart);

        await using var connection = connections.Create();
        await connection.OpenAsync(cancellationToken);
        const string statement = """
            INSERT INTO contact_rate_limit_buckets (bucket, windowStart, requestCount, expiresAt)
            VALUES (@bucket, @windowStart, 1, @expiresAt)
            ON DUPLICATE KEY UPDATE
                requestCount = IF(windowStart = VALUES(windowStart), requestCount + 1, 1),
                windowStart = VALUES(windowStart),
                expiresAt = VALUES(expiresAt);
            """;

        await using (var command = new MySqlCommand(statement, connection))
        {
            command.Parameters.AddWithValue("@bucket", bucket);
            command.Parameters.AddWithValue("@windowStart", windowStart);
            command.Parameters.AddWithValue("@expiresAt", windowStart.Add(Window));
            await command.ExecuteNonQueryAsync(cancellationToken);
        }

        await using var countCommand = new MySqlCommand("SELECT requestCount FROM contact_rate_limit_buckets WHERE bucket = @bucket;", connection);
        countCommand.Parameters.AddWithValue("@bucket", bucket);
        var count = Convert.ToInt32(await countCommand.ExecuteScalarAsync(cancellationToken), System.Globalization.CultureInfo.InvariantCulture);
        return count <= PermitLimit;
    }

    internal string CreateBucket(string clientIp, string? clientFingerprint, DateTime windowStart)
    {
        var identity = $"{clientIp.Trim()}|{clientFingerprint?.Trim() ?? "none"}|{windowStart.Ticks}";
        return Convert.ToHexString(HMACSHA256.HashData(_secret, Encoding.UTF8.GetBytes(identity))).ToLowerInvariant();
    }
}
