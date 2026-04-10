using Church.Domain.Entities;

namespace Church.Domain.Repositories;

public interface IFullTimerRepository
{
    Task<IReadOnlyList<FullTimer>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<FullTimer?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<FullTimer?> CreateAsync(FullTimer entity, CancellationToken cancellationToken = default);
    Task<FullTimer?> UpdateAsync(int id, FullTimer entity, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}