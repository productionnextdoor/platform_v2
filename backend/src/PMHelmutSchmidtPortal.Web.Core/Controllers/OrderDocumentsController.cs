using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.Web.Models.FileUpload;

namespace PMHelmutSchmidtPortal.Web.Controllers;

public class OrderDocumentsController: PMHelmutSchmidtPortalControllerBase
{
    private readonly IDeliveryDocumentsManager _deliveryDocumentsManager;

    public OrderDocumentsController(IDeliveryDocumentsManager deliveryDocumentsManager)
    {
        _deliveryDocumentsManager = deliveryDocumentsManager;
    }

    [HttpPost]
    [AbpMvcAuthorize(AppPermissions.Hsu_OrderManagement_Documents_Upload)]
    public async Task UploadFile(OrderDocumentModel model, CancellationToken cancellationToken)
    {
        IFormFile file = Request.Form.Files[0];

        string uniqueFileName = GetUniqueFileName(file.FileName);
        string filePath = GetFileDirectory(model.ShopOrderId);
        string dir = _deliveryDocumentsManager.GetFullFilePath(filePath);

        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }

        await file.CopyToAsync(new FileStream(Path.Combine(dir, uniqueFileName), FileMode.Create), cancellationToken);
        OrderDeliveryDocument document = await SaveFilePathToDb(uniqueFileName, filePath, model.ShopOrderId);
    }

    [HttpGet]
    [AbpMvcAuthorize(AppPermissions.Hsu_OrderManagement_Documents_Download)]
    public async Task<IActionResult> DownloadFiles(int orderId)
    {

        List<OrderDeliveryDocument> documents = await _deliveryDocumentsManager.GetDocuments(orderId);
        
        byte[] bytes;
        using (MemoryStream memoryStream = new MemoryStream())
        {
            using (ZipArchive zipArchive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
            {
                foreach (OrderDeliveryDocument document in documents)
                {
                    string filePath = _deliveryDocumentsManager.GetFullFilePath(document.FilePath);

                    if (!System.IO.File.Exists(filePath))
                    {
                        throw new UserFriendlyException(HttpStatusCode.NotFound.ToString(), L("Error.ProductFile.NotFound"));
                    }

                    zipArchive.CreateEntryFromFile(filePath, document.FileName);
                }
            }

            memoryStream.Position = 0;
            bytes = memoryStream.ToArray();
        }

        return File(bytes, "application/zip", $"someOrderName.zip");
    }

    private string GetFileDirectory(int orderId)
    {
        return Path.Combine("OrderDeliveryDocuments", $"{orderId}");
    }

    private Task<OrderDeliveryDocument> SaveFilePathToDb(string uniqueFileName, string filePath, int orderId)
    {
        OrderDeliveryDocument document = new ()
        {
            ShopOrderId = orderId,
            FileName = uniqueFileName,
            FilePath = Path.Combine(filePath, uniqueFileName)
        };
        
        return _deliveryDocumentsManager.SaveProductFile(document);
    }

    private string GetUniqueFileName(string fileName)
    {
        fileName = Path.GetFileName(fileName);
        return Path.GetFileNameWithoutExtension(fileName)
               + "_"
               + Guid.NewGuid().ToString().Substring(0, 4)
               + Path.GetExtension(fileName);
    }
}
