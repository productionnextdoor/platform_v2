using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep
{
    public class ProductVariantStepOutputDto
    {
        public int ProductId { get; set; }
        
        public List<WorkPieceWithMaterialDto> WorkPieces { get; set; }
        
        public List<MeasurementDto> Measurements { get; set; }
        
        public List<WorkPieceVariantDto> WorkPieceVariants { get; set; }
    }
}