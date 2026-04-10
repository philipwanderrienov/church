using Church.Domain.Entities;

namespace Church.Domain.Repositories;

public interface ICongregationRepository
{
    Task<IReadOnlyList<Congregation>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Congregation?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Congregation?> CreateAsync(Congregation congregation, CancellationToken cancellationToken = default);
    Task<Congregation?> UpdateAsync(int id, Congregation congregation, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}