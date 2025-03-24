using System;
using System.Collections.Specialized;
using System.Threading.Tasks;
using System.Web;
using Abp.Authorization;
using Abp.Extensions;
using Abp.Runtime.Security;
using Abp.UI;
using PMHelmutSchmidtPortal.Authorization;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.HSUPortal.ExtendedUser.Dto;
using PMHelmutSchmidtPortal.HSUPortal.Users;

namespace PMHelmutSchmidtPortal.HSUPortal.ExtendedUser;

public class UserRegistrationAppService : HsuBaseAppService, IUserRegistrationAppService
{
    private readonly UserManagerExtended _userManager;
    private readonly IRegistrationManager _registrationManager;


    public UserRegistrationAppService(UserManagerExtended userManager, IRegistrationManager registrationManager)
    {
        _userManager = userManager;
        _registrationManager = registrationManager;
    }

    [AbpAuthorize(AppPermissions.Hsu_ExtendedUser_SendUserInvite)]
    public async Task SendDeveloperInvitation(DeveloperInviteDto input)
    {
        await _registrationManager.SendDeveloperInvitation(input);
    }

    public async Task<DeveloperProfile> GetDeveloperForRegistration(string verificationCode)
    {
        User user = await GetUser(verificationCode);

        return ObjectMapper.Map<DeveloperProfile>(user);
    }

    public async Task RegisterDeveloper(DevelopersRegistrationInput input)
    {
        User user = await GetUser(input.VerificationCode);
        await _registrationManager.RegisterDeveloper(input,user, AbpSession.TenantId);
    }

    public async Task SendProducerInvitation(ProducerInviteDto input)
    {
        await _registrationManager.SendProducerInvitation(input);
    }

    public async Task<ProducerRegistrationOutput> GetProducerForRegistration(string verificationCode)
    {
        User producer = await GetUser(verificationCode);
        return await _registrationManager.GetProducerForRegistration(producer);
    }

    public async Task RegisterProducer(ProducerRegistrationInput input)
    {
        User producer = await GetUser(input.VerificationCode);
        await _registrationManager.RegisterProducer(input,producer,AbpSession.TenantId);
    }


    private async Task<User> GetUser(string verificationCode)
    {
        if (verificationCode.IsNullOrEmpty())
        {
            throw new UserFriendlyException(L("Error.User.Invite.InviteEmpty.Title"),L("Error.User.Invite.InviteEmpty.Text"));
        }

        try
        {
            string parameters = SimpleStringCipher.Instance.Decrypt(verificationCode);
            NameValueCollection query = HttpUtility.ParseQueryString(parameters);

            User user = await _userManager.GetUserByIdAsync(Convert.ToInt32(query["userId"]));
            if (user.InviteCode != query["inviteCode"])
            {
                throw new Exception();
            }
            
            return user;
        }
        catch (Exception e)
        {
            throw new UserFriendlyException(L("Error.User.Invite.WrongInvite.Title"),L("Error.User.Invite.WrongInvite.Text"));
        }
    }
}