using Microsoft.Extensions.Configuration;

namespace PMHelmutSchmidtPortal.Configuration
{
    public interface IAppConfigurationAccessor
    {
        IConfigurationRoot Configuration { get; }
    }
}
