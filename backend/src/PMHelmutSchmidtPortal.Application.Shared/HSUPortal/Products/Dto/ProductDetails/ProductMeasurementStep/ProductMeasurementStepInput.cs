using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductMeasurementStep
{
    public class ProductMeasurementStepInput
    {
        [Required]
        public int ProductId { get; set; }
        
        public List<PositionsDto> PositionDtos { get; set; }
    }
}