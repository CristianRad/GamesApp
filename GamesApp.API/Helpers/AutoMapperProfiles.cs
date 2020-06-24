using AutoMapper;
using GamesApp.API.Dtos;
using GamesApp.API.Models;

namespace GamesApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Game, GameDto>();
            CreateMap<Game, GameDetailDto>();
            CreateMap<Screenshot, ScreenshotDto>();
        }
    }
}