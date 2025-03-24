using Abp.Domain.Services;

namespace PMHelmutSchmidtPortal
{
    public abstract class PMHelmutSchmidtPortalDomainServiceBase : DomainService
    {
        /* Add your common members for all your domain services. */

        protected PMHelmutSchmidtPortalDomainServiceBase()
        {
            LocalizationSourceName = PMHelmutSchmidtPortalConsts.LocalizationSourceName;
        }
    }
}
