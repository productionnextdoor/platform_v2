using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class FullProducerProfileInput: FullProfileBase, IProducerAddress, IProducerInfo
    {
        [Required]
        public TradeTypeDto Trade { get; set; }
        public int NumberOfEmployees { get; set; }
        [Required]
        public decimal Rate { get; set; }
        public ICollection<ProducerRatingDto> ProducerRatings { get; set; }
        
    }
}