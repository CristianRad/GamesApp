using System.ComponentModel.DataAnnotations;

namespace GamesApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [StringLength(15, MinimumLength = 5, ErrorMessage = "Username must be between 5 and 15 characters")]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}