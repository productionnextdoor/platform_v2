using System.Linq;
using Abp.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductionDetailsRepository: PmHelmutSchmidtPortalRepositoryBase<ProductionDetails, int>, IProductionDetailsRepository
{
    public ProductionDetailsRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public new IQueryable<ProductionDetails> Get(int productionDetailsId)
    {
        return GetAll()
            .Where(details => details.Id == productionDetailsId);
    }

    public IQueryable<ProductionDetails> GetByProduct(int productId)
    {
        return GetAll()
            .Where(details => details.ProductId == productId);
    }
}