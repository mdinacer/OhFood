using API.Data;
using API.DTO;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public ProductsController(StoreContext context, IMapper mapper)
        {
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
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .SingleOrDefaultAsync(p => p.Id == id);

            return product != null ? _mapper.Map<ProductDto>(product) : NotFound();
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
    }
}