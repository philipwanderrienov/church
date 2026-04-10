using Church.Domain.Entities;

namespace Church.Domain.Repositories;

public interface IUserRepository
{
    Task<DomainUser?> FindByIdentifierServiceAsync(string identifier, CancellationToken cancellationToken = default);
}
