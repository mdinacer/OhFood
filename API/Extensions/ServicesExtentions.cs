using API.Services;

namespace API.Extensions
{
    public static class ServicesExtentions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {
            services.AddScoped<TokenService>();
            services.AddScoped<PaymentService>();
            services.AddScoped<ImageService>();
            return services;
        }
    }
}