namespace Church.Domain.Options;

public sealed class DatabaseOptions
{
    public string Host { get; set; } = "localhost";
    public int Port { get; set; } = 5432;
    public string User { get; set; } = "postgres";
    public string Password { get; set; } = "qwerty123";
    public string Database { get; set; } = "church";
    public string SslMode { get; set; } = "Disable";
}