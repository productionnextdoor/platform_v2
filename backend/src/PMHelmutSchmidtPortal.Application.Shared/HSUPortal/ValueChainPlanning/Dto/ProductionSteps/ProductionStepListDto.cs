using System.ComponentModel.DataAnnotations;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class ProductionStepListDto
    {
        public int ProductionStepId { get; set; }
        
        [StringLength(200)]
        public string StartState { get; set; }
        
        [StringLength(200)]
        public string EndState { get; set; }
        
        public decimal DefaultCost { get; set; }
        
        [StringLength(200)]
        public string ProducerName { get; set; }
        
        public TradeTypeDto Trade { get; set; }
    }
}