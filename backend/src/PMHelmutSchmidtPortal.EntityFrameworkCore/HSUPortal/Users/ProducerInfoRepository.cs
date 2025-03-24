using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.EntityFrameworkCore.Repositories;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public class ProducerInfoRepository: PmHelmutSchmidtPortalRepositoryBase<ProducerInfo, int>, IProducerInfoRepository
{
    public ProducerInfoRepository(IDbContextProvider<PMHelmutSchmidtPortalDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public IIncludableQueryable<ProducerInfo, RatingType> GetProducerInfoWithTradesAndRatings()
    {
        return GetAll()
            .Include(pi => pi.TradeType)
            .Include(pi => pi.ProducerRatings)
            .ThenInclude(pi => pi.RatingType);
    }
    
}