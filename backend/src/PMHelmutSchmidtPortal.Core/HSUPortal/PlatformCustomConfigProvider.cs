using System.Collections.Generic;
using Abp.Configuration;
using Abp.Configuration.Startup;

namespace PMHelmutSchmidtPortal.HSUPortal;

public class PlatformCustomConfigProvider : ICustomConfigProvider
{
    public Dictionary<string, object> GetConfig(CustomConfigProviderContext customConfigProviderContext)
    {
        //Currently static for the MVP. Later could be set in Db via Admin panel settings. Not in the scope of MVP
        return PMHelmutSchmidtPortalConsts.CustomConfig;
    }
}