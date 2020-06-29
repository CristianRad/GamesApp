using System;
using System.Linq;
using System.Threading.Tasks;
using GamesApp.API.Helpers;
using GamesApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesApp.API.Data
{
    public class GamesRepository : IGamesRepository
    {
        private readonly DataContext _context;
        public GamesRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Screenshot> GetScreenshot(int id)
        {
            var screenshot = await _context.Screenshots.FirstOrDefaultAsync(s => s.Id == id);

            return screenshot;
        }

        public async Task<Game> GetGame(int id)
        {
            var game = await _context.Games
                .Include(g => g.Screenshots)
                .FirstOrDefaultAsync(g => g.Id == id);

            return game;
        }

        public async Task<PagedList<Game>> GetGames(GameParams gameParams)
        {
            var games = _context.Games.Include(g => g.Screenshots).OrderByDescending(g => g.Year).AsQueryable();

            if (gameParams.MinPrice != 0 || gameParams.MaxPrice != 100)
                games = games.Where(g => g.Price >= gameParams.MinPrice && g.Price <= gameParams.MaxPrice);

            if (gameParams.Type != null)
                games = games.Where(g => g.Type == gameParams.Type);

            if (gameParams.Multiplayer != null)
                games = games.Where(g => g.Multiplayer == gameParams.Multiplayer);

            if (!string.IsNullOrEmpty(gameParams.OrderBy))
            {
                switch (gameParams.OrderBy)
                {
                    case "price":
                        games = games.OrderByDescending(g => g.Price);
                        break;
                    default:
                        games = games.OrderByDescending(g => g.Year);
                        break;
                }
            }

            return await PagedList<Game>.CreateAsync(games, gameParams.PageNumber, gameParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}