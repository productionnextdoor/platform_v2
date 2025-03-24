using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep
{
    public class WorkPieceVariantDto
    {
        public int? WorkPieceVariantId { get; set; }
        
        [Required]
        public int WorkPieceId { get; set; }
        
        [Required, StringLength(200)]                
        public string Description { get; set; }
    }
}