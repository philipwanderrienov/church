using Church.Domain.Common;
using Church.Domain.Entities;

namespace Church.Application.Abstractions;

public interface IItemService
{
    Task<ApiResponse<IReadOnlyList<Item>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ApiResponse<Item?>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ApiResponse<Item?>> CreateAsync(Item entity, CancellationToken cancellationToken = default);
    Task<ApiResponse<Item?>> UpdateAsync(int id, Item entity, CancellationToken cancellationToken = default);
    Task<ApiResponse<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
}