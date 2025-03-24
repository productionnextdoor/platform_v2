using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

[Table("PmProducerRating")]
public class ProducerRating : FullAuditedEntity
{
    public ProducerInfo ProducerInfo { get; set; }
    public RatingType RatingType { get; set; }
    public int Rating { get; set; }
}