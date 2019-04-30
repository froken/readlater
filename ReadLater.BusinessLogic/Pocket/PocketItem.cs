using Newtonsoft.Json;
using System.Collections.Generic;

namespace ReadLater.BusinessLogic.Pocket
{
    public class PocketItem
    {
        [JsonProperty("item_id")]
        public string ItemId { get; set; }

        [JsonProperty("resolved_id")]
        public string ResolvedId { get; set; }

        [JsonProperty("given_url")]
        public string GivenUrl { get; set; }

        [JsonProperty("given_title")]
        public string GivenTitle { get; set; }

        [JsonProperty("favorite")]
        public int Favorite { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }

        [JsonProperty("resolved_title")]
        public string ResolvedTitle { get; set; }

        [JsonProperty("resolved_url")]
        public string ResolvedUrl { get; set; }

        [JsonProperty("excerpt")]
        public string Excerpt { get; set; }

        [JsonProperty("is_article")]
        public int IsArticle { get; set; }

        [JsonProperty("has_video")]
        public int HasVideo { get; set; }

        [JsonProperty("has_image")]
        public int HasImage { get; set; }

        [JsonProperty("word_count")]
        public int WordCount { get; set; }

        [JsonProperty("images")]
        public Dictionary<int, PocketImage> Images { get; set; }

        [JsonProperty("videos")]
        public Dictionary<int, PocketVideo> Videos { get; set; }

        

    }
}
