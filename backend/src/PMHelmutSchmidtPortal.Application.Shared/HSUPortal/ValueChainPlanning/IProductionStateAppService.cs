using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionState;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning
{
    public interface IProductionStateAppService : IApplicationService
    {
        Task<StateLockStatusDto> GetStateLockStatus(StateLockStatusInput input);
        Task<StateLockStatusDto> ResetStateLockStatus(StateLockStatusInput input);
        Task CancelStateLock(StateLockStatusInput input);
        Task CreateNewState(ProductionStateCreateInput input);
        Task EditState(DeleteOrEditStateInput input);
        Task DeleteState(DeleteOrEditStateInput input);
        Task<List<string>> GetStateNames(string filter);
    }
}