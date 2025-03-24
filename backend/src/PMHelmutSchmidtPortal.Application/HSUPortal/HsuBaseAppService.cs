namespace PMHelmutSchmidtPortal.HSUPortal;

public class HsuBaseAppService: PMHelmutSchmidtPortalAppServiceBase
{
    protected HsuBaseAppService()
    {
        //Changing the localisation source only for our AppServices. 
        LocalizationSourceName = PMHelmutSchmidtPortalConsts.HsuClientLocalizationSourceName;
    }
}