using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ReadLater.Services.Pocket
{
    public class PocketService : IPocketService
    {
        private HttpClient _client;
        private const string ConsumerKey = "84468-64a87fb1c2e843d4d28f1981";

        public PocketService()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri("https://getpocket.com/v3");
        }

        public async Task<string> GetRequestTokenAsync()
        {
            var content = new
            {
                consumer_key = ConsumerKey,
                redirect_uri = "http://localhost:5001/"
            };

            var json = JsonConvert.SerializeObject(content);
            var request = new HttpRequestMessage(HttpMethod.Post, "/v3/oauth/request");
            request.Headers.Add("X-Accept", "application/json");
            request.Content = new StringContent(json.ToString(), Encoding.UTF8, "application/json");

            var response = await _client.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();
            var token = JsonConvert.DeserializeObject<RequestToken>(responseContent);

            return token.Code;
        }

        public async Task<string> GetAccessTokenAsync(string code)
        {
            var content = new
            {
                consumer_key = ConsumerKey,
                code
            };

            var json = JsonConvert.SerializeObject(content);
            var request = new HttpRequestMessage(HttpMethod.Post, "/v3/oauth/authorize");
            request.Headers.Add("X-Accept", "application/json");
            request.Content = new StringContent(json.ToString(), Encoding.UTF8, "application/json");

            var response = await _client.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();
            var token = JsonConvert.DeserializeObject<AccessToken>(responseContent);

            return token.Token;
        }
    }
}
