using Abp.Events.Bus;

namespace PMHelmutSchmidtPortal.MultiTenancy
{
    public class RecurringPaymentsEnabledEventData : EventData
    {
        public int TenantId { get; set; }
    }
}