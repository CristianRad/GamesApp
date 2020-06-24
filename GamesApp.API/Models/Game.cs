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
        public ICollection<Screenshot> Screenshots { get; set; }
        public ICollection<UserComment> UserComments { get; set; }
        public ICollection<PurchasedGame> GamePurchasedByUsers { get; set; }
    }
}