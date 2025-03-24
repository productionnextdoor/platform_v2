using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Abp.BackgroundJobs;
using Abp.Dependency;
using Abp.Extensions;
using Castle.Core.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PMHelmutSchmidtPortal.Configuration;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ValueChainPlanner;
using PMHelmutSchmidtPortal.Url;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Jobs;

public class SendProductToPlannerJob : AsyncBackgroundJob<VcpRequestContentDto>, ITransientDependency
{
    private readonly HttpClient _httpClient;
    private readonly IWebUrlServiceExtended _webUrlService;
    private readonly IAppConfigurationAccessor _configurationAccessor;

    private new ILogger Logger { get; }

    public SendProductToPlannerJob(
        HttpClient httpClient,
        IWebUrlServiceExtended webUrlService,
        IAppConfigurationAccessor configurationAccessor
    )
    {
        _httpClient = httpClient;
        _webUrlService = webUrlService;
        _configurationAccessor = configurationAccessor;
        Logger = NullLogger.Instance;
    }

    public override async Task ExecuteAsync(VcpRequestContentDto args)
    {
        args.CallbackUrl = _webUrlService.GetServerRootAddress().EnsureEndsWith('/') + "api/services/app/ValueChainPlanner/SetProductionPlansForProduct";

        HttpRequestMessage request = new()
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri(_webUrlService.GetPlannerRootAddress().EnsureEndsWith('/') + "trigger-task"),

            Content = new StringContent(JsonConvert.SerializeObject(args, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            }), Encoding.UTF8, "application/json")
        };
        
        string username = _configurationAccessor.Configuration["Authentication:Planner:UserName"];
        string password = _configurationAccessor.Configuration["Authentication:Planner:Password"];
        if (!(username.IsNullOrEmpty() || password.IsNullOrEmpty()))
        {
            string base64Credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", base64Credentials);
        }
        
        Logger.Info($"Sending planner request for product: {args.OutputParam}");
        
        using HttpResponseMessage response = await _httpClient.SendAsync(request);

        string jsonResponse = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            Logger.Error($"""
                          PlanerTask: productId = {args.OutputParam},
                          Failed to POST data. Status code: {response.StatusCode}.
                          Message: {jsonResponse}
                          """);
            throw new HttpRequestException($"Failed to POST data. Status code: {response.StatusCode}");
        }

        Logger.Info($"PlanerTask: productId = {args.OutputParam}, {jsonResponse}");
    }
}