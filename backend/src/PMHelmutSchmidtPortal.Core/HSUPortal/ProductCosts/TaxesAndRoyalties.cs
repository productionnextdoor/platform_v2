using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

[Table("PmTaxesAndRoyalties")]
public class TaxesAndRoyalties: FullAuditedEntity
{
    public bool IsActive { get; set; }
    public decimal Percentage { get; set; }
    public TaxType TaxType { get; set; }
    
}