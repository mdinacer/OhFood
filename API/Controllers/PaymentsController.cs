using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _context;
        private readonly IConfiguration _config;
        public PaymentsController(PaymentService paymentService, StoreContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            var buyerId = User.Identity!.Name;

            var basket = await _context.Baskets
                .RetriveBasketWithItems(buyerId!)
                .FirstOrDefaultAsync();

            if (basket == null) return NotFound();

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating intent" });

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            _context.Update(basket);

            var success = await _context.SaveChangesAsync() > 0;

            if (!success) return BadRequest(new ProblemDetails { Title = "Problem updating basket with payment intent" });

            return basket.ToBasketDto()!;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _config["StripeSettings:WhSecret"]);
            var charge = (Charge)stripeEvent.Data.Object;

            var order = await _context.Orders.SingleOrDefaultAsync(o => o.PaymentIntentId == charge.PaymentIntentId);

            if (order != null && charge.Status == "succeeded")
            {
                order.Status = OrderStatus.PaymentReceived;
                await _context.SaveChangesAsync();
            }

            return new EmptyResult();
        }
    }
}