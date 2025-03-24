using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace PMHelmutSchmidtPortal.Web.Authentication.JwtBearer
{
    public class AsyncJwtBearerOptions : JwtBearerOptions
    {
        public readonly List<IAsyncSecurityTokenValidator> AsyncSecurityTokenValidators;
        
        private readonly PMHelmutSchmidtPortalAsyncJwtSecurityTokenHandler _defaultAsyncHandler = new PMHelmutSchmidtPortalAsyncJwtSecurityTokenHandler();

        public AsyncJwtBearerOptions()
        {
            AsyncSecurityTokenValidators = new List<IAsyncSecurityTokenValidator>() {_defaultAsyncHandler};
        }
    }

}
