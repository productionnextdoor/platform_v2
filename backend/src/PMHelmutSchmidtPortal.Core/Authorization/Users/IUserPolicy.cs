using System.Threading.Tasks;
using Abp.Domain.Policies;

namespace PMHelmutSchmidtPortal.Authorization.Users
{
    public interface IUserPolicy : IPolicy
    {
        Task CheckMaxUserCountAsync(int tenantId);
    }
}
