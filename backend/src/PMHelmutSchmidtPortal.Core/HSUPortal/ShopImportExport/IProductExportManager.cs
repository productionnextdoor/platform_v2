using System.Threading.Tasks;
using Abp.Domain.Services;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public interface IProductExportManager: IDomainService
{
    Task ExportProductToShop(int productId);

    Task UpdateProductInShop(int productId);
}