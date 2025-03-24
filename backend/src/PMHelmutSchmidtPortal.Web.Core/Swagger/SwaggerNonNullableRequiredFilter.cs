using System.Collections.Generic;
using System.Linq;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace PMHelmutSchmidtPortal.Web.Swagger;

public class SwaggerNonNullableRequiredFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        schema.Required = schema.Properties
            .Where(propertyDict => !propertyDict.Value.Nullable)
            .Select(dict => dict.Key)
            .ToHashSet();
    }
}