using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.Extensions;

public static class QueryableProductionStepExtensions
{
    public static IIncludableQueryable<ProductionStep, ICollection<ProductionStepWorkPieceVariantCost>> IncludeMeasurementsAndCosts(this IQueryable<ProductionStep> query)
    {
        return query
            .Include(ps => ps.StepMeasurementVariants)
            .ThenInclude(mv => mv.StepWorkPieceVariantCosts);
    }
    
    public static IIncludableQueryable<ProductionStep, ProductionState> IncludeStates(this IQueryable<ProductionStep> query)
    {
        return query
            .Include(ps => ps.StartState)
            .Include(ps => ps.EndState);
    }
    
    public static IIncludableQueryable<ProductionStep, UserAddress> IncludeProducerInfo(this IQueryable<ProductionStep> query)
    {
        return query
            .Include(ps => ps.ProducerInfo.TradeType)
            .Include(ps => ps.ProducerInfo.User.UserAddress);
    }
     

    public static IOrderedQueryable<ProductionStep> OrderBy(this IQueryable<ProductionStep> query, string sorting)
    {
        string[] sortParts = sorting.Split(' ');
        string propertyName = sortParts.Length > 0 ? sortParts[0] : "id";
        string sortDirection = sortParts.Length > 1 ? sortParts[1] : "ASC";

        return propertyName switch
        {
            "startState" => query.OrderByDirection(ps => ps.StartState.Description, sortDirection),
            "endState" => query.OrderByDirection(ps => ps.EndState.Description, sortDirection),
            "name" => query.OrderByDirection(ps => ps.ProducerInfo.User.UserAddress.Name, sortDirection),
            _ => query.OrderByDirection(ps => ps.Id)
        };
    }
}