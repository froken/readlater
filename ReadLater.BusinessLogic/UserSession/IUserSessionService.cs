using System.Threading.Tasks;

namespace ReadLater.BusinessLogic
{
    public interface IUserSessionService
    {
        UserSession GetUserSession(string userName);

        Task<string> GetAccessTokenAsync(string userName);

        Task<string> GetRequestTokenAsync(string userName);
    }
}
