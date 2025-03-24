using System.Text;
using System.Threading.Tasks;
using System.Web;
using Abp.Extensions;
using Abp.Net.Mail;
using Abp.Runtime.Security;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Net.Emailing;
using PMHelmutSchmidtPortal.Url;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public class RegistrationEmailer : BaseEmailer, IRegistrationEmailer
{
    private readonly IWebUrlService _webUrlService;

    public RegistrationEmailer(IEmailTemplateProvider emailTemplateProvider, IEmailSender emailSender, IWebUrlService webUrlService) 
        : base(emailTemplateProvider,emailSender)
    {
        _webUrlService = webUrlService;
    }

    public async Task SendInvitation(User user, string userRole)
    {
        StringBuilder emailTemplate = GetTemplateWithTitle(
            L("User.Invitation.Title"),
            L("User.Invitation.ButtonText"),
            GenerateInviteLink(user, userRole)
        );

        StringBuilder mailMessage = new();

        mailMessage.AppendLine(L("User.Invitation.Title") + "<br /><br />");
        mailMessage.AppendLine(L("User.Invitation.BodyText") + "<br /><br />");

        await ReplaceBodyAndSendAsync(user.EmailAddress, L("User.Invitation.Title"), emailTemplate,
            mailMessage);
    }

    private string GenerateInviteLink(User user, string userRole)
    {
        string inviteCode = HttpUtility.UrlEncode(SimpleStringCipher.Instance.Encrypt($"userId={user.Id}&inviteCode={user.InviteCode}"));
        return _webUrlService.GetSiteRootAddress().EnsureEndsWith('/') +
               $"registration/?userRole={userRole}&verificationCode={inviteCode}";
    }
}