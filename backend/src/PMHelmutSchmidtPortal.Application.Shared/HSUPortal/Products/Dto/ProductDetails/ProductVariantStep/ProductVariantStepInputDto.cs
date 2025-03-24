using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep
{
    public class ProductVariantStepInputDto
    {
        [Required]
        public int ProductId { get; set; }
        
        public List<MeasurementDto> Measurements { get; set; }
        
        public List<WorkPieceVariantDto> WorkPieceVariants { get; set; }
    }
}