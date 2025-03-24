using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;

namespace PMHelmutSchmidtPortal.HSUPortal.Extensions;

public static class QueryableProductRepositoryExtension
{
    public static IIncludableQueryable<Product, ICollection<ProductMeasurement>> IncludeProductMeasurements(this IQueryable<Product> query)
    {
        return query.Include(p => p.ProductMeasurements);
    }

    public static IQueryable<Product> IncludeWorkPiecesWithConnections(this IQueryable<Product> query)
    {
        return query.Include(p => p.WorkPieces).ThenInclude(wp => wp.SurfaceFinish)
            .Include(p => p.WorkPieces).ThenInclude(wp => wp.WorkPieceVariants)
            .Include(p => p.WorkPieces).ThenInclude(wp => wp.MaterialGroup)
            .Include(p => p.WorkPieces).ThenInclude(wp => wp.ProductionStates);
    }

    public static IIncludableQueryable<Product, ICollection<ProductFile>> IncludeProductFiles(this IQueryable<Product> query)
    {
        return query.Include(p => p.ProductFiles);
    }

    public static IIncludableQueryable<Product, ICollection<ProductProducer>> IncludeProducers(this IQueryable<Product> query)
    {
        return query
            .IncludeNonArchivedProductionDetails()
            .ThenInclude(pd => pd.AssignedProducers);
    }

    public static IIncludableQueryable<Product, User> IncludeDeveloper(this IQueryable<Product> query)
    {
        return query.Include(p => p.AssignedDeveloper);
    }

    public static IIncludableQueryable<Product, ICollection<ProductionState>> IncludeProductionStates(this IQueryable<Product> query)
    {
        return query
            .IncludeNonArchivedProductionDetails()
            .ThenInclude(p => p.ProductionStates);
    }

    public static IIncludableQueryable<Product, ICollection<ProductionStepWorkPieceVariantCost>> IncludeProductionSteps(this IQueryable<Product> query)
    {
        return query
            .IncludeNonArchivedProductionDetails()
            .ThenInclude(p => p.ProductionSteps)
            .ThenInclude(ps => ps.ProducerInfo)
            .IncludeNonArchivedProductionDetails()
            .ThenInclude(p => p.ProductionSteps)
            .ThenInclude(ps => ps.StartState)
            .IncludeNonArchivedProductionDetails()
            .ThenInclude(p => p.ProductionSteps)
            .ThenInclude(ps => ps.EndState)
            .IncludeNonArchivedProductionDetails()
            .ThenInclude(p => p.ProductionSteps)
            .ThenInclude(ps => ps.StepMeasurementVariants)
            .ThenInclude(ps => ps.ProductMeasurement)
            .IncludeNonArchivedProductionDetails()
            .ThenInclude(p => p.ProductionSteps)
            .ThenInclude(ps => ps.StepMeasurementVariants)
            .ThenInclude(smv => smv.StepWorkPieceVariantCosts);
    }

    public static IIncludableQueryable<Product, IEnumerable<ProductionDetails>> IncludeNonArchivedProductionDetails(this IQueryable<Product> query)
    {
        return query
            .Include(p => p.ProductionDetails
                .Where(pd => pd.ProductionDetailsType != ProductionDetailsType.Archived));
    }

    public static IQueryable<Product> GetForCurrentDeveloper(this IQueryable<Product> query, long developerId)
    {
        return query.Where(
            item => item.AssignedDeveloper.Id == developerId && item.State != ProductState.Draft);
    }

    public static IQueryable<Product> GetForCurrentProducer(this IQueryable<Product> query, long producerId)
    {
        return query
            .Where(item =>
                item.State != ProductState.Draft &&
                item.State != ProductState.InProcessDeveloper &&
                item.State != ProductState.ReadyForValueChainPlanning &&
                item.ProductionDetails.Any(details =>
                    (details.ProductionDetailsType == ProductionDetailsType.Live ||
                     details.ProductionDetailsType == ProductionDetailsType.Edit) &&
                    details.AssignedProducers.Any(producer => producer.AssignedProducerId == producerId)));
    }
}