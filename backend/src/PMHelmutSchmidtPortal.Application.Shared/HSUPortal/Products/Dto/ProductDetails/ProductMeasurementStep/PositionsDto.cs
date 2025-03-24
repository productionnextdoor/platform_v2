using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductMeasurementStep
{
    public class PositionsDto
    {
        [Required]
        public int MeasurementId { get; set; }
        
        [Required]
        public int Position { get; set; } 
    }
}