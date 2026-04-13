namespace Church.Api.Models;

public sealed class PrayerRequest
{
    public Guid Id { get; set; }
    public Guid CongregationId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? RequestorName { get; set; }
    public string? Description { get; set; }
    public string Status { get; set; } = "Open";
    public DateTime RequestedAt { get; set; }
    public DateTime? ClosedAt { get; set; }

    public Congregation? Congregation { get; set; }
}