using PMHelmutSchmidtPortal.HSUPortal.Products;

namespace PMHelmutSchmidtPortal.Web.Models.FileUpload;

public class FileUploadModel
{
    public int ProductId { get; set; }
    public ProductFileCategory FileCategory { get; set; }
}