using Church.Domain.Common;
using Church.Domain.Entities;

namespace Church.Application.Abstractions;

public interface IPmjMemberService
{
    Task<ApiResponse<IReadOnlyList<PmjMember>>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<ApiResponse<PmjMember?>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<ApiResponse<PmjMember?>> CreateAsync(PmjMember entity, CancellationToken cancellationToken = default);
    Task<ApiResponse<PmjMember?>> UpdateAsync(int id, PmjMember entity, CancellationToken cancellationToken = default);
    Task<ApiResponse<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
}