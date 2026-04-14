using Church.Api.Helpers;
using Microsoft.Extensions.Logging;
using System.Runtime.CompilerServices;

namespace Church.Api.Services.PasswordHash;

public class PasswordHashService : IPasswordHashService
{
    static string? GetActualAsyncMethodName([CallerMemberName] string? name = null) => name;
    private readonly ILogger<PasswordHashService> _logger;

    public PasswordHashService(ILogger<PasswordHashService> logger)
    {
        _logger = logger;
    }

    public async Task<string> Hash(string plainText)
    {

        string result = string.Empty;

        try
        {
            result = SecurePasswordHasher.Hash(plainText);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "{ClassName}-{Method}", GetType().Name, GetActualAsyncMethodName());
        }

        return result;
    }

    public async Task<bool> VerifyHash(string password, string hashCommon, CancellationToken cancellationToken)
    {
        bool result = false;

        try
        {
            result = SecurePasswordHasher.Verify(password, hashCommon);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error verifying hash: {ex.Message}");
        }

        return result;

    }
}
