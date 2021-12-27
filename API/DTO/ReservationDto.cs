namespace API.DTO;

public class ReservationDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Username { get; set; }
    public int PartySize { get; set; }
    public DateTime Date { get; set; }
    public string Status { get; set; } 
}

public class CreateReservationDto
{
    public int PartySize { get; set; }
    public DateTime Date { get; set; }
}

public class UpdateReservationDto
{
    public int Id { get; set; }
    public int PartySize { get; set; }
    public DateTime Date { get; set; }
}