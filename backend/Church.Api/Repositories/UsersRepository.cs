using Church.Api.Data;
using Church.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Church.Api.Repositories;

public sealed class UsersRepository : IUsersRepository
{
    private readonly ChurchDbContext _dbContext;

    public UsersRepository(ChurchDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<User>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.Users
            .AsNoTracking()
            .OrderBy(x => x.LastName)
            .ThenBy(x => x.FirstName)
            .ToListAsync(cancellationToken);
    }

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task<List<User>> GetByCongregationIdAsync(Guid congregationId, CancellationToken cancellationToken)
    {
        return await _dbContext.Users
            .AsNoTracking()
            .Where(x => x.CongregationId == congregationId)
            .OrderBy(x => x.LastName)
            .ThenBy(x => x.FirstName)
            .ToListAsync(cancellationToken);
    }

    public async Task<User> AddAsync(User user, CancellationToken cancellationToken)
    {
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return user;
    }

    public async Task<bool> UpdateAsync(User user, CancellationToken cancellationToken)
    {
        var existingUser = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == user.Id, cancellationToken);

        if (existingUser is null)
        {
            return false;
        }

        existingUser.CongregationId = user.CongregationId;
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.Email = user.Email;
        existingUser.PhoneNumber = user.PhoneNumber;
        existingUser.Role = user.Role;
        existingUser.Gender = user.Gender;
        existingUser.BirthDate = user.BirthDate;
        existingUser.Status = user.Status;
        existingUser.UpdatedAt = user.UpdatedAt;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var existingUser = await _dbContext.Users
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (existingUser is null)
        {
            return false;
        }

        _dbContext.Users.Remove(existingUser);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}