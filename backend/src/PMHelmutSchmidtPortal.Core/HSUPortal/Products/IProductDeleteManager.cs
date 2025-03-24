using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductDeleteManager: IDomainService
{
    Task<bool> DeleteProductById(int id);
    
    Task<List<int>> DeleteProductsById(List<int> ids);
    
}