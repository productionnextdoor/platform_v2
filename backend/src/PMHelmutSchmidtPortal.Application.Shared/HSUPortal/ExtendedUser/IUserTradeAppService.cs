using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser
{
    public interface IUserTradeAppService : IApplicationService
    {
        Task<List<TradeTypeDto>> GetTradeTypes();
    }
}