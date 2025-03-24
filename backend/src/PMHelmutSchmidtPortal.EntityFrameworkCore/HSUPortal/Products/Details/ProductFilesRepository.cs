using System.Linq;
using Abp.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class ProductFilesRepository:PmHelmutSchmidtPortalRepositoryBase<ProductFile, int>, IProductFilesRepository
{
    public ProductFilesRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public IQueryable<ProductFile> GetProductFiles(int productId)
    {
        return GetAll()
            .Where(pf => pf.ProductId == productId);
    }
}