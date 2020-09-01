using System.Collections.Generic;
using System.Threading.Tasks;
using GamesApp.API.Helpers;
using GamesApp.API.Models;

namespace GamesApp.API.Data
{
    public interface IUsersRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         Task<PagedList<Game>> GetPurchasedGames(int userId, GameParams gameParams);
    }
}