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

        var category = await _context.Categories.SingleOrDefaultAsync(c =>
            c.Name == createProductDto.Category);

        if (category != null)
        {
            product.CategoryId = category.Id;
        }
        else
        {
            product.CategoryId = 0;
            product.Category = new Category { Name = createProductDto.Category };
        }

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

        return CreatedAtRoute("GetProduct", new { id = product.Id }, _mapper.Map<ProductDto>(product));
    }

    [HttpPut("products")]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto updateProductDto)
    {
        var product = await _context.Products.FindAsync(updateProductDto.Id);

        if (product == null) return NotFound();

        var category = await _context.Categories.SingleOrDefaultAsync(c =>
            c.Name == updateProductDto.Category);

        if (category != null)
        {
            if (category.Id != product.CategoryId)
            {
                product.CategoryId = category.Id;
            }
        }
        else
        {
            product.CategoryId = 0;
            product.Category = new Category { Name = updateProductDto.Category };
        }


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
            ? Ok(_mapper.Map<ProductDto>(product))
            : BadRequest(new ProblemDetails { Title = "Problem updating product" });
    }


    [HttpDelete("products/{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null) return NotFound();

        if (!string.IsNullOrEmpty(product.PublicId))
            await _imageService.DeleteImageAsync(product.PublicId);

        _context.Products.Remove(product);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
    }


    [HttpPost("categories")]
    public async Task<ActionResult<CategoryDto>> CreateCategory([FromForm] CreateCategoryDto createCategory)
    {
        var elementExists = await _context.Categories.SingleOrDefaultAsync(c => c.Name == createCategory.Name) != null;

        if (elementExists) return BadRequest(new ProblemDetails { Title = "This category already exists" });

        var category = new Category { Name = createCategory.Name };

        var imageResult = await _imageService.AddImageAsync(createCategory.File);

        if (imageResult.Error != null)
            return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

        category.PictureUrl = imageResult.SecureUrl.ToString();
        category.PublicId = imageResult.PublicId;

        _context.Categories.Add(category);

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? _mapper.Map<CategoryDto>(category)
            : BadRequest(new ProblemDetails { Title = "Problem creating Category" });
    }

    [HttpPut("categories")]
    public async Task<ActionResult<CategoryDto>> UpdateCategory([FromForm] UpdateCategoryDto updateCategory)
    {
        var category = await _context.Categories.SingleOrDefaultAsync(c => c.Id == updateCategory.Id);

        if (category == null) return BadRequest(new ProblemDetails { Title = "This category already exists" });

        _mapper.Map(updateCategory, category);

        if (updateCategory.File != null)
        {
            var imageResult = await _imageService.AddImageAsync(updateCategory.File);

            if (imageResult.Error != null)
                return BadRequest(new ProblemDetails { Title = imageResult.Error.Message });

            if (!string.IsNullOrEmpty(category.PublicId))
                await _imageService.DeleteImageAsync(category.PublicId);

            category.PictureUrl = imageResult.SecureUrl.ToString();
            category.PublicId = imageResult.PublicId;
        }

        var success = await _context.SaveChangesAsync() > 0;

        return success
            ? Ok(_mapper.Map<CategoryDto>(category))
            : BadRequest(new ProblemDetails { Title = "Problem updating category" });
    }

    [HttpDelete("categories/{id:int}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.SingleOrDefaultAsync(c => c.Id == id);

        if (category == null) return NotFound(new ProblemDetails { Title = "This category could not be found" });


        if (!string.IsNullOrEmpty(category.PublicId))
            await _imageService.DeleteImageAsync(category.PublicId);

        _context.Categories.Remove(category);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "Problem deleting category" });
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