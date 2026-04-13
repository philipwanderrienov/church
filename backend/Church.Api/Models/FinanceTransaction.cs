namespace Church.Api.Models;

public sealed class FinanceTransaction
{
    public Guid Id { get; set; }
    public Guid CongregationId { get; set; }
    public string Type { get; set; } = "Tithe";
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD";
    public string? Memo { get; set; }
    public DateTime TransactionDate { get; set; }
    public DateTime CreatedAt { get; set; }

    public Congregation? Congregation { get; set; }
}