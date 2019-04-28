namespace ReadLater.Database.UserSession
{
    public interface IUserSessionRepository
    {
        UserSession GetUserSession(string userId);
    }
}
