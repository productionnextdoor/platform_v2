using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.Extensions;

public static class QueryableProductionDetailsRepositoryExtension
{
    public static IQueryable<ProductionDetails> FilterByStatus(this IQueryable<ProductionDetails> query, ProductionDetailsType status)
    {
        return query.Where(details => details.ProductionDetailsType == status);
    }
    public static IIncludableQueryable<ProductionDetails, ICollection<ProductionState>> IncludeProductionStates(this IQueryable<ProductionDetails> query)
    {
        return query.Include(p => p.ProductionStates);
    }

    public static IIncludableQueryable<ProductionDetails, ICollection<ProductionStepWorkPieceVariantCost>> IncludeProductionSteps(this IQueryable<ProductionDetails> query)
    {
        return query
            .Include(p => p.ProductionSteps)
            .ThenInclude(ps => ps.ProducerInfo)
            .Include(p => p.ProductionSteps)
            .ThenInclude(ps => ps.StartState)
            .Include(p => p.ProductionSteps)
            .ThenInclude(ps => ps.EndState)
            .Include(p => p.ProductionSteps)
            .ThenInclude(ps => ps.StepMeasurementVariants)
            .ThenInclude(ps => ps.ProductMeasurement)
            .Include(p => p.ProductionSteps)
            .ThenInclude(ps => ps.StepMeasurementVariants)
            .ThenInclude(smv => smv.StepWorkPieceVariantCosts);
    }
}