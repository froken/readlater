using System;
using System.Collections.Generic;
using System.Text;

namespace ReadLater.BusinessLogic
{
    public class UserSession
    {
        public string Name { get; set; }

        public string RequestToken { get; set; }

        public string AccessToken { get; set; }
    }
}
