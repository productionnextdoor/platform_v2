namespace PMHelmutSchmidtPortal.HSUPortal;

public abstract class HSUDomainBaseService : PMHelmutSchmidtPortalDomainServiceBase
{
    protected HSUDomainBaseService()
    {
        //Changing the localisation source only for our AppServices. 
        LocalizationSourceName = PMHelmutSchmidtPortalConsts.HsuClientLocalizationSourceName;
    }
}