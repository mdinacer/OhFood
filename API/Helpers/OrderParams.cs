namespace API.Helpers;

public class OrderParams : PaginationParams
{
    public string OrderBy { get; set; } = "dateAsc";
    public string? SearchTerm { get; set; }
    public int? status { get; set; }
}