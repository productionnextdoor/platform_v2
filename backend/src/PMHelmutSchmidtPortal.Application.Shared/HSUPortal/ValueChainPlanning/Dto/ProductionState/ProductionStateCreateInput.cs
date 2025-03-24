using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState
{
    public class ProductionStateCreateInput : StateLockStatusInput
    {
        [StringLength(200)]
        public string Description { get; set; }
    }
}