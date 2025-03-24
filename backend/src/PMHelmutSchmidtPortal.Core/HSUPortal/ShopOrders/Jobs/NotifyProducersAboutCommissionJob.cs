using System.Linq;
using System.Threading.Tasks;
using Abp.BackgroundJobs;
using Abp.Dependency;
using PMHelmutSchmidtPortal.HSUPortal.Orders.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders.Jobs;

public class NotifyProducersAboutCommissionJob : AsyncBackgroundJob<OrderInfoEmailArgs>, ITransientDependency
{
    private readonly IOrderEmailer _mailer;

    public NotifyProducersAboutCommissionJob(IOrderEmailer mailer)
    {
        _mailer = mailer;
    }
    
    public override async Task ExecuteAsync(OrderInfoEmailArgs args)
    {
        var tasks = args.EmailContacts
            .Select(contact =>
                _mailer.SendProductionCommissionedToProducer(
                    contact.ContactName,
                    contact.Email,
                    args.ProductName,
                    args.OrderId
                )
            );

        await Task.WhenAll(tasks);
    }
}