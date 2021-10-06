using Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete
{
    public class PhoneBookContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"server=localhost; port=5432; database=PhoneBook; user ID=postgres ; password=12345; ");

        }

        public DbSet<Phone> Phones { get; set; }

    }
}