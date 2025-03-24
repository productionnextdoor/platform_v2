using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IProductMeasurementRepository: IRepository<ProductMeasurement, int>
{
     ProductMeasurement GetDefaultProductMeasurement(int productId);
     IQueryable<ProductMeasurement> GetAllProductMeasurement(int productId);
     IQueryable<ProductMeasurement> GetProductMeasurementVariantsOnly(int productId);
}