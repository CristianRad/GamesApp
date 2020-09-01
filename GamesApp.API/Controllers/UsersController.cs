using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using GamesApp.API.Data;
using GamesApp.API.Dtos;
using GamesApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GamesApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IUsersRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        /// <summary>
        /// Return a list of all users.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserDto>>(users);

            return Ok(usersToReturn);
        }

        /// <summary>
        /// Retrieve a user.
        /// </summary>
        /// <param name="id">The Id of the user to retrieve</param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserDto>(user);

            return Ok(userToReturn);
        }

        /// <summary>
        /// Retrieves the list of games purchased by a user.
        /// </summary>
        /// <param name="id">The Id of the user whose purchased games are to be retrieved</param>
        /// <param name="gameParams">The filters used for retrieving games</param>
        /// <returns></returns>
        [HttpGet("{id}/purchasedgames")]
        public async Task<IActionResult> GetUsersPurchasedGames(int id, [FromQuery] GameParams gameParams)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var games = await _repo.GetPurchasedGames(id, gameParams);
            
            var gamesToReturn = _mapper.Map<IEnumerable<GameDto>>(games);

            Response.AddPagination(games.CurrentPage, games.PageSize, games.TotalCount, games.TotalPages);

            return Ok(gamesToReturn);
        }

        /// <summary>
        /// Update a user.
        /// </summary>
        /// <param name="id">The Id of the user to update</param>
        /// <param name="userForUpdateDto">The updated user</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating user {id} failed on save");
        }
    }
}