using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

[Table("PmRatingType")]
public class RatingType : FullAuditedEntity
{
    [StringLength(200)]
    public string Name { get; set; }
    
    public ICollection<ProducerRating> ProducerRatings { get; set; }
}