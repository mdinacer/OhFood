using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        private readonly IMailService _mailService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context,
            IMailService mailService, IMapper mapper)
        {
            _context = context;
            _mailService = mailService;
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .Include(u => u.Profile)
                .SingleOrDefaultAsync(u =>
                    u.UserName == loginDto.Username);
            //_userManager.FindByNameAsync(loginDto.Username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }

            var userBasket = await RetrieveBasket(loginDto.Username);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Profile = _mapper.Map<UserProfileDto>(user.Profile),
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket?.ToBasketDto() ?? userBasket?.ToBasketDto()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _context.Users
                .Include(u => u.Profile)
                .SingleOrDefaultAsync(u =>
                    u.UserName == User.Identity!.Name);
            var userBasket = await RetrieveBasket(User.Identity!.Name);

            if (user == null) return BadRequest(new ProblemDetails { Title = "You must be logged in" });
            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.ToBasketDto(),
                Profile = _mapper.Map<UserProfileDto>(user.Profile)
            };
        }


        [HttpPost("sendMail")]
        public async Task<IActionResult> SendMail([FromForm] MailRequest request)
        {
            await _mailService.SendContactMessageAsync(request);
            return Ok();
        }

        private async Task<Basket?> RetrieveBasket(string? buyerId)
        {
            if (!string.IsNullOrEmpty(buyerId))
                return await _context.Baskets
                    .Include(basket => basket.Items)
                    .ThenInclude(item => item.Product)
                    .ThenInclude(p => p.Category)
                    .SingleOrDefaultAsync(basket => basket.BuyerId == buyerId);
            Response.Cookies.Delete("buyerId");
            return null;
        }
    }
}