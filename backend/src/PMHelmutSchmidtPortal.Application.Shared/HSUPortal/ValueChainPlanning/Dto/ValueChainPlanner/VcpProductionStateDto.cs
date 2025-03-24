using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner
{
    public class VcpProductionStateDto
    {
        public int Id { get; set; }
        
        [StringLength(200)]
        public string Name { get; set; }
        
        public bool IsStartState { get; set; }
        
        public bool IsFinalState { get; set; }
    }
}