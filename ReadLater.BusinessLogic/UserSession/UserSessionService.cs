﻿using AutoMapper;
using ReadLater.BusinessLogic.Pocket;
using ReadLater.Database.UserSession;
using System.Threading.Tasks;

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

        public string GetAccessToken(string userName)
        {
            var userSession = _userSessionRepository.GetUserSession(userName);

            if (userSession == null || userSession.RequestToken == null)
            {
                return null;
            }

            if (userSession.AccessToken != null)
            {
                return userSession.AccessToken;
            }

            return null;
        }

        public async Task AuthorizeRequestTokenAsync(string userName)
        {
            var userSession = _userSessionRepository.GetUserSession(userName);
            var token = await _pocketService.GetAccessTokenAsync(userSession.RequestToken);

            userSession.AccessToken = token;
            userSession.IsAuthorized = true;

            await _userSessionRepository.UpdateUserSessionAsync(userSession);
        }

        public async Task<string> GetRequestTokenAsync(string userName)
        {
            var userSession = _userSessionRepository.GetUserSession(userName);

            if (userSession != null && userSession.IsAuthorized)
            {
                return userSession.RequestToken;
            }

            if (userSession == null)
            {
                userSession = await _userSessionRepository.CreateUserSessionAsync(userName);
            }

            var token = await _pocketService.GetRequestTokenAsync();
            userSession.RequestToken = token;

            await _userSessionRepository.UpdateUserSessionAsync(userSession);

            return token;
        }

        public UserSession GetUserSession(string userName)
        {
            var session = _userSessionRepository.GetUserSession(userName);

            return _mapper.Map<UserSession>(session);
        }
    }
}
