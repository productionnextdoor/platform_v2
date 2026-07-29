using System;
using System.Linq;
using GraphQL;
using GraphQL.Types;
using GraphQLParser.AST;

namespace PMHelmutSchmidtPortal.Core.Extensions
{
    public static class ContextExtensions
    {
        public static IResolveFieldContext ContainsArgument<TArgType>(this IResolveFieldContext context,
            string argumentName,
            Action<TArgType> argumentContainsAction)
        {
            if (context.Arguments.ContainsKey(argumentName))
            {
                argumentContainsAction(context.GetArgument<TArgType>(argumentName));
            }

            return context;
        }

        /// <summary>
        /// Returns true if the given fieldSelector exists in the selection of the query.
        /// </summary>
        /// <param name="context">The working context</param>
        /// <param name="fieldSelector">The query of the field selector. For example items:organizationUnits:displayName</param>
        /// <param name="namespaceSeperator">The seperator character of the fieldSelector. Default is :</param>
        /// <returns></returns>
        public static bool HasSelectionField(this IResolveFieldContext context, string fieldSelector, char namespaceSeperator = ':')
        {
            if (string.IsNullOrWhiteSpace(fieldSelector))
            {
                return false;
            }

            if (context.SubFields == null)
            {
                return false;
            }

            var fragments = fieldSelector.Split(new[] { namespaceSeperator }, StringSplitOptions.RemoveEmptyEntries);

            if (fragments.Length == 1)
            {
                return context.SubFields.ContainsKey(fragments[0]);
            }

            // GraphQL 8.x - Proper nested field checking using new API
            if (!context.SubFields.ContainsKey(fragments[0]))
            {
                return false;
            }

            var currentSubField = context.SubFields[fragments[0]];
            
            // Navigate through nested selections using GraphQL 8.x API
            var currentSelections = currentSubField.Field?.SelectionSet?.Selections;

            for (var i = 1; i < fragments.Length; i++)
            {
                if (currentSelections == null)
                {
                    return false;
                }

                GraphQLField fieldSelection = null;
                foreach (var selection in currentSelections)
                {
                    if (selection is GraphQLField field && field.Name.StringValue == fragments[i])
                    {
                        fieldSelection = field;
                        break;
                    }
                }
                    
                if (fieldSelection == null)
                {
                    return false;
                }

                if (i == fragments.Length - 1)
                {
                    return true;
                }

                currentSelections = fieldSelection.SelectionSet?.Selections;
            }

            return true;
        }
    }
}
