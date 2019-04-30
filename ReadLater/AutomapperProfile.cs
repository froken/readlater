using AutoMapper;
using ReadLater.BusinessLogic;
using ReadLater.Models;

namespace ReadLater
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Database.UserSession.UserSession, UserSession>();
        }
    }
}
