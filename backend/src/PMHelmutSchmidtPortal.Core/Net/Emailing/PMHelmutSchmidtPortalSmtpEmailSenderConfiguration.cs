using Abp.Configuration;
using Abp.Net.Mail;
using Abp.Net.Mail.Smtp;
using Abp.Runtime.Security;

namespace PMHelmutSchmidtPortal.Net.Emailing
{
    public class PMHelmutSchmidtPortalSmtpEmailSenderConfiguration : SmtpEmailSenderConfiguration
    {
        public PMHelmutSchmidtPortalSmtpEmailSenderConfiguration(ISettingManager settingManager) : base(settingManager)
        {

        }

        public override string Password => SimpleStringCipher.Instance.Decrypt(GetNotEmptySettingValue(EmailSettingNames.Smtp.Password));
    }
}