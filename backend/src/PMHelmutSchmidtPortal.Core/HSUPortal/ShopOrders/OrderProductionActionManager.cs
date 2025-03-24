using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductVariantStep;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public class OrderProductionActionManager : HSUDomainBaseService, IOrderProductionActionManager
{
    private readonly IRepository<OrderProductionPlanAction> _orderPlanActionRepository;
    private readonly IRepository<VariantProductionPlanActionCost> _variantActionCostRepository;
    private readonly IProducerInfoRepository _producerInfoRepository;
    private readonly IOrderRepository _orderRepository;

    public OrderProductionActionManager(
        IRepository<OrderProductionPlanAction> orderPlanActionRepository,
        IRepository<VariantProductionPlanActionCost> variantActionCostRepository,
        IProducerInfoRepository producerInfoRepository,
        IOrderRepository orderRepository
    )
    {
        _orderPlanActionRepository = orderPlanActionRepository;
        _variantActionCostRepository = variantActionCostRepository;
        _producerInfoRepository = producerInfoRepository;
        _orderRepository = orderRepository;
    }

    public async Task<List<OrderProducerRequestOutput>> GetProducerActionRequests(int orderId, long producerId)
    {
        decimal producerRate = await _producerInfoRepository
            .GetAll()
            .Where(pi => pi.UserId == producerId)
            .Select(prod => prod.Rate)
            .SingleAsync();

        List<OrderProducerRequestOutput> requests = await GetOrderProducerRequests(orderId, producerId, producerRate);

        List<int> requestStepIds = requests.Select(req => req.ProductionStepId).ToList();

        Dictionary<int, List<(decimal WorkCost, decimal MaterialAndTransportCost)>> stepRevenue = await GetStepRevenue(orderId, requestStepIds);

        foreach (OrderProducerRequestOutput requestOutput in requests)
        {
            requestOutput.WorkIncomeMax = stepRevenue[requestOutput.ProductionStepId]
                .Max(cost => cost.WorkCost);
            requestOutput.WorkIncomeMin = stepRevenue[requestOutput.ProductionStepId]
                .Min(cost => cost.WorkCost);
            requestOutput.MaterialAndTransportationsIncomeMax = stepRevenue[requestOutput.ProductionStepId]
                .Max(cost => cost.MaterialAndTransportCost);
            requestOutput.MaterialAndTransportationsIncomeMin = stepRevenue[requestOutput.ProductionStepId]
                .Min(cost => cost.MaterialAndTransportCost);
        }

        return requests;
    }

    public IQueryable<OrderProductionPlanAction> GetOrderPlanActionsByStep(int orderId, int stepId)
    {
        return _orderPlanActionRepository
            .GetAll()
            .Include(action => action.OrderProductionPlan)
            .Include(action => action.PlanAction)
            .Where(action =>
                action.OrderProductionPlan.ShopOrderId == orderId &&
                action.PlanAction.ProductionStepId == stepId);
    }

    private async Task<List<OrderProducerRequestOutput>> GetOrderProducerRequests(int orderId, long producerId, decimal producerRate)
    {
        List<ProductOption> productOption = await _orderRepository.GetProductOptionsByOrderId(orderId).ToListAsync();

        return _orderPlanActionRepository
            .GetAll()
            .Where(action => action.OrderProductionPlan.ShopOrderId == orderId && action.PlanAction.ProducerId == producerId)
            .Select(oppa => new
            {
                oppa,
                StartStateDescription = oppa.PlanAction.ProductionStep.StartState.Description,
                EndStateDescription = oppa.PlanAction.ProductionStep.EndState.Description,
                oppa.PlanAction.ProductionStep.StartState.WorkPieceId,
                Measurement = oppa.OrderProductionPlan.ShopOrder.ProductVariant.ProductMeasurement,
                oppa.OrderProductionPlan.ProductionPlan.LeadTime,
                oppa.PlanAction,
                StepMeasurementVariant = oppa.PlanAction.ProductionStep.StepMeasurementVariants
                    .SingleOrDefault(smp => smp.ProductMeasurementId == oppa.OrderProductionPlan.ShopOrder.ProductVariant.ProductMeasurementId),
                StepWorkPieceVariantsCost = oppa.PlanAction.ProductionStep.StepMeasurementVariants
                    .SingleOrDefault(smp => smp.ProductMeasurementId == oppa.OrderProductionPlan.ShopOrder.ProductVariant.ProductMeasurementId).StepWorkPieceVariantCosts,
            })
            .AsEnumerable()
            .GroupBy(prodRequest => prodRequest.oppa.PlanAction.ProductionStepId)
            .Select(group => group.First())
            .Select(prodRequest => new OrderProducerRequestOutput
            {
                ProductionStepId = prodRequest.oppa.PlanAction.ProductionStepId,
                StartStateName = prodRequest.StartStateDescription,
                FinalStateName = prodRequest.EndStateDescription,
                Status = prodRequest.oppa.ActionStatus,
                Measurement = ObjectMapper.Map<MeasurementDto>(prodRequest.Measurement),
                Material = MapMaterialName(productOption, prodRequest.WorkPieceId ?? 0),
                DeliveryWindowInWeeks = ISOWeek.GetWeekOfYear(DateTime.Now.AddDays(decimal.ToDouble(prodRequest.LeadTime * 7))),
                ProcessingTimeInWeeks = prodRequest.StepMeasurementVariant.OrderProcessingTime,
                WorkHours = prodRequest.StepMeasurementVariant.WorkHours,
                WorkStart = ISOWeek.GetWeekOfYear(DateTime.Now.AddDays(7 * prodRequest.PlanAction.StartPoint)),
                WorkEnd = ISOWeek.GetWeekOfYear(DateTime.Now.AddDays(7 * prodRequest.PlanAction.EndPoint)),
                WorkCalculated = prodRequest.StepMeasurementVariant.WorkHours * producerRate,
                MaterialAndTransportationsCalculated = prodRequest.StepMeasurementVariant.AdditionalCost +
                                                       prodRequest.StepMeasurementVariant.TransportAndAssemblyCost +
                                                       (prodRequest.StepWorkPieceVariantsCost
                                                           .Single(swpv => productOption
                                                               .Any(po => po.WorkPieceId == swpv.WorkPieceId &&
                                                                          (swpv.VariantId == null && po.WorkPieceVariantId == null ||
                                                                           po.WorkPieceVariantId == swpv.VariantId)))
                                                           .MaterialCost)
            }).ToList();
    }

    private async Task<Dictionary<int, List<(decimal WorkCost, decimal MaterialAndTransportCost)>>> GetStepRevenue(int orderId, List<int> requestStepIds)
    {
        int variantId = await _orderRepository
            .GetAll()
            .Where(order => order.Id == orderId)
            .Select(order => order.ProductVariantId)
            .SingleAsync();


        return _variantActionCostRepository
            .GetAll()
            .Where(costs => costs.ProductVariantId == variantId &&
                            requestStepIds.Contains(costs.PlanAction.ProductionStepId))
            .Select(costs => new
            {
                costs.PlanAction.ProductionStepId,
                costs.WorkCost,
                MaterialAndTransportCost = costs.MaterialCost + costs.AdditionalCost + costs.TransportAndAssemblyCost
            })
            .GroupBy(costs => costs.ProductionStepId)
            .AsEnumerable()
            .ToDictionary(
                g => g.Key,
                g => g.Select(cost => (cost.WorkCost, cost.MaterialAndTransportCost)).ToList()
            );
    }


    private static string MapMaterialName(ICollection<ProductOption> orderVariants, int workPieceId)
    {
        ProductOption option = orderVariants.Single(po => po.WorkPieceId == workPieceId);

        return option.WorkPieceVariantId == null
            ? option.WorkPiece.ProductionStates.First(ps => ps.StateType == ProductionStateType.WorkPieceStart).Description
            : option.WorkPieceVariant.Description;
    }
}