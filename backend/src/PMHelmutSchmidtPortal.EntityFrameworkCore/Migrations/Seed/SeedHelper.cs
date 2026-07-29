using System;
using System.Transactions;
using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.EntityFrameworkCore.Uow;
using Abp.MultiTenancy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using PMHelmutSchmidtPortal.EntityFrameworkCore;
using PMHelmutSchmidtPortal.Migrations.Seed.Host;
using PMHelmutSchmidtPortal.Migrations.Seed.HSU;
using PMHelmutSchmidtPortal.Migrations.Seed.HSU.DefaultCreators;
using PMHelmutSchmidtPortal.Migrations.Seed.Tenants;

namespace PMHelmutSchmidtPortal.Migrations.Seed
{
    public static class SeedHelper
    {
        public static void SeedHostDb(IIocResolver iocResolver)
        {
            WithDbContext<PMHelmutSchmidtPortalDbContext>(iocResolver, SeedHostDb);
        }

        public static void SeedHostDb(PMHelmutSchmidtPortalDbContext context)
        {
            context.SuppressAutoSetTenantId = true;

            //Host seed
            new InitialHostDbBuilder(context).Create();

            //Default tenant seed (in host database).
            new DefaultTenantBuilder(context).Create();
            new TenantRoleAndUserBuilder(context, 1).Create();
            
            // HSU Specific Entities
            new DefaultPortalAdminCreator(context).Create();
            new DefaultMaterialCreator(context).Create();
            new DefaultRatingTypesCreator(context).Create();
            new DefaultWorkTypeCreator(context).Create();
            new DefaultTaxesAndRoyaltiesCreator(context).Create();
            
            IHostEnvironment env = IocManager.Instance.ResolveAsDisposable<IHostEnvironment>().Object;
            if (!env.IsProduction())
            {
                new InitialHsuDbBuilder(context).Create();
            }
        }

        private static void WithDbContext<TDbContext>(IIocResolver iocResolver, Action<TDbContext> contextAction)
            where TDbContext : DbContext
        {
            using (var uowManager = iocResolver.ResolveAsDisposable<IUnitOfWorkManager>())
            {
                using (var uow = uowManager.Object.Begin(TransactionScopeOption.Suppress))
                {
                    var context = uowManager.Object.Current.GetDbContext<TDbContext>(MultiTenancySides.Host);

                    contextAction(context);

                    uow.Complete();
                }
            }
        }
    }
}
