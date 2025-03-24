using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductMeasurementStep
{
    public class ProductMeasurementStepOutput
    {
        [Required]
        public int ProductId { get; set; }
        public List<MeasurementDto> MeasurementDtos { get; set; }
    }
}