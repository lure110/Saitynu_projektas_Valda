using Microsoft.EntityFrameworkCore;
using webAPI.Data.Entities;

namespace webAPI.Data
{
    public class RestContext : DbContext
    {
        public DbSet<Region> Regions { get; set; }
        public DbSet<Landplot> Landplots { get; set; }

        public DbSet<Building> Buildings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=webAPI");
            var serverVersion = new MySqlServerVersion(new Version (8, 0, 27));
            optionsBuilder.UseMySql(ServerVersion.AutoDetect("server=localhost; port=3306; database=db; user=root; password=password;Persist Security Info=False; Connect Timeout=300;"));
        }
    }
}
