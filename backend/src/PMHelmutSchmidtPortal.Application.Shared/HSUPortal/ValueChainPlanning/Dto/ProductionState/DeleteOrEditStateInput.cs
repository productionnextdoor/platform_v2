using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState
{
    public class DeleteOrEditStateInput
    {
        [Required]
        public int ProductionDetailsId { get; set; }
        
        [Required]
        public int StateId { get; set; }
        
        [Required, StringLength(200)]
        public string Description { get; set; }
    }
}