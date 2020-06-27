using System;
using Microsoft.AspNetCore.Http;

namespace GamesApp.API.Dtos
{
    public class ScreenshotForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }

        public ScreenshotForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}