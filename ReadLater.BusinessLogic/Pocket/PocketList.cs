using System.Collections.Generic;

namespace ReadLater.BusinessLogic.Pocket
{
    public class PocketList
    {
        public int Status { get; set; }

        public Dictionary<int, PocketItem> Items { get; set; }
    }
}
