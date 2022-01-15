using API.Data;
using API.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AnnouncesController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;

    public AnnouncesController(StoreContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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

    
}

