using System;
using System.IO;
using System.Linq;
using System.IO.Compression;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Abp.MimeTypes;
using Abp.UI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Roles;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.Products;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;
using PMHelmutSchmidtPortal.Web.Models.FileUpload;
using PMHelmutSchmidtPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;

namespace PMHelmutSchmidtPortal.Web.Controllers;

[AbpMvcAuthorize]
public class ProductFileController : PMHelmutSchmidtPortalControllerBase
{
    private readonly IProductFileManager _productFileManager;
    private readonly UserManager _userManager;
    private readonly IProductManager _productManager;
    private readonly IMimeTypeMap _mimeTypeMap;

    public ProductFileController(
        IProductFileManager productFileManager,
        UserManager userManager,
        IProductManager productManager,
        IMimeTypeMap mimeTypeMap)
    {
        _productFileManager = productFileManager;
        _userManager = userManager;
        _productManager = productManager;
        _mimeTypeMap = mimeTypeMap;
    }

    [HttpPost]
    [AbpMvcAuthorize(AppPermissions.Hsu_Product_Files_Upload)]
    public async Task<ProductFileDto> UploadFile(FileUploadModel model, CancellationToken cancellationToken)
    {
        if (!await ValidateProduct(model.ProductId))
        {
            throw new UserFriendlyException(StatusCodes.Status403Forbidden, L("Error.ProductFile.NotAllowed"));
        }

        IFormFile file = Request.Form.Files[0];

        string uniqueFileName = GetUniqueFileName(file.FileName);
        string filePath = GetFileDirectory(model);
        string dir = _productFileManager.GetFullFilePath(filePath);

        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }

        await file.CopyToAsync(new FileStream(Path.Combine(dir, uniqueFileName), FileMode.Create), cancellationToken);
        ProductFile productFile = await SaveFilePathToDb(uniqueFileName, filePath, model);

        return ObjectMapper.Map<ProductFileDto>(productFile);
    }

    [HttpGet]
    [AbpMvcAuthorize(AppPermissions.Hsu_Product_Files_Download)]
    public async Task<IActionResult> DownloadFile(int fileId)
    {
        ProductFile productFile = await _productFileManager.GetFileInfo(fileId);

        if (!await ValidateProduct(productFile.ProductId))
        {
            throw new UserFriendlyException(StatusCodes.Status403Forbidden, L("Error.ProductFile.NotAllowed"));
        }

        string filePath = _productFileManager.GetFullFilePath(productFile.FilePath);

        if (!System.IO.File.Exists(filePath))
        {
            throw new UserFriendlyException(HttpStatusCode.NotFound.ToString(), L("Error.ProductFile.NotFound"));
        }

        byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
        return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, productFile.FileName);
    }

    [HttpGet]
    [AbpMvcAuthorize(AppPermissions.Hsu_Product_Files_Download)]
    public async Task<IActionResult> DownloadProductFiles(int productId)
    {
        if (!await ValidateProduct(productId))
        {
            throw new UserFriendlyException(StatusCodes.Status403Forbidden, L("Error.ProductFile.NotAllowed"));
        }

        Product product = await _productManager.GetProduct(productId).IncludeProductFiles().SingleOrDefaultAsync();

        byte[] bytes;
        using (MemoryStream memoryStream = new MemoryStream())
        {
            using (ZipArchive zipArchive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
            {
                foreach (ProductFile file in product.ProductFiles)
                {
                    string filePath = _productFileManager.GetFullFilePath(file.FilePath);

                    if (!System.IO.File.Exists(filePath))
                    {
                        throw new UserFriendlyException(HttpStatusCode.NotFound.ToString(), L("Error.ProductFile.NotFound"));
                    }

                    zipArchive.CreateEntryFromFile(filePath, file.FileName);
                }
            }

            memoryStream.Position = 0;
            bytes = memoryStream.ToArray();
        }

        return File(bytes, "application/zip", $"{product.ProductNumber}_{product.Name}.zip");
    }


    [HttpDelete]
    [AbpMvcAuthorize(AppPermissions.Hsu_Product_Files_Delete)]
    public async Task<IActionResult> DeleteFile(int fileId)
    {
        ProductFile productFile = await _productFileManager.GetFileInfo(fileId);

        if (!await ValidateProduct(productFile.ProductId))
        {
            throw new UserFriendlyException(StatusCodes.Status403Forbidden, L("Error.ProductFile.NotAllowed"));
        }

        string filePath = _productFileManager.GetFullFilePath(productFile.FilePath);

        try
        {
            await _productFileManager.RemoveFile(productFile.Id);
            System.IO.File.Delete(filePath);
            
            return Ok(new { message = L("Error.ProductFile.FileRemoved") });
        }
        catch (Exception ex)
        {
            throw ex.ToUserFriendlyException(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetProductImage(int fileId)
    {
        ProductFile productFile = await _productFileManager.GetFileInfo(fileId);

        string mimeType = _mimeTypeMap.GetMimeType(productFile.FileName);
        string filePath = _productFileManager.GetFullFilePath(productFile.FilePath);

        if (!await ValidateProduct(productFile.ProductId) ||
            !_productFileManager.IsSupportedImageType(mimeType) ||
            !System.IO.File.Exists(filePath))
        {
            throw new UserFriendlyException(StatusCodes.Status404NotFound, L("Error.ProductFile.NotFound"));
        }

        byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
        return File(fileBytes, mimeType);
    }

    private async Task<bool> ValidateProduct(int productId)
    {
        if (!AbpSession.UserId.HasValue)
        {
            return false;
        }

        Product product = await _productManager.GetProduct(productId).IncludeProducers()
            .SingleOrDefaultAsync();

        if (product == null)
        {
            return false;
        }

        User currentUser = await _userManager.GetUserByIdAsync(AbpSession.UserId.Value);

        if (await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.Developer) && product.AssignedDeveloper != currentUser)
        {
            return false;
        }

        if (await _userManager.IsInRoleAsync(currentUser, StaticRoleNames.Host.Producer) && 
            product.ProductionDetails.First().AssignedProducers.All(pp => pp.AssignedProducerId != currentUser.Id))
        {
            return false;
        }


        return true;
    }

    private string GetFileDirectory(FileUploadModel model)
    {
        return Path.Combine("ProductFiles", $"{model.ProductId}", $"{model.FileCategory.ToString()}");
    }

    private Task<ProductFile> SaveFilePathToDb(string uniqueFileName, string filePath, FileUploadModel model)
    {
        ProductFile productFile = new ()
        {
            FileName = uniqueFileName,
            FilePath = Path.Combine(filePath, uniqueFileName),
            FileCategory = model.FileCategory,
            ProductId = model.ProductId
        };
        return _productFileManager.SaveProductFile(productFile);
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