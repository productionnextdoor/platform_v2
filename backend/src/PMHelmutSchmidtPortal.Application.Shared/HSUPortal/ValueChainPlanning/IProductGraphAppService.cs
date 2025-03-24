using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning
{
    public interface IProductGraphAppService : IApplicationService
    {
        Task<ProductGraphDataDto> GetProductGraphData(int productionDetailsId);
    }
}