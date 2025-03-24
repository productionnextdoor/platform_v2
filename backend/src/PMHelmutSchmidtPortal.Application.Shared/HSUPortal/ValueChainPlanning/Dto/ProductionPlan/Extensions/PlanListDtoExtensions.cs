using System;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan.Extensions
{
    public static class PlanListDtoExtensions
    {
        public static PlanListDto CalculateProjectedEndDate(this PlanListDto planList, DateTime? offerDeadline)
        {
            if (offerDeadline.HasValue)
            {
                planList.ProjectedEndDate = offerDeadline.Value.AddDays(decimal.ToDouble(planList.LeadTime * 7));
            }
            return planList;
        }
    }
}