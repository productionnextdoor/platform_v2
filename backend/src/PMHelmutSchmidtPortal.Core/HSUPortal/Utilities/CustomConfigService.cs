using System.Collections.Generic;
using Abp.Configuration.Startup;
using Abp.Dependency;

namespace PMHelmutSchmidtPortal.HSUPortal.Utilities;

public class CustomConfigService: ITransientDependency
{
    private Dictionary<string, object> _config;

    public CustomConfigService(IAbpStartupConfiguration abpStartupConfiguration)
    {
        _config = abpStartupConfiguration.GetCustomConfig();
    }

    public bool IsOffer()
    {
        return bool.Parse(_config[PMHelmutSchmidtPortalConsts.IsOfferKey].ToString() ?? "false");
    }

    public bool HasVariants()
    {
        return bool.Parse(_config[PMHelmutSchmidtPortalConsts.HasVariantsKey].ToString() ?? "false");
    }
}