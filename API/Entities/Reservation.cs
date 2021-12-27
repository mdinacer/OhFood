namespace API.Entities;

public class Reservation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int PartySize { get; set; }
    public DateTime Date { get; set; }
    public ReservationStatus Status { get; set; } = ReservationStatus.Pending;

    public Reservation()
    {
    }

    public Reservation(User user, int partySize, DateTime date)
    {
        UserId = user.Id;
        User = user;
        PartySize = partySize;
        Date = date;
    }
}

public enum ReservationStatus
{
    Pending,
    Confirmed,
    Rejected,
    Cancelled
}