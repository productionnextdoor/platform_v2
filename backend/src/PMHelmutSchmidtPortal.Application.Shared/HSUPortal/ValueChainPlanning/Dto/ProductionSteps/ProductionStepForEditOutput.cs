using System.Collections.Generic;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductDetailsOverview;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps
{
    public class ProductionStepForEditOutput
    {
        public List<MeasurementDto> Measurements { get; set; }
        public List<WorkPieceVariantDto> WorkPieceVariants { get; set; }
        public WorkPieceOverview WorkPiece { get; set; }
        public FullProductionStepDto ProductionStep { get; set; }
    }
}