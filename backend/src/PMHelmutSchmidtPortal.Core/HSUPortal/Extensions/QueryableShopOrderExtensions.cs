using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Extensions;

public static class QueryableShopOrderExtensions
{
    public static IOrderedQueryable<ShopOrder> OrderSortBy(this IQueryable<ShopOrder> query, string sorting)
    {
        string[] sortParts = sorting.Split(' ');
        string propertyName = sortParts.Length > 0 ? sortParts[0] : "orderNumber";
        string sortDirection = sortParts.Length > 1 ? sortParts[1] : "ASC";

        return propertyName switch
        {
            "orderNumber" or "orderDate" => query.OrderBy(sorting),
            "productName" => query.OrderByDirection(order => order.ProductVariant.Product.Name, sortDirection),
            "productNumber" => query.OrderByDirection(order => order.ProductVariant.Product.ProductNumber, sortDirection),
            _ => throw new UserFriendlyException("Can't sort", "Wrong sorting parameters")
        };
    }

    public static IQueryable<ShopOrder> IncludePlansWithActions(this IQueryable<ShopOrder> query)
    {
        return query
            .Include(order => order.OrderProductionPlans)
            .ThenInclude(orp => orp.OrderProductionPlanActions)
            .ThenInclude(orpa => orpa.PlanAction);
    }
    
    public static IQueryable<ShopOrder> FilterByProducer(this IQueryable<ShopOrder> query, long producerId)
    {
        return query
            .Where(order => order.OrderProductionPlans
                .Any(orp => orp.OrderProductionPlanActions
                    .Any(orpa => orpa.PlanAction.ProducerId == producerId)));
    }
}