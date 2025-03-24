using System.Collections.Generic;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductVariants;

public interface IProductVariantRepository: IRepository<ProductVariant, int>
{
    public IIncludableQueryable<ProductVariant, ICollection<ProductOption>> GetProductVariantsWithOptions(int productId, int productMeasurementId, int productionDetailsId);
    IIncludableQueryable<ProductVariant, WorkPieceVariant> GetAllProductVariantsWithAssoc(int liveProductionDetailsId);
    void DeleteProductVariants(List<int> productVariantIdsList);
}