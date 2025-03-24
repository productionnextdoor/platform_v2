using Abp;
using Abp.Dependency;
using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Configuration;
using PMHelmutSchmidtPortal.EntityHistory;
using PMHelmutSchmidtPortal.Migrations.Seed;

namespace PMHelmutSchmidtPortal.EntityFrameworkCore
{
    [DependsOn(
        typeof(AbpZeroCoreEntityFrameworkCoreModule),
        typeof(PMHelmutSchmidtPortalCoreModule)
        )]
    public class PMHelmutSchmidtPortalEntityFrameworkCoreModule : AbpModule
    {
        /* Used it tests to skip DbContext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<PMHelmutSchmidtPortalDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        PMHelmutSchmidtPortalDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        PMHelmutSchmidtPortalDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }

            // Set this setting to true for enabling entity history.
            Configuration.EntityHistory.IsEnabled = false;

            // Uncomment below line to write change logs for the entities below:
            // Configuration.EntityHistory.Selectors.Add("PMHelmutSchmidtPortalEntities", EntityHistoryHelper.TrackedTypes);
            // Configuration.CustomConfigProviders.Add(new EntityHistoryConfigProvider(Configuration));
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(PMHelmutSchmidtPortalEntityFrameworkCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            var configurationAccessor = IocManager.Resolve<IAppConfigurationAccessor>();

            using (var scope = IocManager.CreateScope())
            {
                if (!SkipDbSeed && scope.Resolve<DatabaseCheckHelper>().Exist(configurationAccessor.Configuration["ConnectionStrings:Default"]))
                {
                    SeedHelper.SeedHostDb(IocManager);
                }
            }
        }
    }
}
