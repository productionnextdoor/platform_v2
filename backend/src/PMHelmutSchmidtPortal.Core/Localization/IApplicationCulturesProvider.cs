using System.Globalization;

namespace PMHelmutSchmidtPortal.Localization
{
    public interface IApplicationCulturesProvider
    {
        CultureInfo[] GetAllCultures();
    }
}