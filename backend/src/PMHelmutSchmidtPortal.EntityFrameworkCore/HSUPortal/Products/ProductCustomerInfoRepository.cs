using System.Linq;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductCustomerInfoRepository: PmHelmutSchmidtPortalRepositoryBase<ProductCustomerInfo, int>, IProductCustomerInfoRepository
    
{
    public ProductCustomerInfoRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) 
        : base(dbContextProvider)
    {
    }

    public IQueryable<ProductCustomerInfo> GetByProductId(int id)
    {
        return GetAll()
            .Where(p => p.ProductId == id)
            .Include(pci => pci.CustomerInfo);
    }
}