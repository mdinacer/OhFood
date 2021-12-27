using API.Services;

namespace API.Extensions
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {
            services.AddScoped<TokenService>();
            services.AddScoped<ImageService>();
            //services.AddScoped<PaymentService>();
            services.AddSignalR(e => {
                e.MaximumReceiveMessageSize = 102400000;
            });
            return services;
        }
    }
}