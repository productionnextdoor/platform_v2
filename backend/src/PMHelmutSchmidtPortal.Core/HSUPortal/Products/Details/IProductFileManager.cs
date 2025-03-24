using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.ProductFilesStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IProductFileManager : IDomainService
{
    Task<ProductFilesStepOutput> GetProductFilesStep(Product product);
    
    Task<ProductFile> SaveProductFile(ProductFile productFile);

    Task<ProductFile> GetFileInfo(int fileId);

    string GetFullFilePath(string filePath);

    Task RemoveFile(int fileId);

    bool IsSupportedImageType(string mimeType);

    Task<bool> IsAllFilesExist(int productId);

    Task<IReadOnlyCollection<ProductFile>> RemoveNonExistentFilesEntries(int? productId = null);
}