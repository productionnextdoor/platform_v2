using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Abp.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PMHelmutSchmidtPortal.Configuration;
using PMHelmutSchmidtPortal.Url;

namespace PMHelmutSchmidtPortal.HSUPortal.ShopImportExport;

public class ShopwareApiConnector : IShopwareApiConnector
{
    private readonly HttpClient _httpClient;
    private readonly IWebUrlServiceExtended _urlService;
    private readonly IAppConfigurationAccessor _configurationAccessor;
    private TokenDto _tokenDto;

    public ShopwareApiConnector(
        HttpClient httpClient,
        IWebUrlServiceExtended urlService,
        IAppConfigurationAccessor configurationAccessor)
    {
        _httpClient = httpClient;
        _urlService = urlService;
        _configurationAccessor = configurationAccessor;
        _httpClient.DefaultRequestHeaders
            .Accept
            .Add(new MediaTypeWithQualityHeaderValue("*/*"));
    }
    
    public async Task SetToken()
    {
        HttpRequestMessage request = new()
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri(_urlService.GetShopRootAddress().EnsureEndsWith('/') + "api/oauth/token"),
            Content = new StringContent(
                JsonConvert.SerializeObject(new RequestTokenDto
                {
                    GrantType = _configurationAccessor.Configuration["Authentication:Shopware:GrantType"],
                    Username = _configurationAccessor.Configuration["Authentication:Shopware:UserName"],
                    Password = _configurationAccessor.Configuration["Authentication:Shopware:Password"],
                    ClientId = _configurationAccessor.Configuration["Authentication:Shopware:ClientId"],
                    ClientSecret = _configurationAccessor.Configuration["Authentication:Shopware:ClientSecret"]
                }, new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new SnakeCaseNamingStrategy()
                    }
                }),
                new MediaTypeHeaderValue("application/json")
            )
        };

        using HttpResponseMessage response = await _httpClient.SendAsync(request);

        response.EnsureSuccessStatusCode();
        
        _tokenDto = JsonConvert.DeserializeObject<TokenDto>( await response.Content.ReadAsStringAsync(), new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            }
        });
    }
    
    public async Task<string> SendRequestAsync(HttpMethod method, string requestUrl, HttpContent requestContent)
    {
        HttpRequestMessage request = new()
        {
            Method = method,
            RequestUri = new Uri(_urlService.GetShopRootAddress().EnsureEndsWith('/') + requestUrl),
            Content = requestContent
        };

        if (_tokenDto == null || !_tokenDto.IsTokenValid())
        {
            await SetToken();
        }
        
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _tokenDto?.AccessToken);
        
        using HttpResponseMessage response = await _httpClient.SendAsync(request);

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }


    
 
}