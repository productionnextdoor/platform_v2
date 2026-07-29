using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public class OrderDetailsManager : HSUDomainBaseService, IOrderDetailsManager
{
    private readonly IOrderRepository _orderRepository;
    private readonly IRepository<OrderProductionPlan> _orderProductionPlanRepository;
    private readonly IRepository<CustomerInfo> _customerInfoRepository;
    private readonly IRepository<TaxesAndRoyalties> _taxesAndRoyaltiesRepository;

    public OrderDetailsManager(
        IOrderRepository orderRepository,
        IRepository<OrderProductionPlan> orderProductionPlanRepository,
        IRepository<CustomerInfo> customerInfoRepository,
        IRepository<TaxesAndRoyalties> taxesAndRoyaltiesRepository
    )
    {
        _orderRepository = orderRepository;
        _orderProductionPlanRepository = orderProductionPlanRepository;
        _customerInfoRepository = customerInfoRepository;
        _taxesAndRoyaltiesRepository = taxesAndRoyaltiesRepository;
    }

    public async Task<List<OrderValueChainAdminDto>> GetOrderValueChains(int orderId)
    {
        ICollection<ProductOption> orderVariants = await _orderRepository.GetProductOptionsByOrderId(orderId).ToListAsync();
        List<OrderValueChainAdminDto> valueChains = await GetOrderValueChainsDtos(orderId);

        foreach (OrderValueChainAdminDto valueChain in valueChains)
        {
            MapMaterialNames(valueChain.ValueChainActions, orderVariants);
        }

        return valueChains;
    }

    public async Task<OrderValueChainProducerDto> GetOrderCommissionedValueChain(int orderId)
    {
        ICollection<ProductOption> orderVariants = await _orderRepository.GetProductOptionsByOrderId(orderId).ToListAsync();
        OrderValueChainProducerDto valueChain = await GetOrderCommissionedValueChainDto(orderId);

        MapMaterialNames(valueChain.ValueChainActions, orderVariants);

        return valueChain;
    }

    public Task<CustomerInfo> GetOrderCustomerInfo(int orderId)
    {
        return _customerInfoRepository.GetAll().SingleAsync(ci => ci.ShopOrderId == orderId);
    }

    public async Task<OrderedProductDto> GetOrderProductInfoAdmin(int orderId)
    {
        OrderedProductDto productInfo = await GetProductInfo(orderId);
        int variantId = await _orderRepository
            .GetAll()
            .Where(order => order.Id == orderId)
            .Select(order => order.ProductVariantId)
            .SingleAsync();

        List<PayoutDto> producers = await _orderProductionPlanRepository
            .GetAll()
            .ForOrder(orderId)
            .WithStatuses(ProductionStatus.Commissioned, ProductionStatus.InProgress, ProductionStatus.Completed)
            .SelectMany(plan => plan.OrderProductionPlanActions
                .Select(action => new
                {
                    action.PlanAction.Producer.UserAddress.Name,
                    action.PlanAction.ProducerId,
                    PayoutSum = action.PlanAction.VariantActionCost
                        .Where(cost => cost.ProductVariantId == variantId)
                        .Select(cost =>
                            cost.AdditionalCost +
                            cost.MaterialCost +
                            cost.TransportAndAssemblyCost +
                            cost.WorkCost)
                        .FirstOrDefault()
                })
            )
            .GroupBy(x => new { x.ProducerId, x.Name })
            .Select(g => new PayoutDto
            {
                Name = g.Key.Name,
                PayoutSum = g.Sum(x => x.PayoutSum)
            })
            .ToListAsync();

        productInfo.Payouts = producers;

        return productInfo;
    }

    public async Task<OrderedProductDto> GetOrderProductInfoProducer(int orderId, long producerId)
    {
        OrderedProductDto productInfo = await GetProductInfo(orderId);

        int variantId = await _orderRepository
            .GetAll()
            .Where(order => order.Id == orderId)
            .Select(order => order.ProductVariantId)
            .SingleAsync();

        StepVariantCostInformation producerActionsRevenue = await _orderProductionPlanRepository.GetAll()
            .ForOrder(orderId)
            .WithStatuses(ProductionStatus.Commissioned, ProductionStatus.InProgress, ProductionStatus.Completed)
            .Select(plan => plan.OrderProductionPlanActions
                .Where(action => action.PlanAction.ProducerId == producerId)
                .Select(action => action.PlanAction.VariantActionCost
                    .First(cost => cost.ProductVariantId == variantId))
                .Select(cost => new StepVariantCostInformation
                (
                    cost.WorkCost,
                    cost.AdditionalCost,
                    cost.TransportAndAssemblyCost,
                    cost.MaterialCost
                ))
                .AggregateSum()
            )
            .SingleAsync();

        productInfo.Payouts = new List<PayoutDto>
        {
            new()
            {
                Name = L("OrderDetails.ProducerRequestCard.Costs.WorkCost"),
                PayoutSum = producerActionsRevenue.WorkCost
            },
            new()
            {
                Name = L("OrderDetails.ProducerRequestCard.Costs.MaterialAndTransport"),
                PayoutSum = producerActionsRevenue.MaterialCost + 
                            producerActionsRevenue.AdditionalCost + 
                            producerActionsRevenue.TransportAndAssemblyCost
            },
            new()
            {
                Name = L("OrderDetails.ProducerRequestCard.Costs.Total"),
                PayoutSum = producerActionsRevenue.MaterialCost + 
                            producerActionsRevenue.AdditionalCost + 
                            producerActionsRevenue.TransportAndAssemblyCost + 
                            producerActionsRevenue.WorkCost
            }
        };
        return productInfo;
    }

    private async Task<List<OrderValueChainAdminDto>> GetOrderValueChainsDtos(int orderId)
    {
        return await _orderProductionPlanRepository.GetAll()
            .ForOrder(orderId)
            .SelectToOrderValueChainAdminDto()
            .ToListAsync();
    }

    private async Task<OrderValueChainProducerDto> GetOrderCommissionedValueChainDto(int orderId)
    {
        return await _orderProductionPlanRepository.GetAll()
            .ForOrder(orderId)
            .WithStatuses(ProductionStatus.Commissioned, ProductionStatus.InProgress, ProductionStatus.Completed)
            .SelectToOrderValueChainProducerDto()
            .SingleAsync();
    }

    private async Task<OrderedProductDto> GetProductInfo(int orderId)
    {
        IEnumerable<TaxesAndRoyalties> taxesAndRoyalties = _taxesAndRoyaltiesRepository
            .GetAll()
            .Where(tar => tar.IsActive);

        TaxesAndRoyalties developerRoyalty = taxesAndRoyalties.Single(tar => tar.TaxType == TaxType.DeveloperRoyalty);
        TaxesAndRoyalties platformRoyalty = taxesAndRoyalties.Single(tar => tar.TaxType == TaxType.PlatformRoyalty);

        return await _orderRepository
            .GetAll()
            .Where(order => order.Id == orderId)
            .Select(order => new OrderedProductDto
            {
                OrderNumber = order.OrderNumber,
                Measurement = ObjectMapper.Map<MeasurementDto>(order.ProductVariant.ProductMeasurement),
                Materials = order.ProductVariant.ProductOptions
                    .Select(po => new OrderMaterialDto
                    {
                        MaterialGroupName = po.WorkPiece.MaterialGroup.Name,
                        MaterialName = po.WorkPieceVariantId != null
                            ? po.WorkPieceVariant.Description
                            : po.WorkPiece.ProductionStates.Single(ps => ps.StateType == ProductionStateType.WorkPieceStart).Description,
                    }).ToList(),
                ProductionCost = order.ProductVariant.Cost,
                PlatformShare = (order.ProductVariant.Cost * platformRoyalty.Percentage),
                DeveloperShare = (order.ProductVariant.Cost * developerRoyalty.Percentage),
                Documents = order.OrderDeliveryDocuments.Select(document => new DeliveryDocumentsDto
                {
                    FileId = document.Id,
                    FileName = document.FileName,
                    OrderId = document.ShopOrderId
                }).ToList()
            }).SingleAsync();
    }

    private static void MapMaterialNames<T>(IEnumerable<T> actions, ICollection<ProductOption> orderVariants) where T : OrderValueChainActionBaseDto
    {
        foreach (T action in actions)
        {
            ProductOption option = orderVariants.Single(po => po.WorkPieceId == action.ActionStepDto.WorkPieceId);
            action.ActionStepDto.MaterialName = option.WorkPieceVariantId == null
                ? option.WorkPiece.ProductionStates.First(ps => ps.StateType == ProductionStateType.WorkPieceStart).Description
                : option.WorkPieceVariant.Description;
        }
    }
}