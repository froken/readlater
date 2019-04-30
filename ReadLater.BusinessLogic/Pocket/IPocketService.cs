using ReadLater.BusinessLogic.Read;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReadLater.BusinessLogic.Pocket
{
    public interface IPocketService
    {
        Task<string> GetRequestTokenAsync();

        Task<string> GetAccessTokenAsync(string code);

        Task<PocketList> GetReadListAsync(string accessToken);
    }
}
