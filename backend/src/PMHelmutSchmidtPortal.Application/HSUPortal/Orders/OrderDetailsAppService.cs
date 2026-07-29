using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Orders;

public class OrderDetailsAppService : HsuBaseAppService, IOrderDetailsAppService
{
    private readonly IOrderDetailsManager _orderDetailsManager;
    private readonly IOrderProductionActionManager _orderProductionActionManager;
    private readonly IOrderProductionManager _orderProductionManager;
    private readonly IOrderRepository _orderRepository;
    private readonly ILogger<OrderDetailsAppService> _logger;


    public OrderDetailsAppService(
        IOrderDetailsManager orderDetailsManager,
        IOrderProductionActionManager orderProductionActionManager,
        IOrderProductionManager orderProductionManager,
        IOrderRepository orderRepository,
        ILogger<OrderDetailsAppService> logger)
    {
        _orderDetailsManager = orderDetailsManager;
        _orderProductionActionManager = orderProductionActionManager;
        _orderProductionManager = orderProductionManager;
        _orderRepository = orderRepository;
        _logger = logger;
    }

    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_OrderDetails_Admin)]
    public async Task<AdminOrderDetailsOutput> GetOrderDetailsForAdmin(int orderId)
    {
        ShopOrder order = await _orderRepository
            .GetAll()
            .Include(order => order.ProductVariant.Product)
            .SingleAsync(order => order.Id == orderId);

        return new AdminOrderDetailsOutput
        {
            OrderId = order.Id,
            OrderStatus = order.Status,
            ProductName = order.ProductVariant.Product.Name,
            ValueChains = await _orderDetailsManager.GetOrderValueChains(order.Id),
            CustomerInfo = ObjectMapper.Map<CustomerInfoDto>(await _orderDetailsManager.GetOrderCustomerInfo(order.Id)),
            OrderedProduct = await _orderDetailsManager.GetOrderProductInfoAdmin(order.Id),
        };
    }

    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_OrderDetails_Producer)]
    public async Task<List<OrderProducerRequestOutput>> GetOrderProducerRequests(int orderId)
    {
        User producer = await GetCurrentUserAsync();
        return await _orderProductionActionManager.GetProducerActionRequests(orderId, producer.Id);
    }

    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_OrderDetails_Producer)]
    public async Task<OrderValueChainProducerDto> GetOrderCommissionedValueChainProducer(int orderId)
    {
        User producer = await GetCurrentUserAsync();
        ShopOrder order = await ValidateOrderForProducer(orderId,producer.Id);

        return await _orderDetailsManager.GetOrderCommissionedValueChain(order.Id);
    }

    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_OrderDetails_Producer)]
    public async Task<OrderDetailsBaseOutput> GetProducerOrderDetails(int orderId)
    {
        User producer = await GetCurrentUserAsync();
        ShopOrder order = await ValidateOrderForProducer(orderId,producer.Id);
        
        return new OrderDetailsBaseOutput()
        {
            OrderId = order.Id,
            CustomerInfo = ObjectMapper.Map<CustomerInfoDto>(await _orderDetailsManager.GetOrderCustomerInfo(order.Id)),
            OrderedProduct = await _orderDetailsManager.GetOrderProductInfoProducer(order.Id,producer.Id)
        };
    }


    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_OrderDetails_Producer)]
    public async Task AcceptOrRejectActionRequest(AcceptOrRejectActionInputDto input)
    {
        User producer = await GetCurrentUserAsync();
        try
        {
            await _orderProductionManager.AcceptOrRejectProductionAction(input, producer.Id);
            await CurrentUnitOfWork.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while accepting or rejecting action request");
            throw new UserFriendlyException("Action does not exist");
        }
    }

    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_OrderDetails_Admin)]
    public async Task ReRequestProducer(ActionReRequestDto input)
    {
        await _orderProductionManager.ReRequestProducer(input);
    }

    [AbpAuthorize(AppPermissions.Hsu_OrderManagement_OrderDetails_Producer)]
    public async Task StartFinishValueChainAction(int valueChainActionId, bool start)
    {
        User currentProducer = await GetCurrentUserAsync();
        
        Task task = start
            ? _orderProductionManager.StartProductionAction(valueChainActionId, currentProducer.Id)
            : _orderProductionManager.FinishProductionAction(valueChainActionId, currentProducer.Id);
    
        await task;
    }

    private async Task<ShopOrder> ValidateOrderForProducer(int orderId, long producerId)
    {
        try
        {
            ShopOrder order = await _orderRepository
                .GetAll()
                .Include(order => order.ProductVariant.Product)
                .SingleAsync(order => order.Id == orderId && order.OrderProductionPlans
                    .Any(plan => (plan.ProductionStatus == ProductionStatus.Commissioned ||
                                  plan.ProductionStatus == ProductionStatus.InProgress ||
                                  plan.ProductionStatus == ProductionStatus.Completed)
                                 && plan.OrderProductionPlanActions.Any(action => action.PlanAction.ProducerId == producerId)
                    ));
            return order;
        }
        catch (Exception e)
        {
            throw new UserFriendlyException("Order is not commissioned for producer");
        }
    }
}
