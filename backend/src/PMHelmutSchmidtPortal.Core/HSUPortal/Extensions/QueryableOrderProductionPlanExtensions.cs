using System;
using System.Globalization;
using System.Linq;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Extensions;

public static class QueryableOrderProductionPlanExtensions
{
    public static IQueryable<OrderProductionPlan> ForOrder(this IQueryable<OrderProductionPlan> query, int orderId)
    {
        return query.Where(opp => opp.ShopOrderId == orderId);
    }

    public static IQueryable<OrderProductionPlan> WithStatuses(this IQueryable<OrderProductionPlan> query, params ProductionStatus[] statuses)
    {
        return query.Where(plan => statuses.Contains(plan.ProductionStatus));
    }

    public static IQueryable<OrderValueChainAdminDto> SelectToOrderValueChainAdminDto(this IQueryable<OrderProductionPlan> query)
    {
        return query.Select(opp => new OrderValueChainAdminDto
        {
            OrderValueChainId = opp.Id,
            Status = opp.ProductionStatus,
            RequestDate = opp.SelectedForProductionAt,
            ValueChainActions = opp.OrderProductionPlanActions
                .OrderBy(pa => pa.PlanAction.ProductionStep.EndState.StateType)
                .ThenBy(pa => pa.PlanAction.StartPoint)
                .Select(oppa => new OrderValueChainActionAdminDto
                {
                    OrderValueChainActionId = oppa.Id,
                    ProductionStepId = oppa.PlanAction.ProductionStepId,
                    ActionStepDto = new ValueChainActionStepDto
                    {
                        WorkPieceId = oppa.PlanAction.ProductionStep.StartState.WorkPieceId ?? 0,
                        StartStateName = oppa.PlanAction.ProductionStep.StartState.Description,
                        EndStateName = oppa.PlanAction.ProductionStep.EndState.Description
                    },
                    ProducerDto = new ValueChainActionProducerDto
                    {
                        Name = oppa.PlanAction.ProductionStep.ProducerInfo.User.UserAddress.Name,
                        WorkType = oppa.PlanAction.ProductionStep.ProducerInfo.TradeType.Name,
                        Street = oppa.PlanAction.ProductionStep.ProducerInfo.User.UserAddress.Street,
                        ZipCode = oppa.PlanAction.ProductionStep.ProducerInfo.User.UserAddress.ZipCode,
                        City = oppa.PlanAction.ProductionStep.ProducerInfo.User.UserAddress.City,
                        Email = oppa.PlanAction.ProductionStep.ProducerInfo.User.EmailAddress,
                        Phone = oppa.PlanAction.ProductionStep.ProducerInfo.User.PhoneNumber
                    },
                    Status = oppa.ActionStatus,
                    ProcessingTimeInWeeks = oppa.PlanAction.ProcessingTimeInWeeks,
                })
                .ToList()
        });
    }

    public static IQueryable<OrderValueChainProducerDto> SelectToOrderValueChainProducerDto(this IQueryable<OrderProductionPlan> query)
    {
        return query.Select(opp => new OrderValueChainProducerDto
        {
            OrderValueChainId = opp.Id,
            ValueChainActions = opp.OrderProductionPlanActions
                .OrderBy(pa => pa.PlanAction.StartPoint)
                .Select(oppa => new OrderValueChainActionProducerDto
                {
                    OrderValueChainActionId = oppa.Id,
                    ProducerId = oppa.PlanAction.ProductionStep.ProducerInfo.UserId,
                    ActionStepDto = new ValueChainActionStepDto
                    {
                        WorkPieceId = oppa.PlanAction.ProductionStep.StartState.WorkPieceId,
                        StartStateName = oppa.PlanAction.ProductionStep.StartState.Description,
                        EndStateName = oppa.PlanAction.ProductionStep.EndState.Description
                    },
                    ProducerDto = new ValueChainActionProducerDto
                    {
                        Name = oppa.PlanAction.ProductionStep.ProducerInfo.User.UserAddress.Name,
                        WorkType = oppa.PlanAction.ProductionStep.ProducerInfo.TradeType.Name,
                        Street = oppa.PlanAction.ProductionStep.ProducerInfo.User.UserAddress.Street,
                        ZipCode = oppa.PlanAction.ProductionStep.ProducerInfo.User.UserAddress.ZipCode,
                        City = oppa.PlanAction.ProductionStep.ProducerInfo.User.UserAddress.City,
                        Email = oppa.PlanAction.ProductionStep.ProducerInfo.User.EmailAddress,
                        Phone = oppa.PlanAction.ProductionStep.ProducerInfo.User.PhoneNumber
                    },
                    Status = oppa.ActionStatus,
                    ProcessingFrom = ISOWeek.GetWeekOfYear(oppa.OrderProductionPlan.CommissionedAt.GetValueOrDefault(DateTime.Now).AddDays(7*oppa.PlanAction.StartPoint)),
                    ProcessingTo =  ISOWeek.GetWeekOfYear(oppa.OrderProductionPlan.CommissionedAt.GetValueOrDefault(DateTime.Now).AddDays(7*oppa.PlanAction.EndPoint)),
                    IsFinal = oppa.PlanAction.FinalState.StateType == ProductionStateType.ProductFinal
                })
                .ToList()
        });
    }
}