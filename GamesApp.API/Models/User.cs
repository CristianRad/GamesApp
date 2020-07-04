using System;
using System.Collections.Generic;

namespace GamesApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public int Budget { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string UserRole { get; set; } = "User";
        public List<UserComment> UserComments { get; set; }
        public ICollection<PurchasedGame> PurchasedGames { get; set; }
    }
}