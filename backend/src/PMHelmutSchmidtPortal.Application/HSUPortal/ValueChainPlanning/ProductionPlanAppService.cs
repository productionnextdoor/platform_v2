using System.Threading.Tasks;
using Abp.Authorization;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

public class ProductionPlanAppService: HsuBaseAppService, IProductionPlanAppService
{
    private readonly IProductionPlanManager _productionPlanManager;

    public ProductionPlanAppService(IProductionPlanManager productionPlanManager)
    {
        _productionPlanManager = productionPlanManager;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_Get)]
    public async Task<PlanListOutputDto> GetProductionPlans(PlanListInputDto input)
    {
        return await _productionPlanManager.GetPagedProductionPlans(input);
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_Active_Set)]
    public async Task SetActive(ProductionPlanActiveDto input)
    {
        await _productionPlanManager.SetActive(input.ProductionPlanId, input.IsActive);
    }
}