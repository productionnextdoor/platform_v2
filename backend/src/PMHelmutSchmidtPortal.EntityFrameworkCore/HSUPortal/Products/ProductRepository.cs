using System.Collections.Generic;
using Abp.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;
using System.Linq;
using System.Threading.Tasks;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUsers;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductRepository: PmHelmutSchmidtPortalRepositoryBase<Product, int>, IProductRepository
{
    public ProductRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }

    public IQueryable<Product> GetAllFiltered(string filter, ProductState? productState)
    {
        return GetAll()
            .WhereIf(!filter.IsNullOrWhiteSpace(),
                item =>
                    item.ProductNumber.ToString().Contains(filter) || item.Name.Contains(filter))
            .WhereIf(productState is not null,
                item =>
                    item.State == productState);
    }
    
    public IQueryable<Product> GetProduct(int id)
    {
        return GetAll().Where(p => p.Id == id);
    }

    public async Task<Product> GetProductForCreateOrUpdate(int? id)
    {
        if (id.HasValue && id != 0)
        {
            return await GetAsync(id.Value);
        }

        Product product = new()
        {
            ProductionDetails = new List<ProductionDetails>()
        };
        product.ProductionDetails.Add(new ProductionDetails()
        {
            ProductionDetailsType = ProductionDetailsType.Live
        });
        return product;
    }
    
    public IQueryable<DeveloperProductCount> GetProductsPerDevelopersCount(IReadOnlyCollection<User> developers)
    {
        return GetAll()
            .Where(p => developers.Contains(p.AssignedDeveloper))
            .GroupBy(p => p.AssignedDeveloper)
            .Select(p => new DeveloperProductCount { DeveloperId = p.Key.Id, ProductCount = p.Count() });
    }

    public IQueryable<Product> GetProductsForDeveloper(long developerId)
    {
        return GetAll()
            .Where(p => p.AssignedDeveloperId == developerId);
    }
 
    public Task<int> GetProducerProductCount(long producerId)
    {
        return GetAll()
            .IncludeProducers()
            .Where(p => p.ProductionDetails.Any(pd => pd.AssignedProducers.Any(ap => ap.AssignedProducerId == producerId)))
            .CountAsync();
    }
   
}