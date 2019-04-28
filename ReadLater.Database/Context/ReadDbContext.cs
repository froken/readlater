using Microsoft.EntityFrameworkCore;
using ReadLater.Database.Models;

namespace ReadLater.Database.Context
{
    public class ReadDbContext : DbContext
    {
        public DbSet<UserSession> UserSessions { get; set; }

        public ReadDbContext()
        {
        }

        public ReadDbContext(DbContextOptions<ReadDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<ProjectTaskTag>()
            //    .HasKey(bc => new { bc.Id });
            //modelBuilder.Entity<ProjectTaskTag>()
            //    .HasOne(tt => tt.ProjectTask)
            //    .WithMany(t => t.ProjectTaskTags)
            //    .HasForeignKey(tt => tt.ProjectTaskId);
        }

    }
}
