using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner
{
    public class VcpProducerDto
    {
        public long Id { get; set; }
        
        [StringLength(200)]
        public string Name { get; set; }
        
        public string Trade { get; set; }
        
        public Dictionary<string,decimal> ValueChainParameters { get; set; }
    }
}