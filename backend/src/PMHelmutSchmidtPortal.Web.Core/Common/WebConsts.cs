using System.Collections.Generic;

namespace PMHelmutSchmidtPortal.Web.Common
{
    public static class WebConsts
    {
        public const string SwaggerUiEndPoint = "/swagger";
        public const string HangfireDashboardEndPoint = "/hangfire";

        public static bool SwaggerUiEnabled = true;
        public static bool HangfireDashboardEnabled = false;

        public static List<string> ReCaptchaIgnoreWhiteList = new List<string>
        {
            PMHelmutSchmidtPortalConsts.AbpApiClientUserAgent
        };

        public static class GraphQL
        {
            public const string GraphiQLEndPoint = "/ui/graphiql";
            public const string EndPoint = "/graphql";

            public static bool GraphiQLEnabled = false;
            public static bool Enabled = false;
        }
    }
}
