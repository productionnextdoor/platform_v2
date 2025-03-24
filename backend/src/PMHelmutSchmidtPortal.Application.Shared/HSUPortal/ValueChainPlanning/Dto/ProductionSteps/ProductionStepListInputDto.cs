using Abp.Application.Services.Dto;
using Abp.Extensions;
using Abp.Runtime.Validation;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class ProductionStepListInputDto : ISortedResultRequest, IShouldNormalize
    {
        public int ProductionDetailsId { get; set; }
        public string Sorting { get; set; }
        
        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "ProductId ASC";
            }
        }
    }
}