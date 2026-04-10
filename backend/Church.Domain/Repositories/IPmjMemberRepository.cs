using Church.Domain.Entities;

namespace Church.Domain.Repositories;

public interface IPmjMemberRepository
{
    Task<IReadOnlyList<PmjMember>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<PmjMember?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<PmjMember?> CreateAsync(PmjMember entity, CancellationToken cancellationToken = default);
    Task<PmjMember?> UpdateAsync(int id, PmjMember entity, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}