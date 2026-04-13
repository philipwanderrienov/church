using Church.Api.Data;
using Church.Api.Repositories;
using Church.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

builder.Services.AddDbContext<ChurchDbContext>(options =>
{
    var databaseSection = builder.Configuration.GetSection("Database");
    var host = databaseSection["Host"];
    var port = databaseSection.GetValue<int?>("Port") ?? 5432;
    var user = databaseSection["User"];
    var password = databaseSection["Password"];
    var database = databaseSection["Database"];
    var sslMode = databaseSection["SslMode"] ?? "Disable";

    var connectionString = builder.Configuration.GetConnectionString("ChurchDatabase")
        ?? builder.Configuration["ConnectionStrings:ChurchDatabase"]
        ?? builder.Configuration["DATABASE_URL"];

    if (string.IsNullOrWhiteSpace(connectionString))
    {
        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(user) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(database))
        {
            throw new InvalidOperationException("Database configuration is not configured.");
        }

        connectionString = $"Host={host};Port={port};Username={user};Password={password};Database={database};SSL Mode={sslMode}";
    }

    options.UseNpgsql(connectionString);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Church API",
        Version = "v1"
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Church API V1");
    options.RoutePrefix = string.Empty;
});

app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();

app.Run();
