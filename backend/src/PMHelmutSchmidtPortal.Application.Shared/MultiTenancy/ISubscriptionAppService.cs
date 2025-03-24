using System.Threading.Tasks;
using Abp.Application.Services;

namespace PMHelmutSchmidtPortal.MultiTenancy
{
    public interface ISubscriptionAppService : IApplicationService
    {
        Task DisableRecurringPayments();

        Task EnableRecurringPayments();
    }
}
