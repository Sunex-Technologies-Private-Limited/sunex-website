using Sunex.Api.Contracts;
using Sunex.Api.Services;
using Xunit;

namespace Sunex.Api.Tests;

public sealed class ContactInquiryValidatorTests
{
    [Fact]
    public void AcceptsTheWebsiteCompatibleEnquiryPayload()
    {
        var request = new ContactInquiryRequest("Asha Rao", "SunEx Partner", "asha@example.com", "", "urbantree", "smartcity", "We would like to discuss an UrbanTree deployment for a public space.");
        Assert.Empty(ContactInquiryValidator.Validate(request));
    }

    [Fact]
    public void RejectsInvalidSolutionAndShortMessage()
    {
        var request = new ContactInquiryRequest("Asha Rao", null, "asha@example.com", null, "unknown", "smartcity", "Short");
        var errors = ContactInquiryValidator.Validate(request);
        Assert.Contains("solution", errors.Keys);
        Assert.Contains("message", errors.Keys);
    }

    [Fact]
    public void NormalizesOptionalFieldsAndEnumValues()
    {
        var normalized = ContactInquiryValidator.Normalize(new ContactInquiryRequest(" Asha Rao ", " ", "ASHA@EXAMPLE.COM ", " ", "URBANTREE", "SMARTCITY", " Project details here. "));
        Assert.Equal("Asha Rao", normalized.Name);
        Assert.Null(normalized.Organization);
        Assert.Equal("asha@example.com", normalized.Email);
        Assert.Equal("urbantree", normalized.Solution);
    }

    [Fact]
    public void NormalizationRemovesUnsafeControlCharactersBeforePersistence()
    {
        var normalized = ContactInquiryValidator.Normalize(new ContactInquiryRequest("A\u0000sha", null, "ASHA@EXAMPLE.COM", null, "urbantree", "smartcity", "Project\u0007 details\nfor deployment."));

        Assert.Equal("Asha", normalized.Name);
        Assert.Equal("Project details\nfor deployment.", normalized.Message);
    }
}
