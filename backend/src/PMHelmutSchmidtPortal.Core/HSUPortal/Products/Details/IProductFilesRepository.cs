using System.Linq;
using Abp.Domain.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public interface IProductFilesRepository : IRepository<ProductFile, int>
{
    IQueryable<ProductFile> GetProductFiles(int productId);
}