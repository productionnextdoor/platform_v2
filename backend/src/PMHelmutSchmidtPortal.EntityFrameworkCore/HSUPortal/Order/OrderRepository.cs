using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.EntityFrameworkCore;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.Order;

public class OrderRepository: PmHelmutSchmidtPortalRepositoryBase<ShopOrder, int>, IOrderRepository
{
    private readonly IDbContextProvider<PMHelmutSchmidtPortalDbContext> _dbContextProvider;

    public OrderRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
        _dbContextProvider = dbContextProvider;
    }

    public IQueryable<ShopOrder> GetOrder(int orderId)
    {
        return GetAll()
            .Where(order => order.Id == orderId);
    }
    
    public async Task<int> GetNextPlatformOrderNumberAsync()
    {
        return (await DbHelper
            .GetDbCommand(await _dbContextProvider.GetDbContextAsync(), new StringBuilder("SELECT NEXT VALUE FOR OrderNumberSequence AS OrderNumber"), System.Array.Empty<SqlParameter>())
            .ReadCommandResult<int>((orderNumbers, reader) =>
            {
                orderNumbers.Add( reader.GetInt32(0));
            } )).First(); 

    }

    public IQueryable<ShopOrder> GetAllSearched(string inputFilter)
    {
        return GetAll()
            .Include(order => order.ProductVariant.Product)
            .WhereIf(!inputFilter.IsNullOrWhiteSpace(),
                order =>
                    order.OrderNumber.Contains(inputFilter) ||
                    order.ProductVariant.Product.ProductNumber.ToString().Contains(inputFilter) ||
                    order.ProductVariant.Product.Name.Contains(inputFilter));
    }

    public IQueryable<ShopOrder> GetOrderWithAssoc(int orderId)
    {
        return GetAll()
            .Where(order => order.Id == orderId)
            .Include(order => order.ProductVariant.Product)
            .Include(order => order.ProductVariant.ProductOptions)
            .IncludePlansWithActions();
    }
    
    public IIncludableQueryable<ProductOption, WorkPieceVariant> GetProductOptionsByOrderId(int orderId)
    {
        return GetAll()
            .Where(order => order.Id == orderId)
            .SelectMany(order => order.ProductVariant.ProductOptions)
            .Include(po => po.WorkPiece)
            .ThenInclude(w => w.ProductionStates)
            .Include(po => po.WorkPieceVariant);
    }
    
    public IQueryable<ShopOrder> GetOrdersByProductIds(IEnumerable<int> productIds)
    {
        return GetAll()
            .Include(order => order.ProductVariant)
            .Where(order => productIds.Contains(order.ProductVariant.ProductId));
    }
    
    public void RemoveOrdersByProductVariant(int productVariant)
    {
        List<ShopOrder> orderList = GetAll()
            .Where(order => order.ProductVariantId == productVariant)
            .Include(order => order.OrderProductionPlans)
            .ThenInclude(plans => plans.OrderProductionPlanActions)
            .Include(order => order.OrderDeliveryDocuments)
            .ToList();
        List<OrderDeliveryDocument> deliveryDocuments = orderList.SelectMany(order => order.OrderDeliveryDocuments).ToList();
        List<OrderProductionPlan> productionPlans = orderList.SelectMany(order => order.OrderProductionPlans).ToList();
        List<OrderProductionPlanAction> planActions = productionPlans.SelectMany(plan => plan.OrderProductionPlanActions).ToList();
        
        GetDbContext().RemoveRange(deliveryDocuments);
        GetDbContext().RemoveRange(planActions);
        GetDbContext().RemoveRange(productionPlans);
        GetDbContext().RemoveRange(orderList);
    }
}