using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep
{
    public class WorkPieceDto
    {
        public int? WorkPieceId { get; set; }
        
        [Required, StringLength(200)]
        public string Name { get; set; }
        
        [Required, StringLength(200)]
        public string FinishedState { get; set; }
        
        [Required]
        public List<int> SpecificationIds { get; set; }
        
        [Required]
        public int MaterialGroupId { get; set; }
        
    }
}