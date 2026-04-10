using Church.Domain.Entities;

namespace Church.Domain.Repositories.User;

public interface IUserRepository
{
    Task<DomainUser?> FindByIdentifierServiceAsync(string identifier, CancellationToken cancellationToken = default);
}
