namespace GamesApp.API.Models
{
    public class PurchasedGame
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
        public string SerialKey { get; set; }
    }
}