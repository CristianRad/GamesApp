using System;

namespace GamesApp.API.Dtos
{
    public class CommentForApprovalDto
    {
        public long Id { get; set; }
        public string Game { get; set; }
        public string Username { get; set; }
        public string CommentText { get; set; }
        public DateTime AddedOn { get; set; }
    }
}