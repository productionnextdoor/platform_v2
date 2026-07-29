using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.EntityFrameworkCore.Repositories;
using Abp.Linq.Extensions;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using NUglify.Helpers;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto;
using PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public class OrderManager : HSUDomainBaseService, IOrderManager
{
    private readonly IOrderImportManager _orderImportManager;
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderProductionManager _orderProductionManager;

    public OrderManager(
        IOrderImportManager orderImportManager,
        IOrderRepository orderRepository,
        IOrderProductionManager orderProductionManager
    )
    {
        _orderImportManager = orderImportManager;
        _orderRepository = orderRepository;
        _orderProductionManager = orderProductionManager;
    }

    public async Task<List<ShopOrder>> ImportOrdersFromShop()
    {
        List<ShopOrder> orders = await _orderImportManager.GetNewOrdersFromShop();

        if (orders.Count == 0) return orders;

        await _orderRepository.InsertRangeAsync(orders);
        await CurrentUnitOfWork.SaveChangesAsync();

        foreach (ShopOrder order in orders)
        {
            await _orderProductionManager.SelectValueChainForOrder(order.Id);
        }

        await _orderImportManager.SetOrdersAsExported(orders.Select(order => order.ShopUuid));

        return orders;
    }

    public async Task<PagedResultDto<OrderListAdminDto>> GetOrdersListAdmin(OrderInputAdminDto input, CancellationToken cancellationToken)
    {
        IQueryable<ShopOrder> query = _orderRepository
            .GetAllSearched(input.Filter)
            .WhereIf(input.Status is not null,
                order =>
                    order.Status == input.Status);

        int totalCount = await query.CountAsync(cancellationToken);

        List<ShopOrder> orders = await query
            .OrderSortBy(input.Sorting)
            .PageBy(input)
            .ToListAsync(cancellationToken);

        return new PagedResultDto<OrderListAdminDto>(totalCount, ObjectMapper.Map<List<OrderListAdminDto>>(orders));
    }

    public async Task<PagedResultDto<OrderListProducerDto>> GetOrdersListProducer(OrderInputDto input, long currentUserId, CancellationToken cancellationToken)
    {
        IQueryable<ShopOrder> query = _orderRepository
            .GetAllSearched(input.Filter)
            .IncludePlansWithActions()
            .FilterByProducer(currentUserId);

        int totalCount = await query.CountAsync(cancellationToken);

        List<ShopOrder> orders = await query
            .OrderSortBy(input.Sorting)
            .PageBy(input)
            .ToListAsync(cancellationToken);

        List<OrderListProducerDto> orderDtoList = ObjectMapper.Map<List<OrderListProducerDto>>(orders);

        foreach (OrderListProducerDto orderDto in orderDtoList)
        {
            orderDto.Status = GetActionStatus(orders.Single(order => order.Id == orderDto.OrderId), currentUserId);
        }

        return new PagedResultDto<OrderListProducerDto>(totalCount, orderDtoList);
    }

    public IQueryable<ShopOrder> GetOrderById(int orderId) => _orderRepository.GetAll().Where(order => order.Id == orderId);

    public Task<int> GetProductId(int orderId)
        => GetOrderById(orderId).Select(order => order.ProductVariant.ProductId).SingleAsync();

    public async Task<ActionStatus> GetProducerOrderStatus(int orderId, long currentUserId)
    {
        ShopOrder order = await _orderRepository
            .GetAll()
            .Where(order => order.Id == orderId)
            .IncludePlansWithActions()
            .FilterByProducer(currentUserId)
            .SingleAsync();

        return GetActionStatus(order, currentUserId);
    }

    public async Task CancelOrder(int orderId)
    {
        ShopOrder order = await _orderRepository
            .GetOrder(orderId)
            .IncludePlansWithActions()
            .SingleAsync();

        if (order.Status != OrderStatus.Open &&
            order.Status != OrderStatus.NotDone)
        {
            throw new UserFriendlyException("Only open or not done orders can be cancelled");
        }

        order.Status = OrderStatus.Cancelled;
        order.OrderProductionPlans.ForEach(plan =>
        {
            plan.ProductionStatus = ProductionStatus.Cancelled;
            plan.OrderProductionPlanActions.ForEach(action => action.ActionStatus = ActionStatus.Cancelled);
        });
    }

    private static ActionStatus GetActionStatus(ShopOrder order, long producerId)
    {
        if (order.Status == OrderStatus.Cancelled)
        {
            return ActionStatus.Cancelled;
        }

        if (order.Status == OrderStatus.NotDone)
        {
            return ActionStatus.NotCommissioned;
        }

        if (order.Status == OrderStatus.Open)
        {
            List<OrderProductionPlanAction> producersActions = order.OrderProductionPlans
                .SelectMany(plan => plan.OrderProductionPlanActions
                    .Where(action => action.PlanAction.ProducerId == producerId))
                .ToList();

            if (producersActions.Any(action => action.ActionStatus == ActionStatus.Accepted))
            {
                return ActionStatus.Accepted;
            }

            return producersActions.All(action => action.ActionStatus == ActionStatus.Rejected)
                ? ActionStatus.Rejected
                : ActionStatus.Open;
        }

        OrderProductionPlan commissionedPlan = order.OrderProductionPlans
            .SingleOrDefault(plan => (plan.ProductionStatus is ProductionStatus.Commissioned or ProductionStatus.InProgress ||
                                      plan.ProductionStatus == ProductionStatus.Completed) &&
                                     plan.OrderProductionPlanActions.Any(action => action.PlanAction.ProducerId == producerId)
            );

        if (commissionedPlan == null)
        {
            return ActionStatus.NotCommissioned;
        }

        return commissionedPlan.ProductionStatus switch
        {
            ProductionStatus.Commissioned => ActionStatus.Commissioned,
            ProductionStatus.InProgress => ActionStatus.InProgress,
            _ => ActionStatus.Completed
        };
    }
}