using System.Threading.Tasks;
using Abp.Domain.Services;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public interface IRegistrationManager: IDomainService
{
    Task SendDeveloperInvitation(DeveloperInviteDto input);

    Task RegisterDeveloper(DevelopersRegistrationInput input, User developer, int? tenantId = null);
    
    Task SendProducerInvitation(ProducerInviteDto input);
    
    Task<ProducerRegistrationOutput> GetProducerForRegistration(User producer);
    
    Task RegisterProducer(ProducerRegistrationInput input, User producer, int? abpSessionTenantId);
}