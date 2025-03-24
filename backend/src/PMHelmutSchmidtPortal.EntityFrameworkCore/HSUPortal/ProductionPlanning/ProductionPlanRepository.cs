using System.Collections.Generic;
using System.Linq;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionPlanning;

public class ProductionPlanRepository : PmHelmutSchmidtPortalRepositoryBase<ProductionPlan, int>, IProductionPlanRepository
{
    public ProductionPlanRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public IIncludableQueryable<ProductionPlan, ICollection<ProductionPlanRating>> GetProductionPlansAllAssoc(int productionDetailsId)
    {
        return GetProductionPlansWithActions(productionDetailsId)
            .IncludeRatings();
    }

    public IQueryable<ProductionPlan> GetProductionPlansWithActions(int productionDetailsId)
    {
        return GetAll()
            .ByProductionDetailsId(productionDetailsId)
            .IncludePlanActions();
    }

    public IQueryable<ProductionPlan> GetProductionPlansForVariant(ProductVariant productVariant)
    {
        List<int> variantIds = productVariant.ProductOptions
            .Where(po => po.WorkPieceVariantId != null)
            .Select(po => po.WorkPieceVariantId ?? 0)
            .ToList();
        
        IQueryable<ProductionPlan> query = GetProductionPlansWithActions(productVariant.ProductionDetailsId);

        if (variantIds.Count == 0)
        {
            return query;
        }

        return query
            .Where(pp =>
                pp.PlanActions.All(pa =>
                    pa.ProductionStep.StepMeasurementVariants.Any(smv =>
                        smv.ProductMeasurementId == productVariant.ProductMeasurementId &&
                        !smv.StepWorkPieceVariantCosts
                            .Any(swpvc => variantIds.Contains(swpvc.VariantId ?? 0) && swpvc.CanProduce == false)
                    )
                )
            );
    }
    
    public void RemovePlansByDetailsId(int productionDetailsId)
    {
        List<ProductionPlan> productionPlans = GetAll()
            .Where(pp => pp.ProductionDetailsId == productionDetailsId)
            .Include(pp => pp.PlanRatings)
            .Include(pm => pm.PlanActions)
            .ThenInclude(pa => pa.PreconditionsStates)
            .ToList();

        foreach (ProductionPlan productionPlan in productionPlans)
        {
            foreach (ProductionPlanAction planAction in productionPlan.PlanActions)
            {
                GetDbContext().RemoveRange(planAction.PreconditionsStates);
            }

            GetDbContext().RemoveRange(productionPlan.PlanActions);
            GetDbContext().RemoveRange(productionPlan.PlanRatings);
        }

        GetDbContext().RemoveRange(productionPlans);
    }
}