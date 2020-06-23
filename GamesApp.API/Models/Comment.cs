using System;

namespace GamesApp.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public DateTime AddedOn { get; set; }
        public bool IsApproved { get; set; }
    }
}