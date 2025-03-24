using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmProductMeasurement")]
public class ProductMeasurement: FullAuditedEntity
{
    public Product Product { get; set; }
    public int ProductId { get; set; }
    public float Height { get; set; }
    public float Width { get; set; }
    public float Depth { get; set; }
    public bool IsDefault { get; set; }
    public int Position { get; set; }

    public override string ToString()
    {
        return $"{Width}cm, {Height}cm, {Depth}cm";
    }
}