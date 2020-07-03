namespace GamesApp.API.Models
{
    public class UserComment
    {
        public int Id { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }

        public Game Game { get; set; }
        public int GameId { get; set; }
        
        public Comment Comment { get; set; }
        public int CommentId { get; set; }
    }
}