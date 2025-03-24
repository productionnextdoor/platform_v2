using System.Collections.Generic;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto
{
    public class ProductGraphDataDto
    {
        public int ProductId { get; set; }
        public List<ProductionStateDto> ProductStates { get; set; }
        public List<ProductionStepDto> ProductSteps { get; set; }
    }
}