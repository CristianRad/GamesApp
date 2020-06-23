using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<Game> GetGame(int id)
        {
            var game = await _context.Games
                .Include(g => g.UserComments)
                .FirstOrDefaultAsync(g => g.Id == id);

            return game;
        }

        public async Task<IEnumerable<Game>> GetGames()
        {
            var games = await _context.Games
                .Include(g => g.UserComments)
                .ToListAsync();

            return games;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}