namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState
{
    public class StateLockStatusInput
    {
        public int ProductionDetailsId { get; set; }
        
        public int PreviousStateId { get; set; }
        
        public int NextStateId { get; set; }
    }
}