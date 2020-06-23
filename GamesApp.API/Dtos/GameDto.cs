namespace GamesApp.API.Dtos
{
    public class GameDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
        public int Price { get; set; }
        public bool Multiplayer { get; set; }
        public string PhotoUrl { get; set; }
    }
}