using System.Collections.Generic;
using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport.Workers;

public class OrderImportWorker : PeriodicBackgroundWorkerBase, ISingletonDependency
{
    private readonly IOrderManager _orderManager;

    public OrderImportWorker(AbpTimer timer, IOrderManager orderManager) : base(timer)
    {
        _orderManager = orderManager;
        //10 minutes
        Timer.Period = 10*60*1000;
    }

    protected override async void DoWork()
    {
        using IUnitOfWorkCompleteHandle uow = UnitOfWorkManager.Begin();
        
        using (CurrentUnitOfWork.SetTenantId(null))
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                List<ShopOrder> orders = await _orderManager.ImportOrdersFromShop();
                Logger.Info($"{orders.Count} orders imported");
                await uow.CompleteAsync();
            }
        }
    }
}