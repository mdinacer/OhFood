namespace API.Entities;

public class Ingredient
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Product> Products { get; set; } = new();

    public Ingredient()
    {
    }

    public Ingredient(string name)
    {
        Name = name;
    }
}