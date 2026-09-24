using Microsoft.EntityFrameworkCore;
using TaskApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Database Context එක එකතු කිරීම
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// CORS Policy (React එකට Backend එක Access කිරීමට)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    var connection = db.Database.GetDbConnection();
    if (connection.State != System.Data.ConnectionState.Open)
    {
        connection.Open();
    }

    using var checkCommand = connection.CreateCommand();
    checkCommand.CommandText = @"
        SELECT CASE 
            WHEN EXISTS (
                SELECT 1
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_NAME = 'Tasks' AND COLUMN_NAME = 'CreatedAt'
            ) THEN 1 ELSE 0 END";

    var columnExists = Convert.ToInt32(checkCommand.ExecuteScalar());
    if (columnExists == 0)
    {
        using var alterCommand = connection.CreateCommand();
        alterCommand.CommandText = @"
            ALTER TABLE Tasks
            ADD CreatedAt datetime2 NOT NULL DEFAULT GETDATE();";
        alterCommand.ExecuteNonQuery();
    }
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();