using System.Text;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Hubs;
using API.Middleware;
using API.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
// ADD Custom SWAGGER configuration
builder.Services.AddSwaggerConfig();

builder.Services.AddDbContextConfig(builder.Configuration);

builder.Services.AddCustomServices();

builder.Services.AddCorsPolicy();

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

        opt.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                // If the request is for our hub...
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    (path.StartsWithSegments("/hubs/main")))
                {
                    // Read the token out of the query string
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddResponseCompression(options => { options.EnableForHttps = true; });

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));


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

app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = false,
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=2592000");
        ctx.Context.Response.Headers[HeaderNames.Expires] =
            new[] { DateTime.UtcNow.AddDays(30).ToString("R") }; // Format RFC1123
    }
});

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToController("Index", "Fallback");
app.MapHub<MainHub>("/hubs/main");

app.Run();