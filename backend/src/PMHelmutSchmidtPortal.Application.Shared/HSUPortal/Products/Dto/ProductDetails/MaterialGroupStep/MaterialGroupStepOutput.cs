using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep
{
    public class MaterialGroupStepOutput
    {
        public int ProductId { get; set; }
        public List<MaterialGroupDto> MaterialGroupDtos { get; set; }
        public List<WorkPieceDto> WorkPieceDtos { get; set; }
        
        
    }
}