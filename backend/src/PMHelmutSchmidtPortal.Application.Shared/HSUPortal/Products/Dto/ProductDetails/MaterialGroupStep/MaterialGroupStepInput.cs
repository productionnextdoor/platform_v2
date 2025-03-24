using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep
{
    public class MaterialGroupStepInput
    {
        [Required]
        public int ProductId { get; set; }
        public List<WorkPieceDto> WorkPieceDtos { get; set; }
        
        
    }
}