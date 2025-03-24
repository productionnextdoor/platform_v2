using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Extensions;

public static class QueryableProductionPlansExtensions
{
    
    public static IOrderedQueryable<ProductionPlan> OrderBy(this IQueryable<ProductionPlan> query, string sorting, int rateTypeId)
    {
        string[] sortParts = sorting.Split(' ');
        string propertyName = sortParts.Length > 0 ? sortParts[0] : "planValue";
        string sortDirection = sortParts.Length > 1 ? sortParts[1] : "ASC";

        return propertyName switch
        {
            "planValue" or "leadTime"=> query.OrderBy(sorting),
            "rate" => query.OrderByDirection(plan => plan.PlanRatings.FirstOrDefault(rating => rating.RatingTypeId == rateTypeId).Rating, sortDirection),
            _ => throw new UserFriendlyException("Can't sort", "Wrong sorting parameters")
        };
    }
    
    public static IQueryable<ProductionPlan> ByProductionDetailsId(this IQueryable<ProductionPlan> query, int productionDetailsId) =>
        query.Where(pp => pp.ProductionDetailsId == productionDetailsId);

    public static IIncludableQueryable<ProductionPlan, ICollection<ProductionPlanRating>> IncludeRatings(this IQueryable<ProductionPlan> query) => 
        query.Include(pp => pp.PlanRatings);

    public static  IQueryable<ProductionPlan> IncludePlanActions(this IQueryable<ProductionPlan> query) =>
        query
                .Include(pp => pp.PlanActions)
                .ThenInclude(pa => pa.Producer)
                .ThenInclude(pr => pr.UserAddress)
                .Include(pp => pp.PlanActions)
                .ThenInclude(pa => pa.PreconditionsStates);
}