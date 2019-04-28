using System;

namespace ReadLater.Database.UserSession
{
    public class UserSession
    {
        public string UserSessionId { get; set; }

        public string Name { get; set; }

        public string RequestToken { get; set; }

        public string AccessToken { get; set; }

    }
}
