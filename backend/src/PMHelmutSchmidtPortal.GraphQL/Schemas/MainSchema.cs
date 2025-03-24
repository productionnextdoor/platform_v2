using Abp.Dependency;
using GraphQL.Types;
using GraphQL.Utilities;
using PMHelmutSchmidtPortal.Queries.Container;
using System;

namespace PMHelmutSchmidtPortal.Schemas
{
    public class MainSchema : Schema, ITransientDependency
    {
        public MainSchema(IServiceProvider provider) :
            base(provider)
        {
            Query = provider.GetRequiredService<QueryContainer>();
        }
    }
}