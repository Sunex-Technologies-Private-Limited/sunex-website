using Microsoft.Extensions.Configuration;
using Sunex.Api.Data;
using Sunex.Api.Services;
using Xunit;

namespace Sunex.Api.Tests;

public sealed class ContactRateLimitServiceTests
{
    [Fact]
    public void ProducesNonReversibleBucketsThatPartitionClientIdentityAndWindow()
    {
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["DATABASE_URL"] = "mysql://sunex:password@example.com:4000/sunex",
                ["JWT_SECRET"] = "this-is-a-long-test-only-secret-for-rate-limits",
            })
            .Build();
        var service = new ContactRateLimitService(new MySqlConnectionFactory(configuration), configuration);
        var window = new DateTime(2026, 8, 24, 12, 0, 0, DateTimeKind.Utc);

        var first = service.CreateBucket("203.0.113.4", "a".PadRight(64, 'b'), window);
        var changedIdentity = service.CreateBucket("203.0.113.5", "a".PadRight(64, 'b'), window);
        var changedWindow = service.CreateBucket("203.0.113.4", "a".PadRight(64, 'b'), window.AddMinutes(10));

        Assert.Matches("^[a-f0-9]{64}$", first);
        Assert.DoesNotContain("203.0.113.4", first, StringComparison.Ordinal);
        Assert.NotEqual(first, changedIdentity);
        Assert.NotEqual(first, changedWindow);
    }
}
