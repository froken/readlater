using ReadLater.Database.Context;
using System.Linq;
using System.Threading.Tasks;

namespace ReadLater.Database.UserSession
{
    public class UserSessionRepository : IUserSessionRepository
    { 
        private readonly ReadDbContext _context;

        public UserSessionRepository(ReadDbContext context)
        {
            _context = context;
        }

        public async Task<UserSession> CreateUserSessionAsync(string userName)
        {
            var userSession = new UserSession
            {
                UserName = userName
            };

            _context.UserSessions.Add(userSession);

            await _context.SaveChangesAsync();

            return userSession;
        }

        public UserSession GetUserSession(string userName)
        {
            return _context.UserSessions.FirstOrDefault(s => s.UserName == userName);
        }

        public async Task UpdateUserSessionAsync(UserSession userSession)
        {
            var session = _context.UserSessions.FirstOrDefault(s => s.UserName == userSession.UserName);

            session.AccessToken = userSession.AccessToken;
            session.RequestToken = userSession.RequestToken;
            session.IsAuthorized = userSession.IsAuthorized;

            await _context.SaveChangesAsync();
        }
    }
}
