namespace Church.Api.Models;

public sealed class OrganizationSummary
{
    public int Congregations { get; set; }
    public int ActivePrayerRequests { get; set; }
    public int FinanceTransactions { get; set; }
    public decimal TotalFinanceAmount { get; set; }
}