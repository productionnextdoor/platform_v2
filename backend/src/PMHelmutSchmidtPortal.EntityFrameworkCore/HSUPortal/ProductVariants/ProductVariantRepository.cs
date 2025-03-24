using System.Collections.Generic;
using System.Linq;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductVariants;

public class ProductVariantRepository : PmHelmutSchmidtPortalRepositoryBase<ProductVariant, int>, IProductVariantRepository
{
    public ProductVariantRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public IIncludableQueryable<ProductVariant, ICollection<ProductOption>> GetProductVariantsWithOptions(int productId, int productMeasurementId , int productionDetailsId)
    {
        return GetAll()
            .Where(pv => pv.ProductId == productId && pv.ProductMeasurementId == productMeasurementId && pv.ProductMeasurementId == productionDetailsId)
            .Include(pv => pv.ProductOptions);
    }

    public IIncludableQueryable<ProductVariant, WorkPieceVariant> GetAllProductVariantsWithAssoc(int productionDetailsId)
    {
        return GetAll()
            .Where(pv => pv.ProductionDetailsId == productionDetailsId)
            .Include(pv => pv.ProductMeasurement)
            .Include(pv => pv.ProductOptions)
            .ThenInclude(po => po.WorkPiece)
            .ThenInclude(wp => wp.ProductionStates)
            .Include(pv => pv.ProductOptions)
            .ThenInclude(po => po.WorkPieceVariant);
    }
    
    public void DeleteProductVariants(List<int> productVariantIdsList)
    {
        List<ProductVariant> productVariants = GetAll()
            .Where(pv => productVariantIdsList.Contains(pv.Id))
            .Include(pv => pv.ProductOptions)
            .Include(pv => pv.VariantActionCost)
            .ToList();
        
        GetDbContext().RemoveRange(productVariants.SelectMany(pv => pv.ProductOptions));
        GetDbContext().RemoveRange(productVariants.SelectMany(pv => pv.VariantActionCost));
        GetDbContext().RemoveRange(productVariants);
    }
}