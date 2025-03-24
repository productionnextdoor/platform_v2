using Abp.AutoMapper;
using Abp.Configuration.Startup;
using Abp.Modules;
using Abp.Reflection.Extensions;
using PMHelmutSchmidtPortal.ApiClient;
using PMHelmutSchmidtPortal.Mobile.MAUI.Core.ApiClient;

namespace PMHelmutSchmidtPortal
{
    [DependsOn(typeof(PMHelmutSchmidtPortalClientModule), typeof(AbpAutoMapperModule))]

    public class PMHelmutSchmidtPortalMobileMAUIModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Localization.IsEnabled = false;
            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;

            Configuration.ReplaceService<IApplicationContext, MAUIApplicationContext>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PMHelmutSchmidtPortalMobileMAUIModule).GetAssembly());
        }
    }
}