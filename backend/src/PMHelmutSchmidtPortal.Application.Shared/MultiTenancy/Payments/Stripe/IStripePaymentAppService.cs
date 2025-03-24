using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.MultiTenancy.Payments.Dto;
using PMHelmutSchmidtPortal.MultiTenancy.Payments.Stripe.Dto;

namespace PMHelmutSchmidtPortal.MultiTenancy.Payments.Stripe
{
    public interface IStripePaymentAppService : IApplicationService
    {
        Task ConfirmPayment(StripeConfirmPaymentInput input);

        StripeConfigurationDto GetConfiguration();

        Task<SubscriptionPaymentDto> GetPaymentAsync(StripeGetPaymentInput input);

        Task<string> CreatePaymentSession(StripeCreatePaymentSessionInput input);
    }
}