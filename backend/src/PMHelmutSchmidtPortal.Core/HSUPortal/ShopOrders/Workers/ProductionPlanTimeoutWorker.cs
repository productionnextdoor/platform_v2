using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders.Workers;

public class ProductionPlanTimeoutWorker : PeriodicBackgroundWorkerBase, ISingletonDependency
{
    private readonly IOrderProductionManager _productionManager;

    public ProductionPlanTimeoutWorker(
        AbpTimer timer,
        IOrderProductionManager productionManager) : base(timer)
    {
        _productionManager = productionManager;
        Timer.Period = 24 * 60 * 60 * 1000;
    }

    protected override async void DoWork()
    {
        using IUnitOfWorkCompleteHandle uow = UnitOfWorkManager.Begin();

        using (CurrentUnitOfWork.SetTenantId(null))
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                await _productionManager.CheckOrdersForTimeoutAndSelectNextValueChain();
                await uow.CompleteAsync();
            }
        }
    }
}