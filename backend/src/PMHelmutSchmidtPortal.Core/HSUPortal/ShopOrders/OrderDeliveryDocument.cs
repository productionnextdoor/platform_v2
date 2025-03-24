using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

[Table("PmOrderDeliveryDocument")]
public class OrderDeliveryDocument : FullAuditedEntity
{
    [StringLength(255)] // max filename length on linux for most filesystems is 255
    public string FileName { get; set; }

    [StringLength(4096)] // max filepaths length on linux for most filesystems is 4096
    public string FilePath { get; set; }

    public int ShopOrderId { get; set; }
    
    public ShopOrder ShopOrder { get; set; }
}
