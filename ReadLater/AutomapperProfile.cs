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

            CreateMap<BusinessLogic.Pocket.PocketItem, BusinessLogic.Read.ReadItem>()
                .ForMember(d => d.Url, m => m.MapFrom(s => s.ResolvedUrl))
                .ForMember(d => d.Title, m => m.MapFrom(s => s.ResolvedTitle))
                .ForMember(d => d.Description, m => m.MapFrom(s => s.Excerpt));
        }
    }
}
