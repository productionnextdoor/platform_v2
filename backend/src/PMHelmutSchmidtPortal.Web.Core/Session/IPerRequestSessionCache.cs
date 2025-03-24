using System.Threading.Tasks;
using PMHelmutSchmidtPortal.Sessions.Dto;

namespace PMHelmutSchmidtPortal.Web.Session
{
    public interface IPerRequestSessionCache
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformationsAsync();
    }
}
