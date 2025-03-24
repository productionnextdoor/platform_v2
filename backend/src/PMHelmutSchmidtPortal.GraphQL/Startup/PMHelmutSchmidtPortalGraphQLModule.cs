using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace PMHelmutSchmidtPortal.Startup
{
    [DependsOn(typeof(PMHelmutSchmidtPortalCoreModule))]
    public class PMHelmutSchmidtPortalGraphQLModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PMHelmutSchmidtPortalGraphQLModule).GetAssembly());
        }

        public override void PreInitialize()
        {
            base.PreInitialize();

            //Adding custom AutoMapper configuration
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }
    }
}