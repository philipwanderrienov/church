using Church.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class CongregationsController : ControllerBase
{
    private readonly ChurchDbContext _dbContext;

    public CongregationsController(ChurchDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var congregations = await _dbContext.Congregations
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.PastorName,
                x.Location,
                x.PhoneNumber,
                x.Email,
                x.ActiveMembersCount,
                x.CreatedAt,
                x.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        return Ok(new { success = true, data = congregations });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var congregation = await _dbContext.Congregations
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Name,
                x.PastorName,
                x.Location,
                x.PhoneNumber,
                x.Email,
                x.ActiveMembersCount,
                x.CreatedAt,
                x.UpdatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);

        return congregation is null
            ? NotFound(new { success = false, message = "Congregation not found." })
            : Ok(new { success = true, data = congregation });
    }
}
