using System;
using System.Collections.Specialized;
using System.Threading.Tasks;
using System.Web;
using Abp.Authorization;
using Abp.BackgroundJobs;
using Abp.Runtime.Security;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Jobs;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

public class ValueChainPlannerAppService : HsuBaseAppService, IValueChainPlannerAppService
{
    private readonly IProductionPlanManager _productionPlanManager;
    private readonly IBackgroundJobManager _backgroundJobManager;

    public ValueChainPlannerAppService(
        IProductionPlanManager productionPlanManager,
        IBackgroundJobManager backgroundJobManager
    )
    {
        _productionPlanManager = productionPlanManager;
        _backgroundJobManager = backgroundJobManager;
    }

    [AbpAuthorize(AppPermissions.Hsu_ValueChainPlanning_Send_Product_To_Planning)]
    public async Task SendProductToProductionPlanning(ProductPlanInputDto input)
    {
        await _backgroundJobManager.EnqueueAsync<SendProductToPlannerJob, VcpRequestContentDto>(
            await _productionPlanManager.ProductToProductionPlanning(input.ProductionDetailsId, input.MaxCost));
    }

    public async Task SetProductionPlansForProduct(VcpPlannerResponseInputDto responseInput)
    {
        string parameters = SimpleStringCipher.Instance.Decrypt(HttpUtility.UrlDecode(responseInput.Id));

        NameValueCollection query = HttpUtility.ParseQueryString(parameters);
        int productionDetailsId = Convert.ToInt32(query["productionDetailsId"]);
        
        await _productionPlanManager.SaveProductProductionPlan(productionDetailsId, query["validationCode"] ?? "",responseInput.Data);
    }
}