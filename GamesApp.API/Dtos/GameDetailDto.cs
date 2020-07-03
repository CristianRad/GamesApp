using System.Collections.Generic;
using GamesApp.API.Models;

namespace GamesApp.API.Dtos
{
    public class GameDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
        public int Price { get; set; }
        public bool Multiplayer { get; set; }
        public string PhotoUrl { get; set; }
        public List<ScreenshotDto> Screenshots { get; set; }
        public List<CommentDto> UserComments { get; set; } = new List<CommentDto>();
    }
}