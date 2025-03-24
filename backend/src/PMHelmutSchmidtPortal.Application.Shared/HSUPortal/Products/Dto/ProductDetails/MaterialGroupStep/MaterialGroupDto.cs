using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep
{
    public class MaterialGroupDto : MaterialGroupBaseDto
    {
        public List<SurfaceDto> Surfaces { get; set; }
    }
}