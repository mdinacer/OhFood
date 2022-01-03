using API.DTO;
using API.Entities;
using API.Entities.OrderAggregate;
using AutoMapper;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductLiteDto>();
            CreateMap<ProductType, ProductTypeFullDto>();
            CreateMap<Product, ProductDto>()
                .ForMember(p => p.Type, o => { o.MapFrom(p => p.Type.Name); });

            CreateMap<Reservation, ReservationDto>()
                .ForMember(r => r.Username, o => { o.MapFrom(r => r.User.UserName); })
                .ForMember(r => r.Status, o => { o.MapFrom(r => r.Status.ToString()); });

            CreateMap<UpdateReservationDto, Reservation>();

            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();


            CreateMap<UpdateOrderDto, Order>()
                .ForMember(p => p.Status, o => { o.MapFrom(p => Enum.Parse(typeof(OrderStatus), p.Status)); });

            CreateMap<ProductType, ProductTypeDto>();
            CreateMap<Ingredient, IngredientDto>();
            CreateMap<Announce, AnnounceDto>();
            CreateMap<CreateAnnounceDto, Announce>();
        }
    }
}