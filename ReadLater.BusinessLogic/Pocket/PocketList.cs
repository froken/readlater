using Newtonsoft.Json;
using System.Collections.Generic;

namespace ReadLater.BusinessLogic.Pocket
{
    public class PocketList
    {
        public int Status { get; set; }

        [JsonProperty("list")]
        public Dictionary<string, PocketItem> Items { get; set; }
    }
}
