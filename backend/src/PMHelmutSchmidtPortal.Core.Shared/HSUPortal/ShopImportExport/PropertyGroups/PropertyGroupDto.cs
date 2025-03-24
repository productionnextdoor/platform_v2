using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.PropertyGroups;

public class PropertyGroupDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string DisplayType { get; set; }
    public string SortingType { get; set; }
    public bool Filterable { get; set; }
    public bool VisibleOnProductDetailPage { get; set; }
    public int Position { get; set; }
    public List<PropertyGroupOptionDto> Options { get; set; }
}