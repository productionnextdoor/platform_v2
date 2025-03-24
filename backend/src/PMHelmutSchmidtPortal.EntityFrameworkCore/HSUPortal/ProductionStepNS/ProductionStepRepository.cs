using System.Collections.Generic;
using System.Linq;
using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionStepNS;

public class ProductionStepRepository: PmHelmutSchmidtPortalRepositoryBase<ProductionStep, int>, IProductionStepRepository
{
    public ProductionStepRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider)
        : base(dbContextProvider)
    {
    }
    
    public IQueryable<ProductionStep> GetAllByProductionDetailsId(int productionDetailsId)
    {
        return GetAll()
            .Where(productionStep => productionStep.ProductionDetailsId == productionDetailsId );
    }

    public void RemoveStepsByProductionDetailsId(int productionDetailsId)
    {
        List<ProductionStep> steps = GetAll()
            .Where(step => step.ProductionDetailsId == productionDetailsId)
            .Include(step => step.StepMeasurementVariants)
            .ThenInclude(smv => smv.StepWorkPieceVariantCosts)
            .ToList();
        List<ProductionStepMeasurementVariant> stepMeasurementVariants = steps
            .SelectMany(step => step.StepMeasurementVariants)
            .ToList();
        IEnumerable<ProductionStepWorkPieceVariantCost> stepWorkPieceVariantCosts = stepMeasurementVariants
            .SelectMany(smv => smv.StepWorkPieceVariantCosts)
            .AsEnumerable();
        GetDbContext().RemoveRange(stepWorkPieceVariantCosts);
        GetDbContext().RemoveRange(stepMeasurementVariants);
        GetDbContext().RemoveRange(steps);
    }
}