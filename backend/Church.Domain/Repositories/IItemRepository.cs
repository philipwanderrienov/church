using Church.Domain.Entities;

namespace Church.Domain.Repositories;

public interface IItemRepository
{
    Task<IReadOnlyList<Item>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Item?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Item?> CreateAsync(Item entity, CancellationToken cancellationToken = default);
    Task<Item?> UpdateAsync(int id, Item entity, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}