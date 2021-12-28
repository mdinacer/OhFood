using System.Text;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Hubs;
using API.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
// ADD Custom SWAGGER configuration
builder.Services.AddSwaggerConfig();

builder.Services.AddDbContextConfig(builder.Configuration);

builder.Services.AddCors();

builder.Services.AddIdentityCore<User>(opt =>
    {
        opt.User.RequireUniqueEmail = true;
        opt.Password.RequireNonAlphanumeric = false;
    })
    .AddRoles<Role>()
    .AddEntityFrameworkStores<StoreContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
        };
    });
builder.Services.AddAuthorization();
builder.Services.AddCustomServices();
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});


// Create and migrate database
await DbMigrator.Migrate(builder);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseResponseCompression();

app.UseRouting();

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseCors(opt =>
{
    opt.WithOrigins("http://localhost:3000","http://127.0.0.1:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
});



app.UseAuthentication();

app.UseAuthorization();



app.MapControllers();


app.MapFallbackToController("Index", "Fallback");

//app.MapHub<MainHub>("/hubs/main");

app.Run();