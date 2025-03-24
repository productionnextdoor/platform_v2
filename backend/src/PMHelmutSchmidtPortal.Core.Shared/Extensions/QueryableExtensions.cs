using System;
using System.Linq;
using System.Linq.Expressions;

namespace PMHelmutSchmidtPortal.Extensions;

public static class QueryableExtensions
{
    public static IOrderedQueryable<TSource> OrderByDirection<TSource, TKey>(this IQueryable<TSource> query, Expression<Func<TSource, TKey>> keySelector, string sortDirection = "ASC")
    {
        return sortDirection == "ASC"
            ? query.OrderBy(keySelector)
            : query.OrderByDescending(keySelector);
    }
}