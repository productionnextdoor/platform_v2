using Abp.Modules;
using Abp.Reflection.Extensions;

namespace PMHelmutSchmidtPortal
{
    [DependsOn(typeof(PMHelmutSchmidtPortalCoreSharedModule))]
    public class PMHelmutSchmidtPortalApplicationSharedModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PMHelmutSchmidtPortalApplicationSharedModule).GetAssembly());
        }
    }
}