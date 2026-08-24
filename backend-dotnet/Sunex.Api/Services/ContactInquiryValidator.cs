using System.ComponentModel.DataAnnotations;
using Sunex.Api.Contracts;
using System.Text;

namespace Sunex.Api.Services;

public static class ContactInquiryValidator
{
    private static readonly HashSet<string> Solutions = new(StringComparer.OrdinalIgnoreCase)
    {
        "urbantree", "education", "healthcare", "partnership", "csr", "other"
    };

    private static readonly HashSet<string> Industries = new(StringComparer.OrdinalIgnoreCase)
    {
        "gov", "smartcity", "edu", "health", "mfg", "realestate", "ngo", "other"
    };

    public static Dictionary<string, string[]> Validate(ContactInquiryRequest request)
    {
        var errors = new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase);
        AddIf(errors, "name", IsLengthOutside(request.Name, 2, 120), "Please provide a name between 2 and 120 characters.");
        AddIf(errors, "organization", IsLengthAbove(request.Organization, 160), "Organization must be 160 characters or fewer.");
        AddIf(errors, "email", !new EmailAddressAttribute().IsValid(request.Email) || IsLengthAbove(request.Email, 320), "Please provide a valid email address.");
        AddIf(errors, "phone", IsLengthAbove(request.Phone, 60), "Phone number must be 60 characters or fewer.");
        AddIf(errors, "solution", string.IsNullOrWhiteSpace(request.Solution) || !Solutions.Contains(request.Solution), "Please choose a valid solution focus.");
        AddIf(errors, "industry", string.IsNullOrWhiteSpace(request.Industry) || !Industries.Contains(request.Industry), "Please choose a valid industry.");
        AddIf(errors, "message", IsLengthOutside(request.Message, 10, 5000), "Please share a project or challenge between 10 and 5000 characters.");
        return errors;
    }

    public static ContactInquiryRequest Normalize(ContactInquiryRequest request) => request with
    {
        Name = SanitizeText(request.Name),
        Organization = string.IsNullOrWhiteSpace(request.Organization) ? null : SanitizeText(request.Organization),
        Email = SanitizeText(request.Email)?.ToLowerInvariant(),
        Phone = string.IsNullOrWhiteSpace(request.Phone) ? null : SanitizeText(request.Phone),
        Solution = SanitizeText(request.Solution)?.ToLowerInvariant(),
        Industry = SanitizeText(request.Industry)?.ToLowerInvariant(),
        Message = SanitizeText(request.Message),
    };

    private static string? SanitizeText(string? value)
    {
        if (value is null) return null;
        var normalized = value.Normalize(NormalizationForm.FormKC);
        var filtered = new string(normalized.Where(character => !char.IsControl(character) || character is '\n' or '\r' or '\t').ToArray());
        return filtered.Trim();
    }

    private static bool IsLengthOutside(string? value, int minimum, int maximum) => string.IsNullOrWhiteSpace(value) || value.Trim().Length < minimum || value.Trim().Length > maximum;
    private static bool IsLengthAbove(string? value, int maximum) => value is not null && value.Trim().Length > maximum;

    private static void AddIf(Dictionary<string, string[]> errors, string field, bool condition, string message)
    {
        if (condition) errors[field] = [message];
    }
}
