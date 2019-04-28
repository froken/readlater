using AutoMapper;
using ReadLater.BusinessLogic.Pocket;
using ReadLater.Database.UserSession;

namespace ReadLater.BusinessLogic
{
    public class UserSessionService : IUserSessionService
    {
        private IMapper _mapper;
        private readonly IUserSessionRepository _userSessionRepository;
        private readonly IPocketService _pocketService;

        public UserSessionService(IMapper mapper, IUserSessionRepository userSessionRepository, IPocketService pocketService)
        {
            _mapper = mapper;
            _pocketService = pocketService;
            _userSessionRepository = userSessionRepository;
        }

        public UserSession GetUserSession(string userId)
        {
            return _userSessionRepository.GetUserSession(userId);
        }

    }
}
