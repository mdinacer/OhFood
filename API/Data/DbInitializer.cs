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
            var sandwich = new ProductType
            {
                Name = "Burger",
                PictureUrl = "/images/backgrounds/types/burger_bg.jpg",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Le Basic",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 200,
                        PictureUrl = "/images/products/sandwich.png",


                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Le Classic",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 250,
                        PictureUrl = "/images/products/sandwich.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Le Moderne",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 250,
                        PictureUrl = "/images/products/sandwich.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Le Detroit",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 300,
                        PictureUrl = "/images/products/sandwich.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Big Tasty Burger",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 600,
                        PictureUrl = "/images/products/sandwich.png",
                        Inventory = 100
                    },

                    new()
                    {
                        Name = "Big Bang Burger",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 600,
                        PictureUrl = "/images/products/sandwich.png",
                        Inventory = 100
                    },
                }
            };

            var pizza = new ProductType
            {
                Name = "Pizza",
                PictureUrl = "/images/backgrounds/types/pizza_bg.jpg",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "La Margerita",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 400,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100,
                    },
                    new()
                    {
                        Name = "La Vegan",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 500,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "L'Océane",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 600,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },

                    new()
                    {
                        Name = "La Fermière",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 700,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },

                    new()
                    {
                        Name = "La Fumata",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 700,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },

                    new()
                    {
                        Name = "La Fromagère",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 700,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "La Roquette",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 800,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "L'Originale",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 850,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "La Gambas",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 900,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },

                    new()
                    {
                        Name = "La Norvegienne",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 800,
                        PictureUrl = "/images/products/pizza.png",
                        Inventory = 100
                    },
                }
            };

            var wraps = new ProductType
            {
                Name = "Wraps",
                PictureUrl = "/images/backgrounds/types/wrap_bg.jpg",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Chicken Wrap",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 350,
                        PictureUrl = "/images/products/wrap.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Hot Wrap",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 400,
                        PictureUrl = "/images/products/wrap.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Diety Wrap",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 400,
                        PictureUrl = "/images/products/wrap.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Ourika Wrap",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 400,
                        PictureUrl = "/images/products/wrap.png",
                        Inventory = 100
                    },
                }
            };

            var dessert = new ProductType
            {
                Name = "Dessert",
                PictureUrl = "/images/backgrounds/types/dessert_bg.jpg",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Mousse au Chocolat",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 200,
                        PictureUrl = "/images/products/dessert.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Tiramisu",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 200,
                        PictureUrl = "/images/products/dessert.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Salade de Fruits",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 300,
                        PictureUrl = "/images/products/dessert.png",
                        Inventory = 100
                    }
                }
            };

            var drinks = new ProductType
            {
                Name = "Boissons",
                PictureUrl = "/images/backgrounds/types/boissons_bg.jpg",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Canette",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 100,
                        PictureUrl = "/images/products/dessert.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Soda PM",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 60,
                        PictureUrl = "/images/products/dessert.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Eau Minérale",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 50,
                        PictureUrl = "/images/products/dessert.png",
                        Inventory = 100
                    },
                    new()
                    {
                        Name = "Jus PM",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 60,
                        PictureUrl = "/images/products/dessert.png",
                        Inventory = 100
                    },
                }
            };
            
              var supplements = new ProductType
            {
                Name = "Sauces & Suppléments",
                PictureUrl = "/images/backgrounds/types/supplements_bg.jpg",
                Products = new List<Product>
                {
                    new()
                    {
                        Name = "Camambert",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 100,
                        PictureUrl = "/images/products/fromage.png",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Gruyere",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 100,
                        PictureUrl = "/images/products/fromage.png",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Fromage Rouge",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 100,
                        PictureUrl = "/images/products/fromage.png",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Cheddar",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 100,
                        PictureUrl = "/images/products/fromage.png",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Pain Noir",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 50,
                        PictureUrl = "/images/products/fromage.png",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Frittes",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 100,
                        PictureUrl = "/images/products/fromage.png",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Sauce OH-MG",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 0,
                        PictureUrl = "/images/products/fromage.png",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Sauce Samurai",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 0,
                        PictureUrl = "/images/products/fromage.png",
                        Inventory = 100
                    },
                    
                    new()
                    {
                        Name = "Sauce BBQ",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                        Price = 0,
                        PictureUrl = "/images/products/fromage.png",
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
                    Title = "Burger et Big Burger",
                    PictureUrl = "/images/announces/announce1.jpg",
                    Description =
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quasi eaque itaque modi neque eum perspiciatis sed non autem mollitia."
                },

                new()
                {
                    Title = "Sauces & Supplément",
                    PictureUrl = "/images/announces/announce2.jpg",
                    Description =
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quasi eaque itaque modi neque eum perspiciatis sed non autem mollitia."
                },

                new()
                {
                    Title = "Les Wraps",
                    PictureUrl = "/images/announces/announce3.jpg",
                    Description =
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quasi eaque itaque modi neque eum perspiciatis sed non autem mollitia."
                },

                new()
                {
                    Title = "Livraison à domicile",
                    PictureUrl = "/images/announces/announce4.jpg",
                    Description =
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quasi eaque itaque modi neque eum perspiciatis sed non autem mollitia."
                }
            };
            
            context.Announces.AddRange(announces);
            await context.SaveChangesAsync();
        }
    }
}