using System;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState
{
    public class StateLockStatusDto
    {
        public bool IsUnlocked { get; set; }
        public bool CanDelete { get; set; }
        public DateTime StateLockTime { get; set; }
    }
}