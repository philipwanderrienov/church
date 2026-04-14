using System;

namespace Church.Api.Services.PasswordHash;

public interface IPasswordHashService
{
    Task<string> Hash(string plainText);
    Task<bool> VerifyHash(string password, string hashCommon, CancellationToken cancellationToken);
}
