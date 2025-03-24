using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Abp.AspNetZeroCore.Net;
using Abp.EntityFrameworkCore.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class ProductFileManager : HSUDomainBaseService, IProductFileManager
{
    private readonly IProductFilesRepository _productFileRepository;
    private readonly IHostEnvironment _env;

    private static readonly List<string> SupportedImageTypes = new()
    {
        MimeTypeNames.ImageGif,
        MimeTypeNames.ImageJpeg, 
        MimeTypeNames.ImagePng, 
        MimeTypeNames.ImageSvgXml 
    };

    public ProductFileManager(IProductFilesRepository productFileRepository, IHostEnvironment env)
    {
        _productFileRepository = productFileRepository;
        _env = env;
    }

    public async Task<ProductFilesStepOutput> GetProductFilesStep(Product product)
    {
        List<ProductFile> productFiles = await _productFileRepository.GetProductFiles(product.Id).ToListAsync();
        ProductFilesStepOutput productFilesOutput = ObjectMapper.Map<ProductFilesStepOutput>(product);
        productFilesOutput.ProductFileDtos = ObjectMapper.Map<List<ProductFileDto>>(productFiles);
        return productFilesOutput;
    }

    public async Task<ProductFile> SaveProductFile(ProductFile productFile)
    {
        await _productFileRepository.InsertAndGetIdAsync(productFile);
        await CurrentUnitOfWork.SaveChangesAsync();
        return productFile;
    }

    public async Task<ProductFile> GetFileInfo(int fileId)
    {
        return await _productFileRepository.GetAsync(fileId);
    }

    public async Task RemoveFile(int fileId)
    {
        await _productFileRepository.DeleteAsync(fileId);
    }

    public string GetFullFilePath(string filePath)
    {
        return Path.Combine(GetBaseUploadPath(), filePath);
    }

    public bool IsSupportedImageType(string mimeType)
    {
        return SupportedImageTypes.Contains(mimeType);
    }

    public async Task<bool> IsAllFilesExist(int productId)
    {
        List<ProductFile> productFiles = await _productFileRepository.GetProductFiles(productId).ToListAsync();

        IEnumerable<ProductFileCategory> categoriesToCheck = Enum.GetValues(typeof(ProductFileCategory))
            .Cast<ProductFileCategory>()
            .Where(fc => fc != ProductFileCategory.Miscellaneous);

        return categoriesToCheck.Select(fileCategory =>
                productFiles.FindAll(cf => cf.FileCategory == fileCategory))
            .All(filesForCategory =>
                filesForCategory.Count != 0 &&
                filesForCategory.All(productFile => File.Exists(GetFullFilePath(productFile.FilePath))));
    }

    private string GetBaseUploadPath()
    {
        return Path.Combine(_env.ContentRootPath, Environment.GetEnvironmentVariable(PMHelmutSchmidtPortalConsts.FileUploadPathEnvVariableName) ?? "");
    }

    public async Task<IReadOnlyCollection<ProductFile>> RemoveNonExistentFilesEntries(int? productId = null)
    {
        IEnumerable<ProductFile> productFiles = await (
            productId == null
                ? _productFileRepository.GetAll()
                : _productFileRepository.GetProductFiles(productId.Value))
            .ToListAsync();
        
        IReadOnlyCollection<ProductFile> lostFiles = productFiles.Where(file => !File.Exists(GetFullFilePath(file.FilePath))).ToList();
        
        _productFileRepository.RemoveRange(lostFiles);
        return lostFiles;
    }
}