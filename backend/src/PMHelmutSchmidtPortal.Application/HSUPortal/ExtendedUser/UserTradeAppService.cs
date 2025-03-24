using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser;

public class UserTradeAppService: HsuBaseAppService, IUserTradeAppService
{
    private readonly IRepository<TradeType> _tradeTypeRepository;

    public UserTradeAppService(IRepository<TradeType> tradeTypeRepository)
    {
        _tradeTypeRepository = tradeTypeRepository;
    }

    public async Task<List<TradeTypeDto>> GetTradeTypes()
    {
        return ObjectMapper.Map<List<TradeTypeDto>>(await _tradeTypeRepository.GetAll().ToListAsync());
    }
}