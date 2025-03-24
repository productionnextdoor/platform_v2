using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

public interface IProductionPlanRepository: IRepository<ProductionPlan>
{
    IIncludableQueryable<ProductionPlan,ICollection<ProductionPlanRating>> GetProductionPlansAllAssoc(int productId);

    IQueryable<ProductionPlan> GetProductionPlansWithActions(int productId);

    IQueryable<ProductionPlan> GetProductionPlansForVariant(ProductVariant productVariant);
    
    void RemovePlansByDetailsId(int productionDetailsId);
}