using Newtonsoft.Json;

namespace ReadLater.BusinessLogic.Pocket
{
    public class AccessToken
    {
        [JsonProperty("access_token")]
        public string Token { get; set; }

        [JsonProperty("username")]
        public string UserName { get; set; }
    }
}
