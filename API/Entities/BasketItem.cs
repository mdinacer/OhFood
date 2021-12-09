using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }

        public BasketItem()
        {

        }

        public BasketItem(int id, int quantity, int productId, Product product, int basketId, Basket basket)
        {
            Id = id;
            Quantity = quantity;
            ProductId = productId;
            Product = product;
            BasketId = basketId;
            Basket = basket;
        }
    }
}