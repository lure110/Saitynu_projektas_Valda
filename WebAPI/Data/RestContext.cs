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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=webAPI");
            optionsBuilder.UseSqlServer("Server=tcp:valda.database.windows.net,1433;Initial Catalog=valda-database;Persist Security Info=False;User ID=arnas;Password=Valda123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
           
            var serverVersion = new MySqlServerVersion(new Version (8, 0));
            MySqlConnectionStringBuilder conn_string = new MySqlConnectionStringBuilder();
            conn_string.Server = "host.docker.internal";
            conn_string.Port = 3306;
            conn_string.UserID = "user";
            conn_string.Password = "password";
            conn_string.Database = "db";
       
            //optionsBuilder.UseMySql(conn_string.ToString(),serverVersion);
        }
    }
}
