using System.Threading.Tasks;
using Abp.BackgroundJobs;
using Abp.Dependency;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto;


namespace PMHelmutSchmidtPortal.HSUPortal.Products.Jobs;

public class SendDeadlineChangeJob :  AsyncBackgroundJob<ProductProducersEmailArgs>, ITransientDependency
{
    private readonly IProductEmailer _productEmailer;

    public SendDeadlineChangeJob(IProductEmailer productEmailer)
    {
        _productEmailer = productEmailer;
    }

    public override async Task ExecuteAsync(ProductProducersEmailArgs args)
    {
        foreach (ProfileBase producer in args.Producers)
        {
            await _productEmailer.SendProcessingDeadlineUpdate(producer, args.Product);
        }
    }
}