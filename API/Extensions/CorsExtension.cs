namespace API.Extensions;

public static class CorsExtension
{
    internal static IServiceCollection AddCorsPolicy(this IServiceCollection services)
    {
        return services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000", "http://127.0.0.1:3000");
            });
        });
    }
}