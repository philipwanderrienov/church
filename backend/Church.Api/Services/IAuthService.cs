namespace Church.Api.Services;

public interface IAuthService
{
    Task<(bool Success, object? User, string Message)> LoginAsync(string identifier, string password, CancellationToken cancellationToken);
}
