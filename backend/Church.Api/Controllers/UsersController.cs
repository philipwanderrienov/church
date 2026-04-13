using Church.Api.Models;
using Church.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class UsersController : ControllerBase
{
    private readonly IUsersService _usersService;

    public UsersController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        try
        {
            var users = await _usersService.GetAllAsync(cancellationToken);
            return Ok(new { success = true, data = users });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = ex.InnerException?.Message ?? ex.Message
            });
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _usersService.GetByIdAsync(id, cancellationToken);

            return user is null
                ? NotFound(new { success = false, message = "User not found." })
                : Ok(new { success = true, data = user });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = ex.InnerException?.Message ?? ex.Message
            });
        }
    }

    [HttpGet("congregation/{congregationId:guid}")]
    public async Task<IActionResult> GetByCongregationId(Guid congregationId, CancellationToken cancellationToken)
    {
        try
        {
            var users = await _usersService.GetByCongregationIdAsync(congregationId, cancellationToken);
            return Ok(new { success = true, data = users });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = ex.InnerException?.Message ?? ex.Message
            });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] User user, CancellationToken cancellationToken)
    {
        try
        {
            var createdUser = await _usersService.CreateAsync(user, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, new { success = true, data = createdUser });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = ex.InnerException?.Message ?? ex.Message
            });
        }
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] User user, CancellationToken cancellationToken)
    {
        try
        {
            if (id != user.Id)
            {
                return BadRequest(new { success = false, message = "Route id does not match body id." });
            }

            var updated = await _usersService.UpdateAsync(user, cancellationToken);

            return updated
                ? Ok(new { success = true, message = "User updated successfully." })
                : NotFound(new { success = false, message = "User not found." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = ex.InnerException?.Message ?? ex.Message
            });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            var deleted = await _usersService.DeleteAsync(id, cancellationToken);

            return deleted
                ? Ok(new { success = true, message = "User deleted successfully." })
                : NotFound(new { success = false, message = "User not found." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                message = ex.InnerException?.Message ?? ex.Message
            });
        }
    }
}
