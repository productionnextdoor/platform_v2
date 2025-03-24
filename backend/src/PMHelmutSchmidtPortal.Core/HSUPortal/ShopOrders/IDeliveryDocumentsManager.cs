using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public interface IDeliveryDocumentsManager: IDomainService
{
    Task<OrderDeliveryDocument> GetDocument(int documentId);
    Task<List<OrderDeliveryDocument>> GetDocuments(int orderId);
    Task RemoveFile(int documentId);
    Task<OrderDeliveryDocument> SaveProductFile(OrderDeliveryDocument document);
    string GetFullFilePath(string filePath);
}
