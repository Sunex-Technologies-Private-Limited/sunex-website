using MySqlConnector;
using Sunex.Api.Contracts;

namespace Sunex.Api.Data;

public sealed class ContactInquiryRepository(MySqlConnectionFactory connections)
{
    public async Task<long> CreateOrGetAsync(ContactInquiryRequest request, string idempotencyKey, CancellationToken cancellationToken)
    {
        await using var connection = connections.Create();
        await connection.OpenAsync(cancellationToken);

        const string insertSql = """
            INSERT INTO contact_inquiries (name, organization, email, phone, solution, industry, message, idempotencyKey)
            VALUES (@name, @organization, @email, @phone, @solution, @industry, @message, @idempotencyKey)
            ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
            """;

        await using (var command = new MySqlCommand(insertSql, connection))
        {
            command.Parameters.AddWithValue("@name", request.Name);
            command.Parameters.AddWithValue("@organization", request.Organization);
            command.Parameters.AddWithValue("@email", request.Email);
            command.Parameters.AddWithValue("@phone", request.Phone);
            command.Parameters.AddWithValue("@solution", request.Solution);
            command.Parameters.AddWithValue("@industry", request.Industry);
            command.Parameters.AddWithValue("@message", request.Message);
            command.Parameters.AddWithValue("@idempotencyKey", idempotencyKey);
            await command.ExecuteNonQueryAsync(cancellationToken);
        }

        await using var identityCommand = new MySqlCommand("SELECT LAST_INSERT_ID();", connection);
        var result = await identityCommand.ExecuteScalarAsync(cancellationToken);
        return Convert.ToInt64(result, System.Globalization.CultureInfo.InvariantCulture);
    }

    public async Task<bool> CanConnectAsync(CancellationToken cancellationToken)
    {
        await using var connection = connections.Create();
        await connection.OpenAsync(cancellationToken);
        await using var command = new MySqlCommand("SELECT 1;", connection);
        return Convert.ToInt32(await command.ExecuteScalarAsync(cancellationToken), System.Globalization.CultureInfo.InvariantCulture) == 1;
    }
}
