using System.Linq;
using Abp.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class ProductMeasurementRepository : PmHelmutSchmidtPortalRepositoryBase<ProductMeasurement, int>, IProductMeasurementRepository
{
    public ProductMeasurementRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public ProductMeasurement GetDefaultProductMeasurement(int productId)
    {
        return GetAll()
            .FirstOrDefault(pm => pm.ProductId == productId && pm.IsDefault) ?? new ProductMeasurement
        {
            IsDefault = true,
            ProductId = productId,
            Position = 1
        };
    }

    public IQueryable<ProductMeasurement> GetAllProductMeasurement(int productId)
    {
        return GetAll().Where(pm => pm.ProductId == productId);
    }

    public IQueryable<ProductMeasurement> GetProductMeasurementVariantsOnly(int productId)
    {
        return GetAll().Where(pm => pm.ProductId == productId && !pm.IsDefault);
    }
}