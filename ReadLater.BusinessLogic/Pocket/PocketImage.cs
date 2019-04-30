using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace ReadLater.BusinessLogic.Pocket
{
    public class PocketImage
    {
        [JsonProperty("item_id")]
        public string ItemId { get; set; }

        [JsonProperty("image_id")]
        public string ImageId { get; set; }

        [JsonProperty("src")]
        public string Src { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("credit")]
        public string Credit { get; set; }

        [JsonProperty("caption")]
        public string Caption { get; set; }
    }
}
