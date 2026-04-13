using Church.Api.Models;

namespace Church.Api.Repositories;

public interface IAuthRepository
{
    Task<User?> GetByEmailOrUsernameAsync(string identifier, CancellationToken cancellationToken);
}
