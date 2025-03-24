using System.Reflection;
using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace PMHelmutSchmidtPortal.Localization
{
    public static class PMHelmutSchmidtPortalLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(
                    PMHelmutSchmidtPortalConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(PMHelmutSchmidtPortalLocalizationConfigurer).GetAssembly(),
                        "PMHelmutSchmidtPortal.Localization.PMHelmutSchmidtPortal"
                    )
                )
            );
            
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(
                    PMHelmutSchmidtPortalConsts.HsuClientLocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(PMHelmutSchmidtPortalLocalizationConfigurer).GetAssembly(),
                        "PMHelmutSchmidtPortal.Localization.HsuClientLocalization"
                    )
                )
            );
            
        }
    }
}