using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using GamesApp.API.Data;
using GamesApp.API.Dtos;
using GamesApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GamesApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IGamesRepository _repo;
        private readonly IMapper _mapper;
        public GamesController(IGamesRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetGames()
        {
            var games = await _repo.GetGames();

            var gamesToReturn = _mapper.Map<IEnumerable<GameDto>>(games);

            return Ok(gamesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame(int id)
        {
            var game = await _repo.GetGame(id);

            var gameToReturn = _mapper.Map<GameDetailDto>(game);

            return Ok(gameToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGame(int id, GameForUpdateDto gameForUpdateDto)
        {
            var gameFromRepo = await _repo.GetGame(id);

            _mapper.Map(gameForUpdateDto, gameFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating game {id} failed on save");
        }
    }
}