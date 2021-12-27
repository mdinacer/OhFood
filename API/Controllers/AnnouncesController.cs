using API.Data;
using API.DTO;
using API.Entities;
using API.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AnnouncesController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;

    public AnnouncesController(StoreContext context, IMapper mapper, ImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<AnnounceDto>> GetAnnounces()
    {
        var announces = await _context.Announces.OrderBy(a => a.Title)
            .ProjectTo<AnnounceDto>(_mapper.ConfigurationProvider).ToListAsync();

        return Ok(announces);
    }

    [HttpGet("{id:int}", Name = "GetAnnounce")]
    public async Task<ActionResult<AnnounceDto>> GetAnnounce(int id)
    {
        var announce = await _context.Announces.FindAsync(id);

        return announce != null ? _mapper.Map<AnnounceDto>(announce) : NotFound();
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<AnnounceDto>> CreateAnnounce([FromForm] CreateAnnounceDto createAnnounceDto)
    {
        var announce = _mapper.Map<Announce>(createAnnounceDto);

        var transform = new ImageTransform
        {
            Width = 1024,
            Height = 768,
            Crop = CropMode.fit
        };
        var imageResult = await _imageService.AddImageAsync(createAnnounceDto.File,"announces", transform);

        
        if (imageResult.Error != null)
            return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

        announce.PictureUrl = imageResult.SecureUrl.ToString();
        announce.PublicId = imageResult.PublicId;

        _context.Announces.Add(announce);

        var success = await _context.SaveChangesAsync() > 0;

        if (!success) return BadRequest(new ProblemDetails { Title = "Problem creating announce" });

        return CreatedAtRoute("GetAnnounce", new { id = announce.Id }, announce);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<AnnounceDto>> UpdateAnnounce([FromForm] UpdateAnnounceDto updateAnnounce)
    {
        var announce = await _context.Announces.FindAsync(updateAnnounce.Id);

        if (announce == null) return NotFound();

        _mapper.Map(updateAnnounce, announce);

        var imageResult = await _imageService.AddImageAsync(updateAnnounce.File);

        if (imageResult.Error != null)
            return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

        if (!string.IsNullOrEmpty(announce.PublicId))
            await _imageService.DeleteImageAsync(announce.PublicId);

        announce.PictureUrl = imageResult.SecureUrl.ToString();
        announce.PublicId = imageResult.PublicId;

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(_mapper.Map<AnnounceDto>(announce))
            : BadRequest(new ProblemDetails { Title = "Problem updating announce" });
    }


    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAnnounce(int id)
    {
        var announce = await _context.Announces.FindAsync(id);

        if (announce == null) return NotFound();

        if (!string.IsNullOrEmpty(announce.PublicId))
            await _imageService.DeleteImageAsync(announce.PublicId);

        _context.Announces.Remove(announce);

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok()
            : BadRequest(new ProblemDetails { Title = "Problem deleting announce" });
    }
}

