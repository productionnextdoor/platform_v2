using Abp.Configuration;
using Abp.Net.Mail.Smtp;

namespace PMHelmutSchmidtPortal.Net.Emailing
{
    /**
     * This class can be used to configure and send emails using a local mailHog instance as mail server.
     *
     * Simply set `USE_LOCAL_MAILHOG` as a build constant to use this configuration.
     *   Right click on PMHelmutSchmidtPortal.Core project in Solution Explorer and select Properties.
     *   Go to the debug configuration and add `USE_LOCAL_MAILHOG` to the build constants 'Define constants'.
     */
    public class LocalMailHocSmtpEmailServerConfiguration : SmtpEmailSenderConfiguration
    {
        public LocalMailHocSmtpEmailServerConfiguration(ISettingManager settingManager) 
            : base(settingManager){}

        public override string Host { get; } = "localhost";
        public override int Port { get; } = 1025;
        public override string UserName { get; } = "";
        public override string Password { get; } = "";
        public override string Domain { get; } = "";
        public override bool EnableSsl { get; } = false;
        public override bool UseDefaultCredentials { get; } = true;
        public override string DefaultFromAddress { get; } = "hsulocal@pmagentur.com";
        public override string DefaultFromDisplayName { get; } = "Local PMHelmutSchmidtPortal";
    }
}