using System.Threading.Tasks;

namespace PMHelmutSchmidtPortal.Net.Emailing
{
    public interface IEmailSettingsChecker
    {
        bool EmailSettingsValid();

        Task<bool> EmailSettingsValidAsync();
    }
}