using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using PMHelmutSchmidtPortal.EntityFrameworkCore;

namespace PMHelmutSchmidtPortal.HealthChecks
{
    public class PMHelmutSchmidtPortalDbContextHealthCheck : IHealthCheck
    {
        private readonly DatabaseCheckHelper _checkHelper;

        public PMHelmutSchmidtPortalDbContextHealthCheck(DatabaseCheckHelper checkHelper)
        {
            _checkHelper = checkHelper;
        }

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
        {
            if (_checkHelper.Exist("db"))
            {
                return Task.FromResult(HealthCheckResult.Healthy("PMHelmutSchmidtPortalDbContext connected to database."));
            }

            return Task.FromResult(HealthCheckResult.Unhealthy("PMHelmutSchmidtPortalDbContext could not connect to database"));
        }
    }
}
