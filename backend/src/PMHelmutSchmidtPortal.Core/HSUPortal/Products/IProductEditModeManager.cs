using System.Threading.Tasks;
using Abp.Domain.Services;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public interface IProductEditModeManager : IDomainService
{
    Task<int> EnableEditMode(int productId);
    Task CancelEditMode(int productId);
    Task FinalizeEditMode(int productId);
}