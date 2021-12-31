using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
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

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context,
            IMailService mailService)
        {
            _context = context;
            _mailService = mailService;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);

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
                Email = user.Email,
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
            var user = await _userManager.FindByNameAsync(User.Identity!.Name);
            var userBasket = await RetrieveBasket(User.Identity!.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.ToBasketDto(),
            };
        }

        [Authorize]
        [HttpGet("defaultAddress")]
        public async Task<ActionResult<UserAddress>> GetDefaultAddress()
        {
            var address = await _userManager.Users
                .Where(u => u.UserName == User.Identity!.Name)
                .Select(u => u.Address)
                .FirstOrDefaultAsync();

            //if(address == null) return NotFound();

            return address;
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
                    .ThenInclude(p => p.Type)
                    .SingleOrDefaultAsync(basket => basket.BuyerId == buyerId);
            Response.Cookies.Delete("buyerId");
            return null;
        }
    }
}