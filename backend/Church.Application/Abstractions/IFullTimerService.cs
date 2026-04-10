using Church.Domain.Common;
using Church.Domain.Entities;

namespace Church.Application.Abstractions;

public interface IFullTimerService
{
    Task<ApiResponse<IReadOnlyList<FullTimer>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ApiResponse<FullTimer?>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ApiResponse<FullTimer?>> CreateAsync(FullTimer entity, CancellationToken cancellationToken = default);
    Task<ApiResponse<FullTimer?>> UpdateAsync(int id, FullTimer entity, CancellationToken cancellationToken = default);
    Task<ApiResponse<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
}