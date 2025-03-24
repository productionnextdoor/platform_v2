using Abp.Modules;
using Abp.Reflection.Extensions;

namespace PMHelmutSchmidtPortal
{
    public class PMHelmutSchmidtPortalClientModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PMHelmutSchmidtPortalClientModule).GetAssembly());
        }
    }
}
