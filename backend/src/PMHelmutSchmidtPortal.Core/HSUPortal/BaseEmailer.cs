using System.Collections.Generic;
using System.Globalization;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Abp.Net.Mail;
using PMHelmutSchmidtPortal.Net.Emailing;

namespace PMHelmutSchmidtPortal.HSUPortal;

public abstract class BaseEmailer : HSUDomainBaseService
{
    private readonly IEmailTemplateProvider _emailTemplateProvider;
    private readonly IEmailSender _emailSender;

    protected BaseEmailer(IEmailTemplateProvider emailTemplateProvider, IEmailSender emailSender)
    {
        _emailTemplateProvider = emailTemplateProvider;
        _emailSender = emailSender;
    }

    protected StringBuilder GetTemplateWithTitle(string title, string buttonText, string link)
    {
        StringBuilder emailTemplate = new(_emailTemplateProvider.GetDefaultTemplate(null));
        emailTemplate.Replace("{EMAIL_TITLE}", title);
        emailTemplate.Replace("{BUTTON_TEXT}", buttonText);
        emailTemplate.Replace("{BUTTON_HREF}", link);
        emailTemplate.Replace("{TAC_TITLE}", L("TermsAndConditions.Title"));
        emailTemplate.Replace("{PRIVACY_TITLE}", L("PrivacyPolicy.Title"));
        return emailTemplate;
    }

    protected async Task ReplaceBodyAndSendAsync(string emailAddress, string subject, StringBuilder emailTemplate,
        StringBuilder mailMessage)
    {
        await ReplaceBodyAndSendAsync(new List<string> { emailAddress }, subject, emailTemplate, mailMessage);
    }
    
    protected async Task ReplaceBodyAndSendAsync(List<string> recipientAddresses, string subject, StringBuilder emailTemplate,
        StringBuilder mailMessage, List<string> blindCarbonCopyAddresses = null)
    {
        emailTemplate.Replace("{EMAIL_BODY}", mailMessage.ToString());

        MailMessage message = new MailMessage
        {
            Subject = subject,
            Body = emailTemplate.ToString(),
            IsBodyHtml = true
        };
        recipientAddresses?.ForEach(recipient => message.To.Add(recipient));
        blindCarbonCopyAddresses?.ForEach(recipient => message.Bcc.Add(recipient));
        
        await _emailSender.SendAsync(message);
    }

    protected override string L(string name)
    {
        return L(name, CultureInfo.GetCultureInfoByIetfLanguageTag("De"));
    }

    protected override string L(string name, params object[] args)
    {
        return L(name,CultureInfo.GetCultureInfoByIetfLanguageTag("De"), args );
    }
}