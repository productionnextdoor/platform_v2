using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public interface IOrderEmailer
{
    Task SendProductionRequestToProducer(string producerName, string producerEmail, string productName, int orderId);
    Task SendProductionCommissionedToProducer(string producerName, string producerEmail, string productName,
        int orderId);
    Task SendProductNotProducibleToPlatformAdmins(int orderId, string orderNumber, string productName, DateTime orderDate);
    Task SendOrderCompletedToPlatformAdmins(int orderId, string orderNumber);
}