using API.Data;
using API.DTO;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class ReservationsController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;

    public ReservationsController(StoreContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<ReservationDto>> GetReservations()
    {
        var reservations = await _context.Reservations
            .ProjectTo<ReservationDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        return Ok(reservations);
    }

    [HttpGet("userReservations")]
    public async Task<ActionResult<ReservationDto>> GetUserReservations()
    {
        var username = User.Identity.Name;

        if (string.IsNullOrEmpty(username)) return BadRequest();

        var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);

        if (user == null) return BadRequest();

        var reservations = await _context.Reservations
            .Where(r => r.UserId == user.Id).OrderBy(r => r.Date)
            .ProjectTo<ReservationDto>(_mapper.ConfigurationProvider)
            .ToListAsync();


        return Ok(reservations);
    }

    [HttpGet("{id:int}", Name = "GetReservation")]
    public async Task<ActionResult<ReservationDto>> GetReservation(int id)
    {
        var username = User.Identity.Name;

        if (string.IsNullOrEmpty(username)) return BadRequest();

        var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);

        if (user == null) return BadRequest();

        var reservation = await _context.Reservations.FindAsync(id);

        if (reservation == null) return NotFound();
        if (reservation.UserId != user.Id) return BadRequest();

        return Ok(_mapper.Map<ReservationDto>(reservation));
    }

    [HttpPost]
    public async Task<ActionResult<ReservationDto>> CreateReservation(CreateReservationDto createReservation)
    {
        var username = User.Identity.Name;

        if (string.IsNullOrEmpty(username)) return BadRequest();

        var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);

        if (user == null) return BadRequest();

        var reservation = new Reservation(user, createReservation.PartySize, createReservation.Date.Date.ToUniversalTime());


        _context.Reservations.Add(reservation);

        var success = await _context.SaveChangesAsync() > 0;

        if (!success) return BadRequest(new ProblemDetails { Title = "Problem creating reservation" });

        return CreatedAtRoute("GetReservation", new { id = reservation.Id }, _mapper.Map<ReservationDto>(reservation));
    }
    
    [HttpPut]
    public async Task<ActionResult<ReservationDto>> UpdateReservation(UpdateReservationDto updateReservation)
    {
        var reservation = await _context.Reservations.FindAsync(updateReservation.Id);

        if (reservation == null) return NotFound();

        _mapper.Map(updateReservation, reservation);

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(_mapper.Map<AnnounceDto>(reservation))
            : BadRequest(new ProblemDetails { Title = "Problem updating reservation" });
    }
    
    [HttpPatch("cancelReservation/{id:int}")]
    public async Task<IActionResult> CancelReservation(int id)
    {
        var reservation = await _context.Reservations.FindAsync(id);

        if (reservation == null) return NotFound();
        if (reservation.Status == ReservationStatus.Cancelled) return BadRequest("Reservation already cancelled");

        reservation.Status = ReservationStatus.Cancelled;
        _context.Update(reservation);
        
        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok("Reservation Cancelled")
            : BadRequest(new ProblemDetails { Title = "Problem canceling reservation" });
    }
    
    
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteReservation(int id)
    {
        var reservation = await _context.Reservations.FindAsync(id);

        if (reservation == null) return NotFound();

        _context.Reservations.Remove(reservation);

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok()
            : BadRequest(new ProblemDetails { Title = "Problem deleting reservation" });
    }
}