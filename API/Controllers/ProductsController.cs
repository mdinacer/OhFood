using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly ImageService _imageService;

        public ProductsController(StoreContext context, IMapper mapper, ImageService imageService)
        {
            _imageService = imageService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ProductDto>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                .Where(p => p.Price > 0)
                .Filter(productParams.Category)
                .Search(productParams.SearchTerm)
                .Sort(productParams.OrderBy)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            var products =
                await PagedList<ProductDto>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            // Using HttpExtensions
            Response.AddPaginationHeader(products.MetaData);

            return products;
        }


        [HttpGet("{id:int}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.SingleOrDefaultAsync(p => p.Id == id);

            return product != null ? product : NotFound();
        }

        [HttpGet("categories")]
        public async Task<ActionResult<CategoryDto>> GetCategories()
        {
            var categories = await _context.Categories
                .OrderBy(t => t.Name)
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("categoriesFull")]
        public async Task<ActionResult<CategoryDto>> GetCategoriesWithProducts()
        {
            var categories = await _context.Categories
                .Include(pt => pt.Products)
                .OrderBy(t => t.Name)
                .ProjectTo<CategoryFullDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return Ok(categories);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost]
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

        [Authorize(Roles = "Admin")]
        [HttpPut]
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

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            if (!string.IsNullOrEmpty(product.PublicId))
                await _imageService.DeleteImageAsync(product.PublicId);

            _context.Products.Remove(product);

            var success = await _context.SaveChangesAsync() > 0;

            return success
                ? Ok()
                : BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }
    }
}