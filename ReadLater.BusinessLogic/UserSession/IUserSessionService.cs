using System.Threading.Tasks;

namespace ReadLater.BusinessLogic
{
    public interface IUserSessionService
    {
        UserSession GetUserSession(string userName);

        string GetAccessToken(string userName);

        Task<string> GetRequestTokenAsync(string userName);

        Task AuthorizeRequestTokenAsync(string userName);
    }
}
