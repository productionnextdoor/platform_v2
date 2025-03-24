using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

public interface IProductionStepMeasurementVariantRepository: IRepository<ProductionStepMeasurementVariant, int>
{
    IQueryable<ProductionStep> GetAllByStepId(int productionStepId);
}