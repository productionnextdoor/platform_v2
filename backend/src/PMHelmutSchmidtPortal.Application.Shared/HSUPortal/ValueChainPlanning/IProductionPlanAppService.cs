using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning
{
    public interface IProductionPlanAppService: IApplicationService
    {
        Task<PlanListOutputDto> GetProductionPlans(PlanListInputDto input);
    }
}