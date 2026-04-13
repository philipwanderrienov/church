using Church.Api.Repositories;

namespace Church.Api.Services;

public sealed class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepository;

    public AuthService(IAuthRepository authRepository)
    {
        _authRepository = authRepository;
    }

    public async Task<(bool Success, object? User, string Message)> LoginAsync(string identifier, string password, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(identifier) || string.IsNullOrWhiteSpace(password))
        {
            return (false, null, "Email/username dan password wajib diisi.");
        }

        var user = await _authRepository.GetByEmailOrUsernameAsync(identifier, cancellationToken);

        if (user is null)
        {
            return (false, null, "Pengguna tidak ditemukan.");
        }

        if (string.IsNullOrWhiteSpace(user.PasswordHash))
        {
            return (false, null, "Akun belum memiliki password.");
        }

        var passwordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

        if (!passwordValid)
        {
            return (false, null, "Password salah.");
        }

        var responseUser = new
        {
            id = user.Id,
            fullName = $"{user.FirstName} {user.LastName}".Trim(),
            email = user.Email,
            username = user.Username ?? user.Email,
            role = NormalizeRole(user.Role),
            gender = user.Gender,
            dateOfBirth = user.BirthDate?.ToString("yyyy-MM-dd"),
            phoneNumber = user.PhoneNumber,
            congregationId = user.CongregationId,
            congregationName = user.Congregation?.Name
        };

        return (true, responseUser, "Login berhasil.");
    }

    private static string NormalizeRole(string? role)
    {
        if (string.IsNullOrWhiteSpace(role))
        {
            return "jemaat";
        }

        return role.Trim().ToLower() switch
        {
            "pmj" => "pmj",
            "admin" => "pmj",
            "pastor" => "pmj",
            "penatua" => "pmj",
            _ => "jemaat"
        };
    }
}
