using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using GamesApp.API.Data;
using GamesApp.API.Dtos;
using GamesApp.API.Helpers;
using GamesApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace GamesApp.API.Controllers
{
    [Authorize]
    [Route("api/games/{gameId}/screenshots")]
    [ApiController]
    public class ScreenshotsController : ControllerBase
    {
        private readonly IGamesRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public ScreenshotsController(IGamesRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        /// <summary>
        /// Retrieve a screenshot.
        /// </summary>
        /// <param name="id">The Id of the screenshot to retrieve</param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetScreenshot")]
        public async Task<IActionResult> GetScreenshot(int id)
        {
            var screenshotFromRepo = await _repo.GetScreenshot(id);

            var screenshot = _mapper.Map<ScreenshotForReturnDto>(screenshotFromRepo);

            return Ok(screenshot);
        }

        /// <summary>
        /// Add a screenshot to a game.
        /// </summary>
        /// <param name="gameId">The Id of the game a screenshot will be added to</param>
        /// <param name="screenshotForCreationDto">The screenshot to be added</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddScreenshotForGame(int gameId, [FromForm]ScreenshotForCreationDto screenshotForCreationDto)
        {
            var gameFromRepo = await _repo.GetGame(gameId);

            var file = screenshotForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            screenshotForCreationDto.Url = uploadResult.Url.ToString();
            screenshotForCreationDto.PublicId = uploadResult.PublicId;

            var screenshot = _mapper.Map<Screenshot>(screenshotForCreationDto);

            gameFromRepo.Screenshots.Add(screenshot);

            if (await _repo.SaveAll())
            {
                var screenshotToReturn = _mapper.Map<ScreenshotForReturnDto>(screenshot);
                return CreatedAtRoute("GetScreenshot", new { gameId = gameId, id = screenshot.Id }, screenshotToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        /// <summary>
        /// Remove a screenshot.
        /// </summary>
        /// <param name="gameId">The Id of the game a screenshot will be removed from</param>
        /// <param name="id">The Id of the screenshot to remove</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScreenshot(int gameId, int id)
        {
            var game = await _repo.GetGame(gameId);

            if (!game.Screenshots.Any(s => s.Id == id))
                return Unauthorized();
            
            var screenshotFromRepo = await _repo.GetScreenshot(id);

            if (screenshotFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(screenshotFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok") 
                {
                    _repo.Delete(screenshotFromRepo);
                }
            }

            if (screenshotFromRepo.PublicId == null)
            {
                _repo.Delete(screenshotFromRepo);
            }

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the screenshot");
        }
    }
}