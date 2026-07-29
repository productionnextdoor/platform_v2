using System.Threading.Tasks;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

public interface IProductionPlanManager
{
    Task<PlanListOutputDto> GetPagedProductionPlans(PlanListInputDto input);
    
    Task<VcpRequestContentDto> ProductToProductionPlanning(int productId, int maxCost);

    Task SaveProductProductionPlan(int productId, string validationCode, VcpInputDataDto data);

    Task SetActive(int productionPlanId, bool isActive);
}