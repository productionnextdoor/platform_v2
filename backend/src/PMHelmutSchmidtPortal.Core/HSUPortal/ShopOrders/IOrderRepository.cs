using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public interface IOrderRepository: IRepository<ShopOrder, int>
{
    IQueryable<ShopOrder> GetOrder(int orderId);
    IQueryable<ShopOrder> GetAllSearched(string inputFilter);
    IQueryable<ShopOrder> GetOrderWithAssoc(int orderId);
    IIncludableQueryable<ProductOption, WorkPieceVariant> GetProductOptionsByOrderId(int orderId);
    IQueryable<ShopOrder> GetOrdersByProductIds(IEnumerable<int> productIds);
    void RemoveOrdersByProductVariant(int productVariant);
}