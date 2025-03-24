using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using PMHelmutSchmidtPortal.Authorization.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

[Table("PmProducerInfo")]
public class ProducerInfo : FullAuditedEntity
{
    public long UserId { get; set; }
    public User User { get; set; }
    public int TradeTypeId { get; set; }
    public TradeType TradeType { get; set; }
    public int NumberOfEmployees { get; set; }
    // TODO: rename to HourlyWage
    public decimal Rate { get; set; }
    public ICollection<ProducerRating> ProducerRatings { get; set; }
}