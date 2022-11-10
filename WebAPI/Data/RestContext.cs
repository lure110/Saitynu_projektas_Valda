using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System;
using System.Diagnostics;
using webAPI.Data.Entities;

namespace webAPI.Data
{
    public class RestContext : DbContext
    {
        public DbSet<Region> Regions { get; set; }
        public DbSet<Landplot> Landplots { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:valda.database.windows.net,1433;Initial Catalog=valda-database;Persist Security Info=False;User ID=arnas;Password=Valda123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            //optionsBuilder.UseSqlServer("Server=host.docker.internal,1433; Initial Catalog=valda-database;User ID=SA;Password=Password123!;");// Docker
            
        }
    }
}
