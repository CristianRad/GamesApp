using System.Threading.Tasks;
using GamesApp.API.Helpers;
using GamesApp.API.Models;

namespace GamesApp.API.Data
{
    public interface IGamesRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<Game>> GetGames(GameParams gameParams);
         Task<Game> GetGame(int id);
         Task<Screenshot> GetScreenshot(int id);
    }
}