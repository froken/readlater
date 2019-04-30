using AutoMapper;
using Newtonsoft.Json;
using ReadLater.BusinessLogic.Read;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ReadLater.BusinessLogic.Pocket
{
    public class PocketService : IPocketService
    {
        private IMapper _mapper;
        private HttpClient _client;
        private const string ConsumerKey = "84468-64a87fb1c2e843d4d28f1981";

        public PocketService(IMapper mapper)
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

        public async Task<PocketList> GetReadListAsync(string accessToken)
        {
            var content = new
            {
                consumer_key = ConsumerKey,
                access_token = accessToken,
                count = 100
            };

            var json = JsonConvert.SerializeObject(content);

            var request = new HttpRequestMessage(HttpMethod.Post, "/v3/get");
            request.Headers.Add("X-Accept", "application/json");
            request.Content = new StringContent(json.ToString(), Encoding.UTF8, "application/json");

            var response = await _client.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();
            var list = JsonConvert.DeserializeObject<PocketList>(responseContent);

            return list;
        }
    }
}
