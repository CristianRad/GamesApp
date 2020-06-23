using System.Collections.Generic;

namespace GamesApp.API.Dtos
{
    public class GameDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
        public int Price { get; set; }
        public bool Multiplayer { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<CommentDto> UserComments { get; set; }
    }
}