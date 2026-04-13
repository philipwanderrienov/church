namespace Church.Api.Models;

public sealed class Congregation
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? PastorName { get; set; }
    public string Location { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int ActiveMembersCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public ICollection<PrayerRequest> PrayerRequests { get; set; } = new List<PrayerRequest>();
    public ICollection<FinanceTransaction> FinanceTransactions { get; set; } = new List<FinanceTransaction>();
}
