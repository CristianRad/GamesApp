using System;

namespace GamesApp.API.Models
{
    public class Screenshot
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}