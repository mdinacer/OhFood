using API.Data;
using API.DTO;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Helpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize(Roles = "Admin")]
public class AdminController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;

    public AdminController(StoreContext context, IMapper mapper, ImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet("orders")]
    public async Task<ActionResult<PagedList<OrderDto>>> GetOrders([FromQuery] OrderParams orderParams)
    {
        var query = _context.Orders
            .Filter(orderParams.status)
            .Search(orderParams.SearchTerm)
            .OrderByDescending(p => p.OrderDate)
            .ThenBy(p => p.Status)
            .ToOrderDto();

        var orders =
            await PagedList<OrderDto>.ToPagedList(query, orderParams.PageNumber, orderParams.PageSize);

        Response.AddPaginationHeader(orders.MetaData);
        return orders;
    }

    [HttpPut("orders")]
    public async Task<ActionResult<Product>> UpdateOrderStatus(UpdateOrderDto updateOrderDto)
    {
        var order = await _context.Orders.FindAsync(updateOrderDto.Id);

        if (order == null) return NotFound();

        _mapper.Map(updateOrderDto, order);


        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(order)
            : BadRequest(new ProblemDetails { Title = "Problem updating order status" });
    }

    [HttpGet("orders/totals")]
    public async Task<ActionResult<AdminOrderTotals>> GetTotals()
    {
        var orders = await _context.Orders.ToListAsync();

        var ordersTotals = GetTotalsByStatus(orders);

        var pendingOrders = GetTotalsByStatus(orders, OrderStatus.Pending);
        var confirmedOrders = GetTotalsByStatus(orders, OrderStatus.Confirmed);
        var cancelledOrders = GetTotalsByStatus(orders, OrderStatus.Cancelled);

        var orderTotal = new AdminOrderTotals
        {
            Count = ordersTotals.Count,
            Total = ordersTotals.Total,

            PendingCount = pendingOrders.Count,
            PendingTotal = pendingOrders.Total,

            ConfirmedCount = confirmedOrders.Count,
            ConfirmedTotal = confirmedOrders.Total,

            CancelledCount = cancelledOrders.Count,
            CancelledTotal = cancelledOrders.Total,
        };

        return Ok(orderTotal);
    }


    [HttpPost("products")]
    public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto createProductDto)
    {
        var product = _mapper.Map<Product>(createProductDto);

        if (createProductDto.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(createProductDto.File);

            if (imageResult.Error != null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            product.PictureUrl = imageResult.SecureUrl.ToString();
            product.PublicId = imageResult.PublicId;
        }

        _context.Products.Add(product);

        var success = await _context.SaveChangesAsync() > 0;

        if (!success) return BadRequest(new ProblemDetails { Title = "Problem creating product" });

        return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
    }

    [HttpPut("products")]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto updateProductDto)
    {
        var product = await _context.Products.FindAsync(updateProductDto.Id);

        if (product == null) return NotFound();

        _mapper.Map(updateProductDto, product);

        if (updateProductDto.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(updateProductDto.File);

            if (imageResult.Error != null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            if (!string.IsNullOrEmpty(product.PublicId))
                await _imageService.DeleteImageAsync(product.PublicId);

            product.PictureUrl = imageResult.SecureUrl.ToString();
            product.PublicId = imageResult.PublicId;
        }

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(product)
            : BadRequest(new ProblemDetails { Title = "Problem updating product" });
    }


    [HttpDelete("products/{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null) return NotFound();

        _context.Orders.Remove(order);

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok()
            : BadRequest(new ProblemDetails { Title = "Problem deleting product" });
    }


    [HttpPost("announces")]
    public async Task<ActionResult<AnnounceDto>> CreateAnnounce([FromForm] CreateAnnounceDto createAnnounceDto)
    {
        var announce = _mapper.Map<Announce>(createAnnounceDto);

        var transform = new ImageTransform
        {
            Width = 1024,
            Height = 768,
            Crop = CropMode.fit
        };
        var imageResult = await _imageService.AddImageAsync(createAnnounceDto.File, "announces", transform);


        if (imageResult.Error != null)
            return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

        announce.PictureUrl = imageResult.SecureUrl.ToString();
        announce.PublicId = imageResult.PublicId;

        _context.Announces.Add(announce);

        var success = await _context.SaveChangesAsync() > 0;

        if (!success) return BadRequest(new ProblemDetails { Title = "Problem creating announce" });

        return CreatedAtRoute("GetAnnounce", new { id = announce.Id }, announce);
    }

    [HttpPut("announces")]
    public async Task<ActionResult<AnnounceDto>> UpdateAnnounce([FromForm] UpdateAnnounceDto updateAnnounce)
    {
        var announce = await _context.Announces.FindAsync(updateAnnounce.Id);

        if (announce == null) return NotFound();

        _mapper.Map(updateAnnounce, announce);

        var imageResult = await _imageService.AddImageAsync(updateAnnounce.File);

        if (imageResult.Error != null)
            return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

        if (!string.IsNullOrEmpty(announce.PublicId))
            await _imageService.DeleteImageAsync(announce.PublicId);

        announce.PictureUrl = imageResult.SecureUrl.ToString();
        announce.PublicId = imageResult.PublicId;

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(_mapper.Map<AnnounceDto>(announce))
            : BadRequest(new ProblemDetails { Title = "Problem updating announce" });
    }


    [HttpDelete("announces/{id:int}")]
    public async Task<ActionResult> DeleteAnnounce(int id)
    {
        var announce = await _context.Announces.FindAsync(id);

        if (announce == null) return NotFound();

        if (!string.IsNullOrEmpty(announce.PublicId))
            await _imageService.DeleteImageAsync(announce.PublicId);

        _context.Announces.Remove(announce);

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok()
            : BadRequest(new ProblemDetails { Title = "Problem deleting announce" });
    }


    private static OrderTotals GetTotalsByStatus(IReadOnlyCollection<Order> orders, OrderStatus? status = null)
    {
        return new OrderTotals
        {
            Count = orders.Count(o => status == null || o.Status == status),
            Total = orders.Where(o => status == null || o.Status == status)
                .Sum(o => o.GetTotal()),
        };
    }
}