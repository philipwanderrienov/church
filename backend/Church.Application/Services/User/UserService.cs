using Church.Application.Abstractions;
using Church.Domain.Common;

namespace Church.Application.Services.User;

public sealed class UserService : IUserService
{
    public Task<ApiResponse<object?>> AuthenticateServiceAsync(string identifier, string password, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(ApiResponse<object?>.Ok(new
        {
            Token = "dev-token",
            User = new
            {
                Identifier = identifier
            }
        }));
    }
}
