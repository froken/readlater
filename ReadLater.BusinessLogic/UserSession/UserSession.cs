using System;
using System.Collections.Generic;
using System.Text;

namespace ReadLater.BusinessLogic
{
    public class UserSession
    {
        public string UserName { get; set; }

        public string RequestToken { get; set; }

        public string AccessToken { get; set; }

        public bool IsAuthorized { get; set; }
    }
}
