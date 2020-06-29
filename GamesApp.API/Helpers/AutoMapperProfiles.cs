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
            CreateMap<User, UserDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Screenshot, ScreenshotForReturnDto>();
            CreateMap<ScreenshotForCreationDto, Screenshot>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}