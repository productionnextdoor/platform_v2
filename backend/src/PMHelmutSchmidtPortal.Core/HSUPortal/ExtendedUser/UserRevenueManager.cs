using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser;

public class UserRevenueManager: HSUDomainBaseService, IUserRevenueManager
{
    private readonly IProductRepository _productRepository;
    private readonly IOrderRepository _orderRepository;
    private readonly ITaxesAndRoyaltiesRepository _taxesAndRoyaltiesRepository;
    
    public UserRevenueManager(
        IProductRepository productRepository,
        IOrderRepository orderRepository,
        ITaxesAndRoyaltiesRepository taxesAndRoyaltiesRepository)
    {
        _productRepository = productRepository;
        _orderRepository = orderRepository;
        _taxesAndRoyaltiesRepository = taxesAndRoyaltiesRepository;
    }
    
    public async Task<DeveloperRevenueDto> GetDeveloperRevenueInfo(long userId, int productId)
    {
        await CheckDeveloperProduct(userId, productId);

        List<ShopOrder> productOrders = await _orderRepository
            .GetOrdersByProductIds(new []{ productId })
            .Where(order => order.Status == OrderStatus.Completed)
            .ToListAsync();

        TaxesAndRoyalties developerRoyaltyRate = await _taxesAndRoyaltiesRepository.GetDeveloperRoyaltyRate();

        decimal totalRevenue = productOrders
            .Select(order => order.ProductVariant.Price)
            .Sum();
        
        decimal minPrice = productOrders
            .Select(order => order.ProductVariant.Price)
            .DefaultIfEmpty()
            .Min();
        
        decimal maxPrice = productOrders
            .Select(order => order.ProductVariant.Price)
            .DefaultIfEmpty()
            .Max();

        return new DeveloperRevenueDto
        {
            NumberOfProductOrders = productOrders.Count,
            ProductPriceRange = $"{minPrice} - {maxPrice}",
            RoyaltyRate = developerRoyaltyRate.Percentage,
            TotalRevenue = totalRevenue * developerRoyaltyRate.Percentage
        };
    }
    
    private async Task CheckDeveloperProduct(long userId, int productId)
    {
        bool isDeveloperProduct = await _productRepository
            .GetProductsForDeveloper(userId)
            .AnyAsync(p => p.Id == productId);
        
        if (!isDeveloperProduct)
            throw new UserFriendlyException($"Product with ID {productId} is not a developer product");
    }
}