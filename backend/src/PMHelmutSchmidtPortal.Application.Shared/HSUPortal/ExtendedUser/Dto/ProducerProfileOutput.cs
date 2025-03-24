using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProducerProfileOutput : ProducerProfile
    {
        public bool IsActive { get; set; }
        public TradeTypeDto Trade { get; set; }
        public List<ProducerRatingDto> ProducerRatings { get; set; }
    }
}