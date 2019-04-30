using Newtonsoft.Json;

namespace ReadLater.BusinessLogic.Pocket
{
    public class PocketVideo
    {
        [JsonProperty("item_id")]
        public string ItemId { get; set; }

        [JsonProperty("video_id")]
        public string VideoId { get; set; }

        [JsonProperty("src")]
        public string Src { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("type")]
        public int Type { get; set; }

        [JsonProperty("vid")]
        public string Vid { get; set; }
    }
}
