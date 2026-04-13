using Church.Api.Data;
using Church.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Church.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class OrganizationController : ControllerBase
{
    private readonly ChurchDbContext _dbContext;

    public OrganizationController(ChurchDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary(CancellationToken cancellationToken)
    {
        var summary = new OrganizationSummary
        {
            Congregations = await _dbContext.Congregations.CountAsync(cancellationToken),
            ActivePrayerRequests = await _dbContext.PrayerRequests.CountAsync(x => x.Status == "Open", cancellationToken),
            FinanceTransactions = await _dbContext.FinanceTransactions.CountAsync(cancellationToken),
            TotalFinanceAmount = await _dbContext.FinanceTransactions.SumAsync(x => (decimal?)x.Amount, cancellationToken) ?? 0m
        };

        return Ok(new { success = true, data = summary });
    }
}