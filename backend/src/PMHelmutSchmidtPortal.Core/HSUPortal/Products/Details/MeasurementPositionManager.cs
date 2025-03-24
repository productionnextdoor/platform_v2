using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductMeasurementStep;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class MeasurementPositionManager : HSUDomainBaseService, IMeasurementPositionManager
{
    private readonly IProductMeasurementRepository _measurementRepository;

    public MeasurementPositionManager(IProductMeasurementRepository measurementRepository)
    {
        _measurementRepository = measurementRepository;
    }

    public async Task<IEnumerable<ProductMeasurement>> GetProductMeasurements(int productId)
    {
        return await _measurementRepository
            .GetAllProductMeasurement(productId)
            .OrderBy(pm => pm.Position)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProductMeasurement>> SaveProductMeasurementPositions(ProductMeasurementStepInput input)
    {
        List<ProductMeasurement> productMeasurements = await _measurementRepository.GetAllProductMeasurement(input.ProductId).ToListAsync();

        foreach (PositionsDto position in input.PositionDtos)
        {
            ProductMeasurement productMeasurement = productMeasurements.Find(pm => pm.Id == position.MeasurementId);
            if (productMeasurement == null)
            {
                continue;
            }

            productMeasurement.Position = position.Position;
        }

        await CurrentUnitOfWork.SaveChangesAsync();

        return productMeasurements
                .OrderBy(pm => pm.Position);
    }
}