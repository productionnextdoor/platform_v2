using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public interface IOrderImportManager: IDomainService
{
    Task<List<ShopOrder>> GetNewOrdersFromShop();

    Task SetOrdersAsExported(IEnumerable<string> orderShopIds);
}