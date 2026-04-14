using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Church.Api.Services.PasswordHash;

namespace Church.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordHashController : ControllerBase
    {
        private readonly ILogger<PasswordHashController> _logger;
        private readonly PasswordHashService _passwordHashService;

        public PasswordHashController(ILogger<PasswordHashController> logger, PasswordHashService passwordHashService)
        {
            _logger = logger;
            _passwordHashService = passwordHashService;
        }

        [HttpPost("Hash")]
        public async Task<IActionResult> Hash([FromBody] string plainText)
        {
            var hash = await _passwordHashService.Hash(plainText);
            return Ok(new { hash });
        }

        [HttpPost("Compare-Hash")]
        public async Task<IActionResult> CompareHash([FromBody] CompareHashRequest request, CancellationToken cancellationToken)
        {
            var isMatch = await _passwordHashService.VerifyHash(request.PlainText, request.HashCommon, cancellationToken);
            return Ok(new { isMatch });
        }
    }

    public sealed class CompareHashRequest
    {
        public string PlainText { get; set; } = string.Empty;
        public string HashCommon { get; set; } = string.Empty;
    }
}
