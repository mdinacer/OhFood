//namespace API.Services;

// public class PaymentService
// {
//     private readonly IConfiguration _config;
//
//     public PaymentService(IConfiguration config)
//     {
//         _config = config;
//     }
//
//     public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
//     {
//         StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
//
//         var service = new PaymentIntentService();
//
//         var intent = new PaymentIntent();
//
//         var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
//         var deliveryFee = subtotal > 10000 ? 0 : 500;
//
//         if (string.IsNullOrEmpty(basket.PaymentIntentId))
//         {
//             var options = new PaymentIntentCreateOptions
//             {
//                 Amount = decimal.ToInt64((subtotal + deliveryFee) * 100),
//                 Currency = "usd",
//                 PaymentMethodTypes = new List<string> { "card" }
//             };
//             intent = await service.CreateAsync(options);
//         }
//         else
//         {
//             var options = new PaymentIntentUpdateOptions
//             {
//                 Amount = decimal.ToInt64((subtotal + deliveryFee) * 100),
//             };
//             await service.UpdateAsync(basket.PaymentIntentId, options);
//         }
//
//         return intent;
//     }
// }