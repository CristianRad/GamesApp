namespace GamesApp.API.Models
{
    public class UserRating
    {
        public long Id { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }

        public Game Game { get; set; }
        public int GameId { get; set; }
        
        public int RatingValue { get; set; }
    }
}