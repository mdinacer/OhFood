namespace API.Entities;

public class Announce
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string? PictureUrl { get; set; }
    public string? PublicId { get; set; }

    public Announce()
    {
    }

    public Announce(string title, string description, string? pictureUrl)
    {
        Title = title;
        Description = description;
        PictureUrl = pictureUrl;
    }
}