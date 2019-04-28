using ReadLater.Database.Context;
using System.Linq;

namespace ReadLater.Database.UserSession
{
    public class UserSessionRepository : IUserSessionRepository
    { 
        private readonly ReadDbContext _context;

        public UserSessionRepository(ReadDbContext context)
        {
            _context = context;
        }

        public UserSession GetUserSession(string userId)
        {
            return _context.UserSessions.Where(s => s.UserId == userId).FirstOrDefault();
        }
    }
}
