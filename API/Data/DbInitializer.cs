using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {

            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }

            if (context.Products.Any())
                return;

            var products = new List<Product>
            {
                new ()
                {
                    Name = "Le Basic",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 200,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le Classic",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 250,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le Moderne",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 250,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le Detroit",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 300,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le Tropical",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 300,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le Faya",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 300,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le 44 Poulet",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 400,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le 44 V.H",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 400,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "L'Affro'",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 450,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le Brute",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 450,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le Forestier",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 500,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Le DZ",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 500,
                    PictureUrl = "/images/sandwich.png",
                    Brand = "",
                    Type = "Sandwich",
                    Inventory = 100
                },

                new ()
                {
                    Name = "Chicken Wrap",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 350,
                    PictureUrl = "/images/wrap.png",
                    Brand = "",
                    Type = "Wraps",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Hot Wrap",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 400,
                    PictureUrl = "/images/wrap.png",
                    Brand = "",
                    Type = "Wraps",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Diety Wrap",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 400,
                    PictureUrl = "/images/wrap.png",
                    Brand = "",
                    Type = "Wraps",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Ourika Wrap",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 400,
                    PictureUrl = "/images/wrap.png",
                    Brand = "",
                    Type = "Wraps",
                    Inventory = 100
                },

                new ()
                {
                    Name = "Big Tasty Burger",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 600,
                    PictureUrl = "/images/big.png",
                    Brand = "",
                    Type = "Big",
                    Inventory = 100
                },

                new ()
                {
                    Name = "Big Bang Burger",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 600,
                    PictureUrl = "/images/big.png",
                    Brand = "",
                    Type = "Big",
                    Inventory = 100
                },

                new ()
                {
                    Name = "Mousse au Chocolat",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 200,
                    PictureUrl = "/images/dessert.png",
                    Brand = "",
                    Type = "Dessert",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Tiramisu",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 200,
                    PictureUrl = "/images/dessert.png",
                    Brand = "",
                    Type = "Dessert",
                    Inventory = 100
                },
                new ()
                {
                    Name = "Salade de Fruits",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 300,
                    PictureUrl = "/images/dessert.png",
                    Brand = "",
                    Type = "Dessert",
                    Inventory = 100
                },

            };

            context.Products.AddRange(products);

            await context.SaveChangesAsync();
        }
    }
}