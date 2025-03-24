using System.Threading.Tasks;
using Abp.Authorization;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Users;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

public class ProductionPlanAppService : HsuBaseAppService, IProductionPlanAppService
{
    private readonly IProductionPlanManager _productionPlanManager;
    private readonly UserManagerExtended _userManager;

    public ProductionPlanAppService(IProductionPlanManager productionPlanManager, UserManagerExtended userManager)
    {
        _productionPlanManager = productionPlanManager;
        _userManager = userManager;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_Get)]
    public async Task<PlanListOutputDto> GetProductionPlans(PlanListInputDto input)
    {
        User currentUser = await GetCurrentUserAsync();
        return await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.Developer)
            ? await _productionPlanManager.GetActivePagedProductionPlans(input)
            : await _productionPlanManager.GetAllPagedProductionPlans(input);
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_ProductionPlans_Active_Set)]
    public async Task SetActive(ProductionPlanActiveDto input)
    {
        await _productionPlanManager.SetActive(input.ProductionPlanId, input.IsActive);
    }
}