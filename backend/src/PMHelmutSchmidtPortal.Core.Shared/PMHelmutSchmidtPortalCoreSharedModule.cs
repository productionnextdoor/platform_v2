using Abp.Modules;
using Abp.Reflection.Extensions;

namespace PMHelmutSchmidtPortal
{
    public class PMHelmutSchmidtPortalCoreSharedModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PMHelmutSchmidtPortalCoreSharedModule).GetAssembly());
        }
    }
}