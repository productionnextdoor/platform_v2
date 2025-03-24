using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Products
{
    public class ProductForExportDto
    {
        public string Name { get; set; }
        public string ProductNumber { get; set; }
        public string Description { get; set; }
        public int Stock { get; set; }
        public string TaxId { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double Length { get; set; }
        
        public bool Active { get; set; }
        public List<PriceDto> Price { get; set; }
        public List<ConfiguratorSettings> ConfiguratorSettings { get; set; }
        public List<ChildDto> Children { get; set; }
        public List<MediaDto> Media { get; set; }
        public CoverDto Cover { get; set; }
        public List<CategoryDto> Categories { get; set; }
        public List<VisibilityDto> Visibilities { get; set; }
    }
}