using GamesApp.API.Models;

namespace GamesApp.API.Helpers
{
    public class GameParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int GameId { get; set; }
        public Type? Type { get; set; }
        public bool? Multiplayer { get; set; }
        public int MinPrice { get; set; } = 0;
        public int MaxPrice { get; set; } = 100;
        public string OrderBy { get; set; }
    }
}