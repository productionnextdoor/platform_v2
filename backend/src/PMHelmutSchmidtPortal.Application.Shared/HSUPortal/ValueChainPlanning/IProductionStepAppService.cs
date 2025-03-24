using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning
{
    public interface IProductionStepAppService : IApplicationService
    {
        Task<IEnumerable<ProductionStepListDto>> GetProductionStepsList(ProductionStepListInputDto input);

        Task<ProductionStepOverviewDto> GetProductionsStepOverview(int productionStepId);
        
        Task<ProductionStepForEditOutput> GetProductionStepForEdit(ProductionStepBaseDto input);

        Task CreateOrUpdateProductionStep(ProductionStepCreateOrUpdateDto input);

        Task DeleteProductionStep(int stepId);
    }
}