using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;

public interface IProductionStepManager: IDomainService
{
    Task<ProductionStep> GetProductionStep(ProductionStepBaseDto input, long producerId);
    
    IQueryable<ProductionStep> GetProductionStep(int productionStepId);

    Task<ProductionStep> CreateOrUpdateProductionStep(ProductionStepCreateOrUpdateDto input,Product product, long producerId);

    IQueryable<ProductionStep> GetProductProductionSteps(ProductionStepListInputDto input);

    Task DeleteProductionStep(ProductionStep productionStep);

    Task RecalculateStepsData(User currentUser);
}