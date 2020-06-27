using System.Collections.Generic;
using System.Threading.Tasks;
using GamesApp.API.Models;

namespace GamesApp.API.Data
{
    public interface IGamesRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<Game>> GetGames();
         Task<Game> GetGame(int id);
         Task<Screenshot> GetScreenshot(int id);
    }
}