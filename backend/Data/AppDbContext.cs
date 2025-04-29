namespace Data
{
    using Microsoft.EntityFrameworkCore;
    using Models;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Application> Applications { get; set; }
    }
}