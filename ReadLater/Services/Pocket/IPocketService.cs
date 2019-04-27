using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadLater.Services.Pocket
{
    public interface IPocketService
    {
        public async Task<string> RequestToken();
    }
}
