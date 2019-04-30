using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReadLater.BusinessLogic.Read
{
    public interface IReadService
    {
        Task<List<ReadItem>> GetReadListAsync(string userName);
    }
}
