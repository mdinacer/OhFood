namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        //public string? ClientSecret { get; set; }
        //public string? PaymentIntentId { get; set; }

        public void AddItem(Product product, int quantity)
        {
            var item = Items.SingleOrDefault(i => i.ProductId == product.Id);

            if (item != null)
            {
                item.Quantity += quantity;
            }
            else
            {
                item = new()
                {
                    ProductId = product.Id,
                    Quantity = quantity
                };
                Items.Add(item);
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.SingleOrDefault(i => i.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity <= 0)
                Items.Remove(item);
        }

        public Basket()
        {
        }

        public Basket(string buyerId)
        {
            BuyerId = buyerId;
        }
    }
}