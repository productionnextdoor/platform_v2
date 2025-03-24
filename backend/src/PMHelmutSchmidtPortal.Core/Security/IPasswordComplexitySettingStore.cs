using System.Threading.Tasks;

namespace PMHelmutSchmidtPortal.Security
{
    public interface IPasswordComplexitySettingStore
    {
        Task<PasswordComplexitySetting> GetSettingsAsync();
    }
}
