using Abp.Auditing;
using PMHelmutSchmidtPortal.Configuration.Dto;

namespace PMHelmutSchmidtPortal.Configuration.Tenants.Dto
{
    public class TenantEmailSettingsEditDto : EmailSettingsEditDto
    {
        public bool UseHostDefaultEmailSettings { get; set; }
    }
}