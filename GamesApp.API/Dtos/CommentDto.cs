using System;

namespace GamesApp.API.Dtos
{
    public class CommentDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string CommentText { get; set; }
        public DateTime AddedOn { get; set; }
        public int CommentId { get; set; }
    }
}