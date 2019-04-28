using System.Threading.Tasks;

namespace ReadLater.Services.Pocket
{
    public interface IPocketService
    {
        Task<string> GetRequestTokenAsync();

        Task<string> GetAccessTokenAsync(string code);
    }
}
