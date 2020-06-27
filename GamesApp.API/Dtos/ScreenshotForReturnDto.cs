using System;

namespace GamesApp.API.Dtos
{
    public class ScreenshotForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
    }
}