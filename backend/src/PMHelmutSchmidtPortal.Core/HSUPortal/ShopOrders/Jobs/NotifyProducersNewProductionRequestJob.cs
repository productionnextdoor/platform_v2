using System.Threading.Tasks;
using Abp.BackgroundJobs;
using Abp.Dependency;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders.Jobs;

public class NotifyProducersNewProductionRequestJob :  AsyncBackgroundJob<ProductionRequestEmailArgs>, ITransientDependency
{
    private readonly IOrderEmailer _orderEmailer;

    public NotifyProducersNewProductionRequestJob(IOrderEmailer orderEmailer)
    {
        _orderEmailer = orderEmailer;
    }
    
    public override async Task ExecuteAsync(ProductionRequestEmailArgs args)
    {
        foreach (EmailContactsArgs producersEmailContact in args.ProducersEmailContacts)
        {
            await _orderEmailer.SendProductionRequestToProducer(
                producersEmailContact.ContactName,
                producersEmailContact.Email,
                args.ProductName,
                args.OrderId);
        }
    }
}