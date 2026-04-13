using Church.Api.Data;
using Church.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Church.Api.Repositories;

public sealed class AuthRepository : IAuthRepository
{
    private readonly ChurchDbContext _dbContext;

    public AuthRepository(ChurchDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<User?> GetByEmailOrUsernameAsync(string identifier, CancellationToken cancellationToken)
    {
        var normalized = identifier.Trim().ToLower();

        return _dbContext.Users
            .Include(x => x.Congregation)
            .FirstOrDefaultAsync(
                x => x.Email.ToLower() == normalized || (x.Username != null && x.Username.ToLower() == normalized),
                cancellationToken);
    }
}
