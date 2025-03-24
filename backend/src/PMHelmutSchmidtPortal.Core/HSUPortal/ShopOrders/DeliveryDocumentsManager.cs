using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;


namespace PMHelmutSchmidtPortal.HSUPortal.ShopOrders;

public class DeliveryDocumentsManager:HSUDomainBaseService, IDeliveryDocumentsManager
{
    private readonly IRepository<OrderDeliveryDocument> _deliveryDocumentRepository;
    private readonly IHostEnvironment _env;

    public DeliveryDocumentsManager(IRepository<OrderDeliveryDocument> deliveryDocumentRepository, IHostEnvironment env)
    {
        _deliveryDocumentRepository = deliveryDocumentRepository;
        _env = env;
    }

    public Task<OrderDeliveryDocument> GetDocument(int documentId)
    {
        return _deliveryDocumentRepository.GetAsync(documentId);
    }

    public Task<List<OrderDeliveryDocument>> GetDocuments(int orderId)
    {
        return _deliveryDocumentRepository
            .GetAll()
            .Where(document => document.ShopOrderId == orderId)
            .ToListAsync();
    }

    public Task RemoveFile(int documentId)
    {
        return _deliveryDocumentRepository.DeleteAsync(documentId);
    }

    public async Task<OrderDeliveryDocument> SaveProductFile(OrderDeliveryDocument document)
    {
        await _deliveryDocumentRepository.InsertAndGetIdAsync(document);
        await CurrentUnitOfWork.SaveChangesAsync();
        return document;
    }
    
    public string GetFullFilePath(string filePath)
    {
        return Path.Combine(GetBaseUploadPath(), filePath);
    }
    
    private string GetBaseUploadPath()
    {
        return Path.Combine(_env.ContentRootPath, Environment.GetEnvironmentVariable(PMHelmutSchmidtPortalConsts.FileUploadPathEnvVariableName) ?? "");
    }
}
