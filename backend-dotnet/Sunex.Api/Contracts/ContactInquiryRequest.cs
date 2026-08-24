namespace Sunex.Api.Contracts;

public sealed record ContactInquiryRequest(
    string? Name,
    string? Organization,
    string? Email,
    string? Phone,
    string? Solution,
    string? Industry,
    string? Message
);

public sealed record ContactInquiryResponse(bool Success, long Id, string RequestId);
