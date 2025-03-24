using System.ComponentModel.DataAnnotations;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep
{
    public class WorkPieceWithMaterialDto : WorkPieceDto
    {
        [StringLength(200)]
        public string MaterialGroupName { get; set; }
    }
}