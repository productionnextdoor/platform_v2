using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto
{
    public class ProducersAcceptOrRejectInput
    {
        [Required]
        public int ProductionDetailsId { get; set; }

        [Required]
        public bool AssignmentAccepted { get; set; }
        
        
    }
}