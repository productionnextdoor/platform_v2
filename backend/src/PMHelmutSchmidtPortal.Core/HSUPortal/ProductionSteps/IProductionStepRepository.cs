using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

public interface IProductionStepRepository: IRepository<ProductionStep, int>
{
    IQueryable<ProductionStep> GetAllByProductionDetailsId(int productId);
    void RemoveStepsByProductionDetailsId(int id);
}