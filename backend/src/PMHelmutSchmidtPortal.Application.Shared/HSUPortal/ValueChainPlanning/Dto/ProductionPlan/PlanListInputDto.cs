using System.ComponentModel.DataAnnotations;
using Abp.Extensions;
using Abp.Runtime.Validation;
using PMHelmutSchmidtPortal.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionPlan
{
    public class PlanListInputDto: PagedAndSortedInputDto, IShouldNormalize
    {
        [Required]
        public int ProductionDetailsId { get; set; }
        
        public int SortRateTypeId { get; set; }
        
        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "planValue ASC";
            }
        }
    }
}