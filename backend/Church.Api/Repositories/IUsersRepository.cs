using Church.Api.Models;

namespace Church.Api.Repositories;

public interface IUsersRepository
{
    Task<List<User>> GetAllAsync(CancellationToken cancellationToken);
    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<List<User>> GetByCongregationIdAsync(Guid congregationId, CancellationToken cancellationToken);
    Task<User> AddAsync(User user, CancellationToken cancellationToken);
    Task<bool> UpdateAsync(User user, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}