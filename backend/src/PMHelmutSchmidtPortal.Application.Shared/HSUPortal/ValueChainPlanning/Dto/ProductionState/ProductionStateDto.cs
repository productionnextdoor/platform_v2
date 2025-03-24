using PMHelmutSchmidtPortal.HSUPortal.Products;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState
{
    public class ProductionStateDto
    {
        public int StateId { get; set; }
        public string Description { get; set; }
        public int NextStateId { get; set; }
        public ProductionStateType StateType { get; set; }
        public int ProductionDetailsId { get; set; }
    }
}