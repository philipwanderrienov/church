using Church.Api.Models;
using Church.Api.Repositories;

namespace Church.Api.Services;

public sealed class UsersService : IUsersService
{
    private readonly IUsersRepository _usersRepository;

    public UsersService(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }

    public Task<List<User>> GetAllAsync(CancellationToken cancellationToken)
    {
        return _usersRepository.GetAllAsync(cancellationToken);
    }

    public Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return _usersRepository.GetByIdAsync(id, cancellationToken);
    }

    public Task<List<User>> GetByCongregationIdAsync(Guid congregationId, CancellationToken cancellationToken)
    {
        return _usersRepository.GetByCongregationIdAsync(congregationId, cancellationToken);
    }

    public async Task<User> CreateAsync(User user, CancellationToken cancellationToken)
    {
        ValidateUser(user);
        return await _usersRepository.AddAsync(user, cancellationToken);
    }

    public async Task<bool> UpdateAsync(User user, CancellationToken cancellationToken)
    {
        ValidateUser(user);
        return await _usersRepository.UpdateAsync(user, cancellationToken);
    }

    public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        return _usersRepository.DeleteAsync(id, cancellationToken);
    }

    private static void ValidateUser(User user)
    {
        if (user is null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        if (string.IsNullOrWhiteSpace(user.FirstName))
        {
            throw new ArgumentException("First name is required.", nameof(user));
        }

        if (string.IsNullOrWhiteSpace(user.LastName))
        {
            throw new ArgumentException("Last name is required.", nameof(user));
        }

        if (string.IsNullOrWhiteSpace(user.Email))
        {
            throw new ArgumentException("Email is required.", nameof(user));
        }
    }
}
