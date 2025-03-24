using System.Threading.Tasks;
using Abp.Application.Services;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser
{
    public interface IUserRegistrationAppService : IApplicationService
    {
        Task SendDeveloperInvitation(DeveloperInviteDto input);

        Task<DeveloperProfile> GetDeveloperForRegistration(string verificationCode);
        
        Task RegisterDeveloper(DevelopersRegistrationInput input);
        
        Task SendProducerInvitation(ProducerInviteDto input);

        Task<ProducerRegistrationOutput> GetProducerForRegistration(string verificationCode);
        
        Task RegisterProducer(ProducerRegistrationInput input);
    }
}