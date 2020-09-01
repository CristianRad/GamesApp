using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GamesApp.API.Helpers;
using GamesApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GamesApp.API.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;
        public UsersRepository(DataContext context)
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

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<Game>> GetPurchasedGames(int userId, GameParams gameParams)
        {
            var purchasedGames = _context.PurchasedGames
                .Include(pg => pg.Game)
                .Include(pg => pg.Game.UserRatings).ThenInclude(ur => ur.User)
                .Include(pg => pg.Game.UserRatings).ThenInclude(ur => ur.Game)
                .Where(pg => pg.UserId == userId)
                .Select(pg => pg.Game)
                .AsQueryable();

            return await PagedList<Game>.CreateAsync(purchasedGames, gameParams.PageNumber, gameParams.PageSize);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}