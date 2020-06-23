using System;

namespace GamesApp.API.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string PhotoUrl { get; set; }
    }
}