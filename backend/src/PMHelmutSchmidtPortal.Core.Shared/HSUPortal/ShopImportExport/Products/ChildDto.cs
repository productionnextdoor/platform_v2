using System.Collections.Generic;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.PropertyGroups;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Products;

public class ChildDto
{
    public string ParentId { get; set; }
    public string ProductNumber { get; set; }
    public int Stock { get; set; }
    public List<PropertyGroupOptionDto> Options { get; set; }
    public List<PriceDto> Price { get; set; }
    public List<ProductPropertyDto> Properties { get; set; }
    
    public Dictionary<string,string> CustomFields { get; set; }
}