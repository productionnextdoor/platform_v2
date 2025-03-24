using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.MultiTenancy.Payments
{
    public interface IPaymentGatewayStore
    {
        List<PaymentGatewayModel> GetActiveGateways();
    }
}
