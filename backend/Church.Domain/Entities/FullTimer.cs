namespace Church.Domain.Entities;

public sealed class FullTimer
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Ministry { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Status { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}