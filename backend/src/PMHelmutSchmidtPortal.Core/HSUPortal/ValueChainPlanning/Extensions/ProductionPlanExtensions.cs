using System.Linq;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Extensions;

public static class ProductionPlanExtensions
{
    public static string GetProducerList(this ProductionPlan plan)
    {
        return string.Join(", ", plan.PlanActions.Select(pa => pa.Producer.UserAddress.Name).Distinct());
    }
}