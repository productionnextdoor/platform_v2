using System;
using System.Text;
using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Dependency;
using Abp.Extensions;
using Abp.Net.Mail;
using PMHelmutSchmidtPortal.Chat;
using System.Net.Mail;
using System.Web;
using Abp.Runtime.Security;
using Abp.Timing;
using PMHelmutSchmidtPortal.Authorization.Users;
using PMHelmutSchmidtPortal.Configuration;
using PMHelmutSchmidtPortal.Net.Emailing;

namespace PMHelmutSchmidtPortal.HSUPortal.Users;

public class UserEmailDecorator : PMHelmutSchmidtPortalServiceBase, IUserEmailer, ITransientDependency
{
    private readonly UserEmailer _userEmailer;
    private readonly IEmailSender _emailSender;
    private readonly ISettingManager _settingManager;
    private readonly IEmailTemplateProvider _emailTemplateProvider;

    public UserEmailDecorator(
        UserEmailer userEmailer,
        IEmailSender emailSender,
        ISettingManager settingManager,
        IEmailTemplateProvider emailTemplateProvider
    )
    {
        LocalizationSourceName = PMHelmutSchmidtPortalConsts.HsuClientLocalizationSourceName;
        _userEmailer = userEmailer;
        _emailSender = emailSender;
        _settingManager = settingManager;
        _emailTemplateProvider = emailTemplateProvider;
    }

    public Task SendEmailActivationLinkAsync(User user, string link, string plainPassword = null)
    {
        return _userEmailer.SendEmailActivationLinkAsync(user, link, plainPassword);
    }

    public async Task SendPasswordResetLinkAsync(User user, string link = null)
    {
        int expirationHours = await _settingManager.GetSettingValueAsync<int>(
            AppSettings.UserManagement.Password.PasswordResetCodeExpirationHours
        );

        if (user.PasswordResetCode.IsNullOrEmpty())
        {
            throw new Exception("PasswordResetCode should be set in order to send password reset link.");
        }

        StringBuilder emailTemplate = GetTemplateWithTitle(
            L("User.PasswordReset.Title"),
            L("User.PasswordReset.ButtonText")
        );

        StringBuilder mailMessage = new();

        mailMessage.AppendLine(L("User.PasswordReset.Introduction") + " " + user.Name + " " + user.Surname + "<br /><br />");

        mailMessage.AppendLine(L("User.PasswordReset.BodyText") + "<br /><br />");

        mailMessage.AppendLine("<b>" + L("User.PasswordReset.NameSurname") + "</b>: " + user.Name + " " + user.Surname + "<br />");
        mailMessage.AppendLine("<b>" + L("User.PasswordReset.Username") + "</b>: " + user.UserName + "<br />");
        mailMessage.AppendLine("<b>" + L("User.PasswordReset.ResetCode") + "</b>: " + user.PasswordResetCode + "<br /><br />");

        mailMessage.AppendLine(L("User.PasswordReset.ClickTheBtn") + "<br />");

        if (!link.IsNullOrEmpty())
        {
            link = link.Replace("{userId}", user.Id.ToString());
            link = link.Replace("{resetCode}", Uri.EscapeDataString(user.PasswordResetCode));

            string expireDate = Uri.EscapeDataString(Clock.Now.AddHours(expirationHours).ToString(PMHelmutSchmidtPortalConsts.DateTimeOffsetFormat));

            link = link.Replace("{expireDate}", expireDate);

            if (user.TenantId.HasValue)
            {
                link = link.Replace("{tenantId}", user.TenantId.ToString());
            }

            link = EncryptQueryParameters(link);
            emailTemplate.Replace("{BUTTON_HREF}", link);
        }

        await ReplaceBodyAndSendAsync(user.EmailAddress, L("User.PasswordReset.Title"), emailTemplate,
            mailMessage);
    }

    public Task TryToSendChatMessageMail(User user, string senderUsername, string senderTenancyName, ChatMessage chatMessage)
    {
        return _userEmailer.TryToSendChatMessageMail(user, senderUsername, senderTenancyName, chatMessage);
    }

    private StringBuilder GetTemplateWithTitle(string title, string buttonText)
    {
        StringBuilder emailTemplate = new(_emailTemplateProvider.GetDefaultTemplate(null));
        emailTemplate.Replace("{EMAIL_TITLE}", title);
        emailTemplate.Replace("{BUTTON_TEXT}", buttonText);
        return emailTemplate;
    }

    private async Task ReplaceBodyAndSendAsync(string emailAddress, string subject, StringBuilder emailTemplate,
        StringBuilder mailMessage)
    {
        emailTemplate.Replace("{EMAIL_BODY}", mailMessage.ToString());
        await _emailSender.SendAsync(new MailMessage
        {
            To = { emailAddress },
            Subject = subject,
            Body = emailTemplate.ToString(),
            IsBodyHtml = true
        });
    }

    private string EncryptQueryParameters(string link, string encryptedParameterName = "c")
    {
        if (!link.Contains("?"))
        {
            return link;
        }

        string basePath = link.Substring(0, link.IndexOf('?'));
        string query = link.Substring(link.IndexOf('?')).TrimStart('?');

        return basePath + "?" + encryptedParameterName + "=" +
               HttpUtility.UrlEncode(SimpleStringCipher.Instance.Encrypt(query));
    }
}