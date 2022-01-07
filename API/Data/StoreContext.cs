using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, Role, string>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Announce> Announces { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<UserProfile> Profiles { get; set; }
        public DbSet<UserAddress> Addresses { get; set; }


        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(u => u.Profile)
                .WithOne(p => p.User)
                .HasForeignKey<UserProfile>(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<Role>()
            //     .HasData(
            //         new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
            //         new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
            //     );
        }
    }
}