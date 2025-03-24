using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore.Query;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public interface IProducerInfoRepository: IRepository<ProducerInfo>
{
    IIncludableQueryable<ProducerInfo, RatingType> GetProducerInfoWithTradesAndRatings();
}