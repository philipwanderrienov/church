using Church.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Church.Api.Data;

public sealed class ChurchDbContext : DbContext
{
    public ChurchDbContext(DbContextOptions<ChurchDbContext> options)
        : base(options)
    {
    }

    public DbSet<Congregation> Congregations => Set<Congregation>();
    public DbSet<PrayerRequest> PrayerRequests => Set<PrayerRequest>();
    public DbSet<FinanceTransaction> FinanceTransactions => Set<FinanceTransaction>();
    public DbSet<OrganizationSummary> OrganizationSummaries => Set<OrganizationSummary>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Congregation>(entity =>
        {
            entity.ToTable("Congregations");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).IsRequired();
            entity.Property(x => x.Location).IsRequired();
            entity.Property(x => x.PastorName);
            entity.Property(x => x.PhoneNumber).IsRequired();
            entity.Property(x => x.Email).IsRequired();
            entity.Property(x => x.ActiveMembersCount).HasColumnName("ActiveMembersCount");
            entity.Property(x => x.CreatedAt);
            entity.Property(x => x.UpdatedAt);
        });

        modelBuilder.Entity<PrayerRequest>(entity =>
        {
            entity.ToTable("PrayerRequests");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Title).IsRequired();
            entity.Property(x => x.RequestorName);
            entity.Property(x => x.Description);
            entity.Property(x => x.Status).IsRequired();
            entity.Property(x => x.RequestedAt);
            entity.Property(x => x.ClosedAt);
        });

        modelBuilder.Entity<FinanceTransaction>(entity =>
        {
            entity.ToTable("FinanceTransactions");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.TransactionDate);
            entity.Property(x => x.Type).IsRequired();
            entity.Property(x => x.Amount).HasColumnType("numeric(12,2)");
            entity.Property(x => x.Currency).IsRequired();
            entity.Property(x => x.Memo);
            entity.Property(x => x.CreatedAt);
        });

        modelBuilder.Entity<OrganizationSummary>(entity =>
        {
            entity.HasNoKey();
            entity.ToView(null);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.CongregationId);
            entity.Property(x => x.FirstName).IsRequired();
            entity.Property(x => x.LastName).IsRequired();
            entity.Property(x => x.Email).IsRequired();
            entity.Property(x => x.Username);
            entity.Property(x => x.PasswordHash).IsRequired();
            entity.Property(x => x.PhoneNumber);
            entity.Property(x => x.Role);
            entity.Property(x => x.Gender);
            entity.Property(x => x.BirthDate).HasConversion(
                new ValueConverter<DateOnly?, DateTime?>(
                    v => v.HasValue ? v.Value.ToDateTime(TimeOnly.MinValue) : null,
                    v => v.HasValue ? DateOnly.FromDateTime(v.Value) : null));
            entity.Property(x => x.Status);
            entity.Property(x => x.CreatedAt);
            entity.Property(x => x.UpdatedAt);

            entity.HasOne(x => x.Congregation)
                .WithMany()
                .HasForeignKey(x => x.CongregationId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.HasIndex(x => x.CongregationId);
            entity.HasIndex(x => x.Email);
            entity.HasIndex(x => x.Username);
        });
    }
}
