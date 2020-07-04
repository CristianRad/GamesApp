using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using GamesApp.API.Data;
using GamesApp.API.Dtos;
using GamesApp.API.Helpers;
using GamesApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GamesApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IGamesRepository _repo;
        
        public GamesController(IGamesRepository repo, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }

        /// <summary>
        /// Return a list of all games.
        /// </summary>
        /// <param name="gameParams">The filters used for retrieving games</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetGames([FromQuery] GameParams gameParams)
        {
            var games = await _repo.GetGames(gameParams);

            var gamesToReturn = _mapper.Map<IEnumerable<GameDto>>(games);

            Response.AddPagination(games.CurrentPage, games.PageSize, games.TotalCount, games.TotalPages);

            return Ok(gamesToReturn);
        }

        /// <summary>
        /// Retrieve a game.
        /// </summary>
        /// <param name="id">The Id of the game to retrieve</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame(int id)
        {
            var game = await _repo.GetGame(id);

            var gameToReturn = _mapper.Map<GameDetailDto>(game);

            return Ok(gameToReturn);
        }

        /// <summary>
        /// Add a game.
        /// </summary>
        /// <param name="gameForCreationDto">The game to be added</param>
        /// <returns></returns>
        [Authorize(Roles = UserRole.Admin)]
        [HttpPost]
        public async Task<ActionResult<GameDetailDto>> AddGame(GameForCreationDto gameForCreationDto)
        {
            var game = _mapper.Map<Game>(gameForCreationDto);

            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            var gameToReturn = _mapper.Map<GameDetailDto>(game);

            return CreatedAtAction("GetGame", new { id = gameToReturn.Id }, gameToReturn);
        }

        /// <summary>
        /// Update a game.
        /// </summary>
        /// <param name="id">The Id of the game to update</param>
        /// <param name="gameForCreationDto">The updated game</param>
        /// <returns></returns>
        [Authorize(Roles = UserRole.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGame(int id, GameForCreationDto gameForCreationDto)
        {
            var gameFromRepo = await _repo.GetGame(id);

            _mapper.Map(gameForCreationDto, gameFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating game {id} failed on save");
        }

        /// <summary>
        /// Remove a game.
        /// </summary>
        /// <param name="id">The id of the game to remove</param>
        /// <returns></returns>
        [Authorize(Roles = UserRole.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<GameDto>> DeleteGame(int id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            var gameToReturn = _mapper.Map<GameDto>(game);

            return gameToReturn;
        }

        /// <summary>
        /// Add a comment to a game.
        /// </summary>
        /// <param name="gameId">The Id of the game a comment will be added to</param>
        /// <param name="commentForCreationDto">The comment to be added</param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("{gameId}/comments")]
        public async Task<ActionResult<Comment>> AddComment(int gameId, CommentForCreationDto commentForCreationDto)
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (!GameExists(gameId))
            {
                return BadRequest("Game does not exist");
            }

            var comment = _mapper.Map<Comment>(commentForCreationDto);

            comment.AddedOn = DateTime.Now;
            comment.IsApproved = false;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            var newComment = await _context.Comments.IgnoreQueryFilters().FirstOrDefaultAsync(c => c.Id == comment.Id);

            var userComment = new UserComment { UserId = userId, CommentId = comment.Id, GameId = gameId };
            
            _context.UserComments.Add(userComment);
            await _context.SaveChangesAsync();

            var updatedGame = await _context.Games.FindAsync(gameId);
            updatedGame.UserComments.Add(userComment);

            var updatedUser = await _context.Users.FindAsync(userId);
            updatedUser.UserComments.Add(userComment);

            return Ok();
        }

        private bool GameExists(long id)
        {
            return _context.Games.Any(g => g.Id == id);
        }
    }
}