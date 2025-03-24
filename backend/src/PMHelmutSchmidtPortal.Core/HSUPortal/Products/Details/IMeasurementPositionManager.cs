using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductMeasurementStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IMeasurementPositionManager: IDomainService
{
    Task<IEnumerable<ProductMeasurement>> GetProductMeasurements(int productId);

    Task<IEnumerable<ProductMeasurement>> SaveProductMeasurementPositions(ProductMeasurementStepInput input);
}