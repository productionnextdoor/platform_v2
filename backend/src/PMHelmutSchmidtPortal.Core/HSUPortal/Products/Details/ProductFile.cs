using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

[Table("PmProductFile")]
public class ProductFile: FullAuditedEntity
{
    [StringLength(255)] // max filename length on linux for most filesystems is 255
    public string FileName { get; set; }
    
    [StringLength(4096)] // max filepaths length on linux for most filesystems is 4096
    public string FilePath { get; set; }
    public ProductFileCategory FileCategory { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
}