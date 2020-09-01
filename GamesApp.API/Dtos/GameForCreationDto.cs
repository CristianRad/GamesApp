namespace GamesApp.API.Dtos
{
    public class GameForCreationDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int Year { get; set; }
        public int Price { get; set; }
        public bool Multiplayer { get; set; }
        public string PhotoUrl { get; set; }
        public byte[] DownloadFile { get; set; }
    }
}