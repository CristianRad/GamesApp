using Microsoft.AspNetCore.Http;

namespace GamesApp.API.Dtos
{
    public class FileForUploadDto
    {
        public IFormFile File { get; set; }
    }
}