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
            CreateMap<GameForCreationDto, Game>();

            CreateMap<Screenshot, ScreenshotDto>();
            CreateMap<Screenshot, ScreenshotForReturnDto>();
            CreateMap<ScreenshotForCreationDto, Screenshot>();

            CreateMap<User, UserDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();

            CreateMap<UserComment, CommentDto>()
                .ForMember(
                    dest => dest.Id,
                    opt => opt.MapFrom(src => src.Comment.Id))
                .ForMember(
                    dest => dest.Username,
                    opt => opt.MapFrom(src => src.User.Username))
                .ForMember(
                    dest => dest.CommentText,
                    opt => opt.MapFrom(src => src.Comment.CommentText))
                .ForMember(
                    dest => dest.AddedOn,
                    opt => opt.MapFrom(src => src.Comment.AddedOn))
                .ForMember(
                    dest => dest.CommentId,
                    opt => opt.MapFrom(src => src.CommentId));
            CreateMap<UserComment, CommentForApprovalDto>()
                .ForMember(
                   dest => dest.Id,
                   opt => opt.MapFrom(src => src.CommentId))
                 .ForMember(
                   dest => dest.Game,
                   opt => opt.MapFrom(src => src.Game.Title))
                .ForMember(
                   dest => dest.Username,
                   opt => opt.MapFrom(src => src.User.Username))
               .ForMember(
                   dest => dest.CommentText,
                   opt => opt.MapFrom(src => src.Comment.CommentText))
               .ForMember(
                   dest => dest.AddedOn,
                   opt => opt.MapFrom(src => src.Comment.AddedOn));
            CreateMap<CommentForCreationDto, Comment>();
        }
    }
}