using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using GamesApp.API.Data;
using GamesApp.API.Dtos;
using GamesApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GamesApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public CommentsController(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUnapprovedComments()
        {
            var userComments = await _context.UserComments
                .Include(uc => uc.Comment).Include(uc => uc.User).Include(uc => uc.Game)
                .IgnoreQueryFilters().Where(uc => uc.Comment.IsApproved == false)
                .OrderByDescending(uc => uc.Comment.AddedOn)
                .ToListAsync();

            var comments = _mapper.Map<IEnumerable<CommentForApprovalDto>>(userComments);

            return Ok(comments);
        }

        [HttpPost("approve/{id}")]
        public async Task<IActionResult> ApproveComment(long id)
        {
            var comment = await _context.Comments.IgnoreQueryFilters().FirstOrDefaultAsync(c => c.Id == id && c.IsApproved == false);

            if (comment == null)
            {
                BadRequest("No comment to approve");
            }

            comment.IsApproved = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("reject/{id}")]
        public async Task<IActionResult> RejectComment(long id)
        {
            var comment = await _context.Comments.IgnoreQueryFilters().FirstOrDefaultAsync(c => c.Id == id && c.IsApproved == false);

            if (comment == null)
            {
                return NotFound();
            }

            var userComment = await _context.UserComments.FirstOrDefaultAsync(uc => uc.CommentId == id);
            if (userComment != null)
            {
                _context.UserComments.Remove(userComment);
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{commentId}")]
        public async Task<ActionResult<Comment>> EditComment(long commentId, CommentForUpdateDto commentForUpdateDto)
        {
            UserComment userComment = await _context.UserComments.FirstOrDefaultAsync(uc => uc.CommentId == commentId);
            
            if(userComment == null)
            {
                return BadRequest("No user associated with this comment was found");
            }
            
            if (userComment.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            if (commentId != commentForUpdateDto.Id)
            {
                return BadRequest("A mismatch between the Id of the comment to update and the Id of the updated comment was found");
            }

            if (!CommentExists(commentId))
            {
                return NotFound();
            }

            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);

            comment.CommentText = commentForUpdateDto.CommentText;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{commentId}")]
        public async Task<ActionResult<Comment>> DeleteComment(long commentId)
        {
            if (!CommentExists(commentId))
            {
                return NotFound();
            }

            UserComment userComment = await _context.UserComments.FirstOrDefaultAsync(uc => uc.CommentId == commentId);

            if (userComment.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);

            _context.UserComments.Remove(userComment);
            _context.Comments.Remove(comment);

            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool CommentExists(long id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}