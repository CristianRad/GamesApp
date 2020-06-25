namespace GamesApp.API.Dtos
{
    public class UserForUpdateDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public int Budget { get; set; }
        public string PhotoUrl { get; set; }
    }
}