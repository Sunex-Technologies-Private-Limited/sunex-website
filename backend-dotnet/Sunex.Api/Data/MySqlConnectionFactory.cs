using MySqlConnector;

namespace Sunex.Api.Data;

public sealed class MySqlConnectionFactory(IConfiguration configuration)
{
    private readonly string _connectionString = BuildConnectionString(configuration["DATABASE_URL"] ?? throw new InvalidOperationException("DATABASE_URL is required."));

    public MySqlConnection Create() => new(_connectionString);

    private static string BuildConnectionString(string databaseUrl)
    {
        if (!Uri.TryCreate(databaseUrl, UriKind.Absolute, out var uri) || !string.Equals(uri.Scheme, "mysql", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("DATABASE_URL must use the mysql:// URL format.");
        }

        var credentials = Uri.UnescapeDataString(uri.UserInfo).Split(':', 2);
        if (credentials.Length != 2 || string.IsNullOrWhiteSpace(credentials[0]))
        {
            throw new InvalidOperationException("DATABASE_URL must include a MySQL user name and password.");
        }

        return new MySqlConnectionStringBuilder
        {
            Server = uri.Host,
            Port = (uint)(uri.IsDefaultPort ? 3306 : uri.Port),
            UserID = credentials[0],
            Password = credentials[1],
            Database = uri.AbsolutePath.Trim('/'),
            // Production credentials traverse the network to managed MySQL/TiDB.
            // Require TLS rather than allowing a downgrade to an unencrypted link.
            SslMode = MySqlSslMode.Required,
            ConnectionTimeout = 5,
            DefaultCommandTimeout = 10,
            Pooling = true,
            MaximumPoolSize = 20,
        }.ConnectionString;
    }
}
