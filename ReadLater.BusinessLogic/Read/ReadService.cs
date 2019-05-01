using AutoMapper;
using ReadLater.BusinessLogic.Pocket;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadLater.BusinessLogic.Read
{
    public class ReadService : IReadService
    {
        private readonly IMapper _mapper;
        private readonly IPocketService _pocketService;
        private readonly IUserSessionService _userSessionService;

        public ReadService(IMapper mapper, IPocketService pocketService, IUserSessionService userSessionService)
        {
            _mapper = mapper;
            _pocketService = pocketService;
            _userSessionService = userSessionService;
        }

        public async Task<List<ReadItem>> GetReadListAsync(string userName)
        {
            var accessToken = _userSessionService.GetAccessToken(userName);
            var pocketReadList = await _pocketService.GetReadListAsync(accessToken);
            var items = pocketReadList.Items.Values.ToArray();
            
            return _mapper.Map<List<ReadItem>>(items);
        }
    }
}
