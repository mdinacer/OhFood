using API.Entities.OrderAggregate;

namespace API.DTO;

public class OrderDto
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public ShippingAddress ShippingAddress { get; set; }
    public DateTime OrderDate { get; set; }
    public List<OrderItemDto> Items { get; set; }
    public decimal Subtotal { get; set; }
    public decimal DeliveryFee { get; set; }
    public string Status { get; set; }
    public decimal Total { get; set; }
}

public class OrderTotals
{
    public int Count { get; set; }
    public decimal Total { get; set; }
}

public class AdminOrderTotals
{
    public int Count { get; set; }
    public decimal Total { get; set; }

    public int ConfirmedCount { get; set; }
    public decimal ConfirmedTotal { get; set; }

    public int CancelledCount { get; set; }
    public decimal CancelledTotal { get; set; }

    public int PendingCount { get; set; }
    public decimal PendingTotal { get; set; }
}