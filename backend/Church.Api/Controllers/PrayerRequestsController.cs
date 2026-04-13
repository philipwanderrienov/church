using Church.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class PrayerRequestsController : ControllerBase
{
    private readonly ChurchDbContext _dbContext;

    public PrayerRequestsController(ChurchDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid? congregationId, CancellationToken cancellationToken)
    {
        var query = _dbContext.PrayerRequests
            .AsNoTracking()
            .Include(x => x.Congregation)
            .OrderByDescending(x => x.RequestedAt)
            .AsQueryable();

        if (congregationId.HasValue)
        {
            query = query.Where(x => x.CongregationId == congregationId.Value);
        }

        var prayerRequests = await query
            .Select(x => new
            {
                x.Id,
                x.CongregationId,
                CongregationName = x.Congregation!.Name,
                x.Title,
                x.RequestorName,
                x.Description,
                x.Status,
                x.RequestedAt,
                x.ClosedAt
            })
            .ToListAsync(cancellationToken);

        return Ok(new { success = true, data = prayerRequests });
    }
}