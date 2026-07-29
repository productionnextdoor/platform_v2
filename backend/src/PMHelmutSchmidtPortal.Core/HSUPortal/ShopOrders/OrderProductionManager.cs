using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.BackgroundJobs;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using NUglify.Helpers;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Exceptions;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto.Details;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders.Jobs;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public class OrderProductionManager : HSUDomainBaseService, IOrderProductionManager
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductionPlanRepository _planRepository;
    private readonly IOrderProductionActionManager _orderProductionActionManager;
    private readonly IRepository<OrderProductionPlan> _orderProductionPlanRepository;
    private readonly IBackgroundJobManager _backgroundJobManager;
    private readonly IOrderEmailer _orderEmailer;

    private const string RateAsc = "rate ASC";

    public OrderProductionManager(
        IOrderRepository orderRepository,
        IProductionPlanRepository planRepository,
        IOrderProductionActionManager orderProductionActionManager,
        IRepository<OrderProductionPlan> orderProductionPlanRepository,
        IBackgroundJobManager backgroundJobManager,
        IOrderEmailer orderEmailer)
    {
        _orderRepository = orderRepository;
        _planRepository = planRepository;
        _orderProductionActionManager = orderProductionActionManager;
        _orderProductionPlanRepository = orderProductionPlanRepository;
        _backgroundJobManager = backgroundJobManager;
        _orderEmailer = orderEmailer;
    }

    public async Task CheckOrdersForTimeoutAndSelectNextValueChain()
    {
        List<int> timedOutOrderIds = await _orderRepository
            .GetAll()
            .Where(order => order.Status == OrderStatus.Open && !order.OrderProductionPlans
                .Any(plan => plan.ProductionStatus == ProductionStatus.Selected &&
                             plan.SelectedForProductionAt.AddHours(72) > DateTime.Now))
            .Select(order => order.Id)
            .ToListAsync();

        foreach (int orderId in timedOutOrderIds)
        {
            try
            {
                await SelectValueChainForOrder(orderId);
            }
            catch (NoProductionPlanAvailable e)
            {
                await CancelProduction(orderId);
            }

            await CurrentUnitOfWork.SaveChangesAsync();
        }
    }

    public async Task AcceptOrRejectProductionAction(AcceptOrRejectActionInputDto input, long producerId)
    {
        List<OrderProductionPlanAction> actions = await _orderProductionActionManager
            .GetOrderPlanActionsByStep(input.OrderId, input.ProductionStepId)
            .Where(action => action.ActionStatus == ActionStatus.Open &&
                             action.PlanAction.ProducerId == producerId)
            .ToListAsync();

        actions.ForEach(action => action.ActionStatus = input.Accept ? ActionStatus.Accepted : ActionStatus.Rejected);
        await CurrentUnitOfWork.SaveChangesAsync();
        await (input.Accept
            ? CheckAndCommissionPlanIfAllAccepted(input.OrderId)
            : RejectAndSelectNextValueChain(input.OrderId));
    }

    public async Task StartProductionAction(int valueChainActionId, long currentProducerId)
    {
        OrderProductionPlan plan = await _orderProductionPlanRepository
            .GetAll()
            .Where(plan => plan.OrderProductionPlanActions
                .Any(action => action.Id == valueChainActionId && action.PlanAction.ProducerId == currentProducerId))
            .Include(plan => plan.OrderProductionPlanActions)
            .Include(plan => plan.ShopOrder)
            .SingleAsync();

        if (plan.ProductionStatus is not (ProductionStatus.Commissioned or ProductionStatus.InProgress))
        {
            throw new UserFriendlyException("Can't start work");
        }

        OrderProductionPlanAction action = plan.OrderProductionPlanActions.Single(action => action.Id == valueChainActionId);

        if (action.ActionStatus != ActionStatus.Commissioned)
        {
            throw new UserFriendlyException("Can't start work");
        }

        action.ActionStatus = ActionStatus.InProgress;
        plan.ProductionStatus = ProductionStatus.InProgress;
        plan.ShopOrder.Status = OrderStatus.InProgress;
    }

    public async Task FinishProductionAction(int valueChainActionId, long currentProducerId)
    {
        OrderProductionPlan plan = await _orderProductionPlanRepository
            .GetAll()
            .Where(plan => plan.OrderProductionPlanActions
                .Any(action => action.Id == valueChainActionId && action.PlanAction.ProducerId == currentProducerId))
            .Include(plan => plan.OrderProductionPlanActions)
            .ThenInclude(action => action.PlanAction.ProductionStep.EndState)
            .Include(plan => plan.ShopOrder)
            .SingleAsync();

        OrderProductionPlanAction action = plan.OrderProductionPlanActions.Single(action => action.Id == valueChainActionId);

        if (action.ActionStatus != ActionStatus.InProgress)
        {
            throw new UserFriendlyException("Can't finish work");
        }

        action.ActionStatus = ActionStatus.Completed;

        if (action.PlanAction.ProductionStep.EndState.StateType == ProductionStateType.ProductFinal)
        {
            plan.ProductionStatus = ProductionStatus.Completed;
            plan.ShopOrder.Status = OrderStatus.Completed;
            await _orderEmailer.SendOrderCompletedToPlatformAdmins(plan.ShopOrderId, plan.ShopOrder.OrderNumber);
        }
    }

    public async Task ReRequestProducer(ActionReRequestDto input)
    {
        List<OrderProductionPlanAction> actions = await _orderProductionActionManager
            .GetOrderPlanActionsByStep(input.OrderId, input.StepId)
            .Include(action => action.PlanAction.Producer.UserAddress)
            .Where(action => action.ActionStatus == ActionStatus.Rejected)
            .ToListAsync();

        actions.ForEach(action => action.ActionStatus = ActionStatus.Open);
        await CurrentUnitOfWork.SaveChangesAsync();

        ShopOrder order = _orderRepository
            .GetAll()
            .Include(order => order.ProductVariant.Product)
            .Include(order => order.OrderProductionPlans
                .Where(plan => plan.ProductionStatus == ProductionStatus.Rejected))
            .ThenInclude(plan => plan.OrderProductionPlanActions)
            .Single(order => order.Id == input.OrderId);

        order.OrderProductionPlans.ForEach(plan =>
        {
            if (plan.OrderProductionPlanActions
                .All(action => action.ActionStatus is ActionStatus.Accepted or ActionStatus.Open))
            {
                plan.ProductionStatus = ProductionStatus.Selected;
            }
        });

        if (order.OrderProductionPlans.Any(plan => plan.ProductionStatus == ProductionStatus.Selected))
        {
            order.Status = OrderStatus.Open;
        }

        User producer = actions.First().PlanAction.Producer;
        await _orderEmailer.SendProductionRequestToProducer(
            producer.UserAddress.Name,
            producer.EmailAddress,
            order.ProductVariant.Product.Name,
            order.Id);
    }

    public async Task SelectValueChainForOrder(int orderId)
    {
        ShopOrder order = await _orderRepository
            .GetOrderWithAssoc(orderId)
            .SingleAsync();

        if (order.Status != OrderStatus.Open)
        {
            throw new NoProductionPlanAvailable();
        }

        OrderProductionPlan selectedValueChain = await GetNewValueChain(order);

        if (selectedValueChain.OrderProductionPlanActions.All(actions => actions.ActionStatus == ActionStatus.Accepted))
        {
            await CommissionValueChain(selectedValueChain.Id, order.Id);
        }

        IEnumerable<int> openPlanActionsIds = selectedValueChain.OrderProductionPlanActions
            .Where(action => action.ActionStatus == ActionStatus.Open)
            .Select(action => action.PlanActionId);

        await InformProducerAboutNewValueChain(selectedValueChain, openPlanActionsIds, order);
    }

    private async Task CheckAndCommissionPlanIfAllAccepted(int orderId)
    {
        int planId = await _orderProductionPlanRepository.GetAll()
            .Where(plan => plan.ShopOrderId == orderId)
            .Where(plan => plan.OrderProductionPlanActions.All(action => action.ActionStatus == ActionStatus.Accepted))
            .OrderBy(plan => plan.SelectedForProductionAt)
            .Select(plan => plan.Id)
            .FirstOrDefaultAsync();

        if (planId == 0)
            return;

        await CommissionValueChain(planId, orderId);
    }

    private async Task RejectAndSelectNextValueChain(int orderId)
    {
        ShopOrder order = await _orderRepository
            .GetAll()
            .Include(order => order.OrderProductionPlans
                .Where(plan =>
                    plan.ProductionStatus == ProductionStatus.Selected &&
                    plan.OrderProductionPlanActions
                        .Any(action => action.ActionStatus == ActionStatus.Rejected)))
            .SingleAsync(order => order.Id == orderId);

        order.OrderProductionPlans.ForEach(plan => plan.ProductionStatus = ProductionStatus.Rejected);
        await CurrentUnitOfWork.SaveChangesAsync();
        
        if (order.Status != OrderStatus.Open || await IsValidPlanAvailable(orderId))
        {
            return;
        }

        try
        {
            await SelectValueChainForOrder(orderId);
        }
        catch (NoProductionPlanAvailable e)
        {
            await CancelProduction(orderId);
        }
    }

    private async Task CancelProduction(int orderId)
    {
        ShopOrder order = await _orderRepository
            .GetAll()
            .Include(order => order.OrderProductionPlans)
            .ThenInclude(pp => pp.OrderProductionPlanActions)
            .Include(order => order.ProductVariant.Product)
            .SingleAsync(order => order.Id == orderId);

        if (order.Status != OrderStatus.Open)
        {
            throw new CantCancelProductionException();
        }

        order.Status = OrderStatus.NotDone;
        await _orderEmailer.SendProductNotProducibleToPlatformAdmins(order.Id, order.OrderNumber, order.ProductVariant.Product.Name, order.OrderDate);
    }

    private async Task CommissionValueChain(int planId, int orderId)
    {
        ShopOrder order = await _orderRepository.SingleAsync(order => order.Id == orderId);
        order.Status = OrderStatus.Commissioned;

        await CommissionOrderProductionPlan(planId);
        await RejectOtherProductionPlans(planId, orderId);

        string productName = await _orderRepository.GetAll()
            .Where(o => o.Id == orderId)
            .Select(o => o.ProductVariant.Product.Name).SingleAsync();

        List<User> producers = await _orderProductionPlanRepository.GetAll()
            .Where(plan => plan.Id == planId)
            .SelectMany(plan => plan.OrderProductionPlanActions.Select(action => action.PlanAction.Producer))
            .ToListAsync();

        await InformProducersAboutValueChangeCommission(productName, orderId, producers);
    }

    private async Task CommissionOrderProductionPlan(int planId)
    {
        OrderProductionPlan plan = await _orderProductionPlanRepository
            .GetAll()
            .Include(pp => pp.OrderProductionPlanActions)
            .SingleAsync(pp => pp.Id == planId);
        plan.ProductionStatus = ProductionStatus.Commissioned;
        plan.CommissionedAt = DateTime.Now;
        plan.OrderProductionPlanActions.ToList().ForEach(action => action.ActionStatus = ActionStatus.Commissioned);
    }

    private async Task RejectOtherProductionPlans(int planId, int shopOrderId)
    {
        List<OrderProductionPlan> rejectedPlans = await _orderProductionPlanRepository
            .GetAll()
            .Include(pp => pp.OrderProductionPlanActions)
            .Where(pp => pp.ShopOrderId == shopOrderId && pp.Id != planId)
            .ToListAsync();

        rejectedPlans.ToList().ForEach(rejectedPlan =>
        {
            rejectedPlan.ProductionStatus = ProductionStatus.Rejected;
            rejectedPlan.OrderProductionPlanActions.ToList().ForEach(action => action.ActionStatus = ActionStatus.NotCommissioned);
        });
    }

    private async Task<bool> IsValidPlanAvailable(int orderId)
    {
        return await _orderProductionPlanRepository
            .GetAll()
            .Where(plan => plan.ShopOrderId == orderId &&
                           plan.ProductionStatus == ProductionStatus.Selected &&
                           plan.SelectedForProductionAt.AddHours(72) > DateTime.Now).AnyAsync();
    }

    private async Task<OrderProductionPlan> GetNewValueChain(ShopOrder order)
    {
        IQueryable<ProductionPlan> query = _planRepository
            .GetProductionPlansForVariant(order.ProductVariant)
            .Include(plan => plan.PlanActions)
            .ThenInclude(pa => pa.Producer.UserAddress)
            .OrderBy(RateAsc, order.ValueChainParameterId)
            .Where(plan => plan.IsActive);

        OrderProductionPlan selectedValueChain = null;

        while (selectedValueChain is null)
        {
            List<int> usedPlansIds = order.OrderProductionPlans.Select(plan => plan.ProductionPlanId).ToList();

            if (usedPlansIds.Count > 0)
            {
                query = query.Where(plan => !usedPlansIds.Contains(plan.Id));
            }

            ProductionPlan productionPlan = await query.FirstOrDefaultAsync();

            if (productionPlan == null)
            {
                throw new NoProductionPlanAvailable();
            }

            OrderProductionPlan candidateValueChain = GetCandidateValueChain(productionPlan, order);

            if (candidateValueChain.OrderProductionPlanActions.Any(action => action.ActionStatus == ActionStatus.Rejected))
            {
                candidateValueChain.ProductionStatus = ProductionStatus.Rejected;
            }
            else
            {
                selectedValueChain = candidateValueChain;
            }

            order.OrderProductionPlans.Add(candidateValueChain);
        }

        await CurrentUnitOfWork.SaveChangesAsync();

        return selectedValueChain;
    }

    private static OrderProductionPlan GetCandidateValueChain(ProductionPlan productionPlan, ShopOrder order)
    {
        OrderProductionPlan candidateValueChain = new()
        {
            ProductionPlan = productionPlan,
            ProductionPlanId = productionPlan.Id,
            ProductionStatus = ProductionStatus.Selected,
            SelectedForProductionAt = DateTime.Now,
            OrderProductionPlanActions = productionPlan.PlanActions.Select(action => new OrderProductionPlanAction()
            {
                PlanActionId = action.Id,
                PlanAction = action,
                ActionStatus = order.OrderProductionPlans
                    .SelectMany(plan => plan.OrderProductionPlanActions)
                    .FirstOrDefault(ppa => ppa.PlanAction.ProductionStepId == action.ProductionStepId)?
                    .ActionStatus ?? ActionStatus.Open
            }).ToList()
        };

        return candidateValueChain;
    }

    private async Task InformProducerAboutNewValueChain(OrderProductionPlan selectedValueChain, IEnumerable<int> openPlanActionsIds, ShopOrder order)
    {
        List<EmailContactsArgs> producerContacts = selectedValueChain.ProductionPlan
            .PlanActions
            .Where(planAction => openPlanActionsIds.Contains(planAction.Id))
            .Select(pa => new EmailContactsArgs()
            {
                ContactName = pa.Producer.UserAddress.Name,
                Email = pa.Producer.EmailAddress
            })
            .GroupBy(pa => new { pa.ContactName, pa.Email })
            .Select(g => g.First())
            .ToList();

        await NotifyProducersByEmail(
            order.ProductVariant.Product.Name,
            order.Id,
            producerContacts
        );
    }

    private async Task NotifyProducersByEmail(string productName, int orderId, List<EmailContactsArgs> producerArgs)
    {
        await _backgroundJobManager.EnqueueAsync<NotifyProducersNewProductionRequestJob, ProductionRequestEmailArgs>(
            new ProductionRequestEmailArgs
            {
                ProductName = productName,
                OrderId = orderId,
                ProducersEmailContacts = producerArgs
            }, BackgroundJobPriority.Normal, TimeSpan.FromMinutes(5));
    }

    private async Task InformProducersAboutValueChangeCommission(string productName, int orderId, List<User> producers)
    {
        await _backgroundJobManager.EnqueueAsync<NotifyProducersAboutCommissionJob, OrderInfoEmailArgs>(
            new OrderInfoEmailArgs
            {
                ProductName = productName,
                OrderId = orderId,
                EmailContacts = GetProducerEmailContacts(producers)
            }, BackgroundJobPriority.Normal, TimeSpan.FromMinutes(5));
    }

    private static List<EmailContactsArgs> GetProducerEmailContacts(List<User> producers)
    {
        return producers
            .Select(producer => new EmailContactsArgs
                {
                    ContactName = producer.Name,
                    Email = producer.EmailAddress
                }
            ).ToList();
    }
}