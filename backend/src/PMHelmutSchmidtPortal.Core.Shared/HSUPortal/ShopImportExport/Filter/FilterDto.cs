namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Filter;

public class FilterDto<T>
{
    public string Type { get; set; }
    public string Field { get; set; }
    public T Value { get; set; }
}