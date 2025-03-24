using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning
{
    public interface IValueChainPlannerAppService : IApplicationService
    {
        Task SendProductToProductionPlanning(ProductPlanInputDto input);

        Task SetProductionPlansForProduct(VcpPlannerResponseInputDto responseInput);
    }
}