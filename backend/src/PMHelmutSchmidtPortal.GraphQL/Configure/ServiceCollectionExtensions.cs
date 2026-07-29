using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.DI;
using GraphQL.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using PMHelmutSchmidtPortal.Debugging;
using PMHelmutSchmidtPortal.Schemas;

namespace PMHelmutSchmidtPortal.Configure
{
    public static class ServiceCollectionExtensions
    {
        public static void AddAndConfigureGraphQL(this IServiceCollection services)
        {
            services
                .AddGraphQL(builder => builder
                    .AddNewtonsoftJson()
                    .AddErrorInfoProvider(opt => opt.ExposeExceptionDetails = DebugHelper.IsDebug)
                    .AddGraphTypes()
                    .AddUserContextBuilder(httpContext => new Dictionary<string, object>
                    {
                        {"user", httpContext.User}
                    }));

            services.AddSingleton<MainSchema>();
            
            AllowSynchronousIo(services);
        }

        //https://github.com/graphql-dotnet/graphql-dotnet/issues/1326
        private static void AllowSynchronousIo(IServiceCollection services)
        {
            // Server configuration for .NET 9 - these may not be needed anymore
            // or need different configuration approach
        }
    }
}
