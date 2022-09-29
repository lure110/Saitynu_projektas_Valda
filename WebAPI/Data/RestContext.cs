using Microsoft.EntityFrameworkCore;
using webAPI.Data.Entities;

namespace webAPI.Data
{
    public class RestContext : DbContext
    {
        public DbSet<Region> Regions { get; set; }
        public DbSet<Landplot> Landplots { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=webAPI");
        }
    }
}
