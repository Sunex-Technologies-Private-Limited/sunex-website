using Microsoft.Extensions.Configuration;
using MySqlConnector;
using Sunex.Api.Data;
using Xunit;

namespace Sunex.Api.Tests;

public sealed class MySqlConnectionFactoryTests
{
    [Fact]
    public void RequiresTlsForManagedDatabaseConnections()
    {
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["DATABASE_URL"] = "mysql://sunex:password@example.com:4000/sunex",
            })
            .Build();

        using var connection = new MySqlConnectionFactory(configuration).Create();
        var builder = new MySqlConnectionStringBuilder(connection.ConnectionString);

        Assert.Equal(MySqlSslMode.Required, builder.SslMode);
        Assert.Equal(5u, builder.ConnectionTimeout);
        Assert.Equal(10u, builder.DefaultCommandTimeout);
    }
}

