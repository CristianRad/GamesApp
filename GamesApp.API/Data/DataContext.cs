using GamesApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Screenshot> Screenshots { get; set; }
        public DbSet<PurchasedGame> PurchasedGames { get; set; }
        public DbSet<UserComment> UserComments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PurchasedGame>()
                .HasKey(pg => new { pg.UserId, pg.GameId });

            modelBuilder.Entity<PurchasedGame>()
                .HasOne(pg => pg.User)
                .WithMany(pg => pg.PurchasedGames)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PurchasedGame>()
                .HasOne(pg => pg.Game)
                .WithMany(pg => pg.GamePurchasedByUsers)
                .HasForeignKey(g => g.GameId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Comment>().HasQueryFilter(c => c.IsApproved);
        }
    }
}