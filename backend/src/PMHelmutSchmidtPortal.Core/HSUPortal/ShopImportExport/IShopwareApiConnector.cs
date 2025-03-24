using System.Net.Http;
using System.Threading.Tasks;
using Abp.Dependency;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public interface IShopwareApiConnector : ISingletonDependency
{
    Task SetToken();
    Task<string> SendRequestAsync(HttpMethod method, string requestUrl, HttpContent requestContent);
}