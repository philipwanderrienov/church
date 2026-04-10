using Church.Domain.Common;
using Church.Domain.Entities;

namespace Church.Application.Abstractions;

public interface ICongregationService
{
    Task<ApiResponse<IReadOnlyList<Congregation>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ApiResponse<Congregation?>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ApiResponse<Congregation?>> CreateAsync(Congregation congregation, CancellationToken cancellationToken = default);
    Task<ApiResponse<Congregation?>> UpdateAsync(int id, Congregation congregation, CancellationToken cancellationToken = default);
    Task<ApiResponse<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<ApiResponse<object?>> LoginAsync(string identifier, string password, CancellationToken cancellationToken = default);
}