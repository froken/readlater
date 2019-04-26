using AutoMapper;
using ReadLater.Models;

namespace ReadLater
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<RegisterModel, ApplicationUser>();
        }
    }
}
