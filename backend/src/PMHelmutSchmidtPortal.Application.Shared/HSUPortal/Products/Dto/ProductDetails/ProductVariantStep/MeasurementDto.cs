using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep
{
    public class MeasurementDto
    {
        public int? MeasurementId { get; set; }
        
        [Required]
        public float Height { get; set; }
        
        [Required]
        public float Width { get; set; }
        
        [Required]
        public float Depth { get; set; }
        
        public int? Position { get; set; }
        
        public bool IsDefault { get; set; }
    }
}