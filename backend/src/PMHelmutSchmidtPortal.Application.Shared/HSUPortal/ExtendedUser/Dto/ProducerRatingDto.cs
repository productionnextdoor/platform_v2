using System.ComponentModel.DataAnnotations;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto
{
    public class ProducerRatingDto
    {
        public int RatingId { get; set; }
        
        [StringLength(200)]
        public string RatingType { get; set; }
        
        public float Rating { get; set; }
    }
}