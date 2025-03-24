using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.MaterialGroupStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview
{
    public class WorkPieceOverview: WorkPieceDto
    {
        public MaterialGroupBaseDto MaterialGroup { get; set; }
        
        public SurfaceDto SurfaceFinish { get; set; }
    }
}