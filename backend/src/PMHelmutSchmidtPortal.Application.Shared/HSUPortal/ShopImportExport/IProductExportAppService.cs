using System.Threading.Tasks;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport
{
    public interface IProductExportAppService
    {
        Task ExportProductToShop(int productId);
    }
}