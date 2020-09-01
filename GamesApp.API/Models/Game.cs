using System.Collections.Generic;

namespace GamesApp.API.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Type Type { get; set; }
        public int Year { get; set; }
        public int Price { get; set; }
        public bool Multiplayer { get; set; }
        public string PhotoUrl { get; set; }
        public List<Screenshot> Screenshots { get; set; }
        public List<UserComment> UserComments { get; set; }
        public List<UserRating> UserRatings { get; set; }
        public ICollection<PurchasedGame> GamePurchasedByUsers { get; set; }
        public byte[] DownloadFile { get; set; }
    }
}