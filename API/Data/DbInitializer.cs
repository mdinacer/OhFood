using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

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

        if (!context.Products.Any())
        {
            const string ingredients = "Ingredient 1 - Ingredient 2 - Ingredient 3 - Ingredient 4 - Ingredient 5";
            
            var sandwich = new ProductType
            {
                Name = "Burger",
                PictureUrl = "/images/backgrounds/types/burger_bg.webp",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "The Basic",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 5,
                        PictureUrl = "/images/products/sandwich.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "The Classic",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 6,
                        PictureUrl = "/images/products/sandwich.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "The Modern",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 7,
                        PictureUrl = "/images/products/sandwich.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Detroit",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 8,
                        PictureUrl = "/images/products/sandwich.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Big Tasty Burger",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 9,
                        PictureUrl = "/images/products/sandwich.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },

                    new()
                    {
                        Name = "Big Bang Burger",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 10,
                        PictureUrl = "/images/products/sandwich.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                }
            };

            var pizza = new ProductType
            {
                Name = "Pizza",
                PictureUrl = "/images/backgrounds/types/pizza_bg.webp",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "The Margerita",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 10,
                        PictureUrl = "/images/products/pizza.webp",
                        Ingredients = ingredients,
                        Inventory = 100,
                    },
                    new()
                    {
                        Name = "The Vegan",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 12,
                        PictureUrl = "/images/products/pizza.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Océanea",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 15,
                        PictureUrl = "/images/products/pizza.webp",
                        Inventory = 100,
                        Ingredients = ingredients,
                    },

                    new()
                    {
                        Name = "The Farmer",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 17,
                        PictureUrl = "/images/products/pizza.webp",
                        Inventory = 100,
                        Ingredients = ingredients,
                    },

                    new()
                    {
                        Name = "El Fumata",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 20,
                        PictureUrl = "/images/products/pizza.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },

                    new()
                    {
                        Name = "La Fromagère",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 20.50m,
                        PictureUrl = "/images/products/pizza.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "La Roquette",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 22,
                        PictureUrl = "/images/products/pizza.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "The Original",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 25,
                        PictureUrl = "/images/products/pizza.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "La Gambas",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 30,
                        PictureUrl = "/images/products/pizza.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },

                    new()
                    {
                        Name = "The Norwegian",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 39.99m,
                        PictureUrl = "/images/products/pizza.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                }
            };

            var wraps = new ProductType
            {
                Name = "Wraps",
                PictureUrl = "/images/backgrounds/types/wrap_bg.webp",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Chicken Wrap",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 10,
                        PictureUrl = "/images/products/wrap.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Hot Wrap",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 11,
                        PictureUrl = "/images/products/wrap.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Diety Wrap",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 12.99m,
                        PictureUrl = "/images/products/wrap.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Ourika Wrap",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 13.5m,
                        PictureUrl = "/images/products/wrap.webp",
                        Ingredients = ingredients,
                        Inventory = 100
                    },
                }
            };

            var dessert = new ProductType
            {
                Name = "Dessert",
                PictureUrl = "/images/backgrounds/types/dessert_bg.webp",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Mousse au Chocolat",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 10,
                        PictureUrl = "/images/products/dessert.webp",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Tiramisu",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 10,
                        PictureUrl = "/images/products/dessert.webp",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Salade de Fruits",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 13,
                        PictureUrl = "/images/products/dessert.webp",
                        Inventory = 100
                    }
                }
            };

            var drinks = new ProductType
            {
                Name = "Drinks",
                PictureUrl = "/images/backgrounds/types/boissons_bg.webp",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Soda Can",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 3,
                        PictureUrl = "/images/products/dessert.webp",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Soda Bottle",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 5,
                        PictureUrl = "/images/products/dessert.webp",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Mineral Water",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 2,
                        PictureUrl = "/images/products/dessert.webp",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Juice",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 12,
                        PictureUrl = "/images/products/dessert.webp",
                        Inventory = 100
                    },
                }
            };
            
              var supplements = new ProductType
            {
                Name = "Sauces & Supplements",
                PictureUrl = "/images/backgrounds/types/supplements_bg.webp",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Camambert",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 3,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Gruyere",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 3,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Fromage Rouge",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 3,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Cheddar",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 3,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Black Bread",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 2,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "French Fries",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 4,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "OH-MG Sauce",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 0,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Samurai Sauce",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 0,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "BBQ Sauce",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 0,
                        PictureUrl = "/images/products/fromage.webp",
                        Inventory = 100
                    },
                   
                }
            };


            context.ProductTypes.AddRange(sandwich, wraps, drinks, dessert, pizza, supplements);

            await context.SaveChangesAsync();
        }

        if (!context.Announces.Any())
        {
            var announces = new List<Announce>
            {
                new()
                {
                    Title = "Burger & Big Burger",
                    PictureUrl = "/images/announces/announce1.webp",
                    Description =
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quasi eaque itaque modi neque eum perspiciatis sed non autem mollitia."
                },

                new()
                {
                    Title = "Sauces & Supplements",
                    PictureUrl = "/images/announces/announce2.webp",
                    Description =
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quasi eaque itaque modi neque eum perspiciatis sed non autem mollitia."
                },

                new()
                {
                    Title = "The Best Wraps",
                    PictureUrl = "/images/announces/announce3.webp",
                    Description =
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quasi eaque itaque modi neque eum perspiciatis sed non autem mollitia."
                },

                new()
                {
                    Title = "Hot Delivery",
                    PictureUrl = "/images/announces/announce4.webp",
                    Description =
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quasi eaque itaque modi neque eum perspiciatis sed non autem mollitia."
                }
            };
            
            context.Announces.AddRange(announces);
            await context.SaveChangesAsync();
        }
    }
}