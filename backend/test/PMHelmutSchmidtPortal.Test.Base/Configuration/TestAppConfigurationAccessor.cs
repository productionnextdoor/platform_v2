using Abp.Dependency;
using Abp.Reflection.Extensions;
using Microsoft.Extensions.Configuration;
using PMHelmutSchmidtPortal.Configuration;

namespace PMHelmutSchmidtPortal.Test.Base.Configuration
{
    public class TestAppConfigurationAccessor : IAppConfigurationAccessor, ISingletonDependency
    {
        public IConfigurationRoot Configuration { get; }

        public TestAppConfigurationAccessor()
        {
            Configuration = AppConfigurations.Get(
                typeof(PMHelmutSchmidtPortalTestBaseModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }
    }
}
