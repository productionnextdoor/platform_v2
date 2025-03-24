using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProducerProfileForEditOutput
    {
        public FullProducerProfileOutput ProducerProfile { get; set; }
        public List<TradeTypeDto> TradeTypes { get; set; }
    }
}