using Church.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class FinanceController : ControllerBase
{
    private readonly ChurchDbContext _dbContext;

    public FinanceController(ChurchDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid? congregationId, CancellationToken cancellationToken)
    {
        var query = _dbContext.FinanceTransactions
            .AsNoTracking()
            .Include(x => x.Congregation)
            .OrderByDescending(x => x.TransactionDate)
            .AsQueryable();

        if (congregationId.HasValue)
        {
            query = query.Where(x => x.CongregationId == congregationId.Value);
        }

        var transactions = await query
            .Select(x => new
            {
                x.Id,
                x.CongregationId,
                CongregationName = x.Congregation!.Name,
                x.Type,
                x.Amount,
                x.Currency,
                x.Memo,
                x.TransactionDate,
                x.CreatedAt
            })
            .ToListAsync(cancellationToken);

        return Ok(new { success = true, data = transactions });
    }
}