using Abp.Modules;
using Abp.Reflection.Extensions;
using Castle.Windsor.MsDependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using PMHelmutSchmidtPortal.Configure;
using PMHelmutSchmidtPortal.Startup;
using PMHelmutSchmidtPortal.Test.Base;

namespace PMHelmutSchmidtPortal.GraphQL.Tests
{
    [DependsOn(
        typeof(PMHelmutSchmidtPortalGraphQLModule),
        typeof(PMHelmutSchmidtPortalTestBaseModule))]
    public class PMHelmutSchmidtPortalGraphQLTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            IServiceCollection services = new ServiceCollection();
            
            services.AddAndConfigureGraphQL();

            WindsorRegistrationHelper.CreateServiceProvider(IocManager.IocContainer, services);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PMHelmutSchmidtPortalGraphQLTestModule).GetAssembly());
        }
    }
}