namespace Church.Domain.Entities;

public sealed class PmjMember
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public DateTime? BirthDate { get; set; }
    public string? Phone { get; set; }
    public string? Status { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}