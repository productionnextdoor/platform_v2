using Abp.Domain.Uow;
using Abp.EntityFrameworkCore;
using Abp.MultiTenancy;
using Abp.Zero.EntityFrameworkCore;

namespace PMHelmutSchmidtPortal.EntityFrameworkCore
{
    public class AbpZeroDbMigrator : AbpZeroDbMigrator<PMHelmutSchmidtPortalDbContext>
    {
        public AbpZeroDbMigrator(
            IUnitOfWorkManager unitOfWorkManager,
            IDbPerTenantConnectionStringResolver connectionStringResolver,
            IDbContextResolver dbContextResolver) :
            base(
                unitOfWorkManager,
                connectionStringResolver,
                dbContextResolver)
        {

        }
    }
}
