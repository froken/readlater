using System.Threading.Tasks;

namespace ReadLater.BusinessLogic.Pocket
{
    public interface IPocketService
    {
        Task<string> GetRequestTokenAsync();

        Task<string> GetAccessTokenAsync(string code);
    }
}
