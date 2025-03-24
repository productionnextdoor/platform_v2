using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

[Table("PmTradeType")]
public class TradeType : FullAuditedEntity
{
    public string Name { get; set; }

    public ICollection<ProducerInfo> Users { get; set; }
}