using System;

namespace GamesApp.API.Dtos
{
    public class ScreenshotDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
    }
}