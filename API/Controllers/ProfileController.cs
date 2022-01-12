using API.Data;
using API.DTO;
using API.Entities;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class ProfileController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;

    public ProfileController(StoreContext context, UserManager<User> userManager, IMapper mapper,
        ImageService imageService)
    {
        _context = context;
        _userManager = userManager;
        _mapper = mapper;
        _imageService = imageService;
    }


    [HttpGet]
    public async Task<ActionResult<UserProfileDto>> GetProfile()
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .SingleOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null) return NotFound("User Not found and it's impossible");

        return _mapper.Map<UserProfileDto>(user.Profile);
    }

    [HttpPost]
    public async Task<ActionResult<UserProfileDto>> CreateProfile([FromForm] CreateUserProfileDto createProfile)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .SingleOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null) return NotFound("User Not found and it's impossible");

        var userProfile = _mapper.Map<UserProfile>(createProfile);

        if (createProfile.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(createProfile.File);

            if (imageResult.Error != null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            userProfile.PictureUrl = imageResult.SecureUrl.ToString();
            userProfile.PublicId = imageResult.PublicId;
        }

        user.Profile = userProfile;

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok("User Profile created")
            : BadRequest(new ProblemDetails { Title = "Error creating profile" });
    }


    [HttpPut]
    public async Task<ActionResult<UserProfileDto>> UpdateProfile([FromForm] UpdateUserProfileDto updateProfile)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .SingleOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null) return NotFound("User Not found and it's impossible");

        var profile = user.Profile;
        
        _mapper.Map(updateProfile, profile);
        
        if (updateProfile.File != null)
        {
            var imageTransform = new ImageTransform
            {
                Height = 200,
                Width = 200,
                Crop = CropMode.fill,
                Gravity = "face"
            };
            
            var imageResult = await _imageService.AddImageAsync(updateProfile.File, "profiles",imageTransform );

            if (imageResult.Error != null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            if (!string.IsNullOrEmpty(profile.PublicId))
                await _imageService.DeleteImageAsync(profile.PublicId);

            profile.PictureUrl = imageResult.SecureUrl.ToString();
            profile.PublicId = imageResult.PublicId;
        }

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(_mapper.Map<UserProfileDto>(user.Profile))
            : BadRequest(new ProblemDetails { Title = "Error update profile" });
    }

    [HttpGet("addresses/")]
    public async Task<ActionResult<List<UserAddress>>> GetAddresses()
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .ThenInclude(p => p.Addresses)
            .SingleOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null) return NotFound("User Not found and it's impossible");

        return user.Profile.Addresses;
    }

    [HttpGet("addresses/default")]
    public async Task<ActionResult<UserAddress>> GetDefaultAddress()
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .ThenInclude(p => p.Addresses)
            .SingleOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null) return NotFound("User Not found and it's impossible");

        var defaultAddress = user.Profile.Addresses
            .FirstOrDefault(a => a.IsDefault);


        if (defaultAddress == null) return NotFound(new ProblemDetails { Title = "No Default Address set" });

        return defaultAddress;
    }

    [HttpPut("addresses/setDefault/{id}")]
    public async Task<IActionResult> SetDefaultAddress(int id)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .ThenInclude(p => p.Addresses)
            .SingleOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null) return NotFound("User Not found and it's impossible");

        var address = user.Profile.Addresses.SingleOrDefault(a => a.Id == id);

        if (address == null) return NotFound("Address not found");

        foreach (var item in user.Profile.Addresses.Where(a => a.Id != id))
        {
            item.IsDefault = false;
        }

        address.IsDefault = true;

        var result = await _context.SaveChangesAsync() > 0;

        return result ? Ok() : BadRequest(new ProblemDetails { Title = "Problem setting default Address" });
    }

    [HttpPost("addresses/")]
    public async Task<ActionResult<AddressDto>> CreateAddress([FromForm] CreateAddressDto address)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .ThenInclude(p => p.Addresses)
            .SingleOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null) return NotFound("User Not found and it's impossible");

        var addressExists = user.Profile.Addresses
            .Any(a =>
                a.FullName.Equals(address.FullName, StringComparison.InvariantCultureIgnoreCase) &&
                a.Address1.Equals(address.Address1, StringComparison.InvariantCultureIgnoreCase));

        if (addressExists)
            return BadRequest(new ProblemDetails { Title = "This address is already present in you address book" });

        if (address.IsDefault)
        {
            user.Profile.Addresses.ForEach(a => a.IsDefault = false);
        }

        var newAddress = _mapper.Map<UserAddress>(address);

        user.Profile.Addresses.Add(newAddress);

        var success = await _context.SaveChangesAsync() > 0;
        return success
            ? Ok(_mapper.Map<AddressDto>(newAddress))
            : BadRequest(new ProblemDetails { Title = "Problem saving address" });
        ;
    }

    [HttpPut("addresses/")]
    public async Task<ActionResult<AddressDto>> UpdateAddress([FromForm] AddressDto updateAddress)
    {
        var user = await _context.Users
            .Include(u => u.Profile)
            .ThenInclude(p => p.Addresses)
            .SingleOrDefaultAsync(u => u.UserName == User.Identity!.Name);

        if (user == null) return NotFound("User Not found and it's impossible");

        var address = user.Profile.Addresses.SingleOrDefault(a => a.Id == updateAddress.Id);

        if (address == null) return BadRequest(new ProblemDetails { Title = "Address not found" });

        if (updateAddress.IsDefault)
        {
            user.Profile.Addresses.ForEach(a => a.IsDefault = false);
        }

        _mapper.Map(updateAddress, address);

        var success = await _context.SaveChangesAsync() > 0;
        return success ? Ok(address) : BadRequest(new ProblemDetails { Title = "Problem updating address" });
        ;
    }


    [HttpDelete("addresses/{id:int}")]
    public async Task<ActionResult> DeleteAddress(int id)
    {
        var address = await _context.Addresses.FindAsync(id);

        if (address == null) return NotFound();

        _context.Addresses.Remove(address);

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok()
            : BadRequest(new ProblemDetails { Title = "Problem deleting address" });
    }
}