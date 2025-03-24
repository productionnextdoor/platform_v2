using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.MultiTenancy.Payments.PayPal.Dto;

namespace PMHelmutSchmidtPortal.MultiTenancy.Payments.PayPal
{
    public interface IPayPalPaymentAppService : IApplicationService
    {
        Task ConfirmPayment(long paymentId, string paypalOrderId);

        PayPalConfigurationDto GetConfiguration();
    }
}
