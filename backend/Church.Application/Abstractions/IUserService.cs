using Church.Domain.Common;

namespace Church.Application.Abstractions;

public interface IUserService
{
    Task<ApiResponse<object?>> AuthenticateServiceAsync(string identifier, string password, CancellationToken cancellationToken = default);
}
