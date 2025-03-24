using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public interface IUserProfileManager : IDomainService
{
    Task<User> UpdateUserBaseProfile(ProfileBase input, User user);

    Task<UserAddress> GetDevelopersAddress(long developerId);
    
    Task<FullDeveloperProfileOutput> GetFullDeveloperProfile(long developerId);
    
    Task<UserAddress> UpdateDevelopersProfile(long developerId, DeveloperProfile input);
    
    Task<FullDeveloperProfileOutput> UpdateFullDevelopersProfile(User developer, FullDeveloperProfileInput input);

    Task<ProducerProfileOutput> GetProducerProfile(long producerId);
    
    Task<FullProducerProfileOutput> GetFullProducerProfile(long producerId);

    Task<FullProducerProfileOutput> UpdateProducersProfileWithRating(long producerId, FullProducerProfileInput input);

    Task<ProducerProfileOutput> UpdateProducersProfile(long producerId, ProducerProfile input);

    Task<UserAddress> UpdateProducerAddress(long producerId, IProducerAddress userAddress, string adminNote = null);

    Task<UserAddress> UpdateDeveloperAddress(long producerId, IDeveloperAddress userAddress, string companyName = "", string adminNote = null);

    Task<ProducerInfo> UpdateProducerInfo(long producerId, IProducerInfo producerInfoInput, int? tradeId = null, ICollection<ProducerRatingDto> producerRatings = null);

    Task DeleteInvitedUser(long userId);
}