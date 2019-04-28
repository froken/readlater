using System.Threading.Tasks;

namespace ReadLater.Database.UserSession
{
    public interface IUserSessionRepository
    {
        UserSession GetUserSession(string userName);

        Task<UserSession> CreateUserSessionAsync(string userName);

        Task UpdateUserSessionAsync(UserSession userSession);
    }
}
