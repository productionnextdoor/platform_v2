using System.Collections;
using System.Collections.Generic;
using System.Linq;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

namespace PMHelmutSchmidtPortal.HSUPortal.Extensions;

public static class StepVariantCostInformationExtension
{
    public static StepVariantCostInformation AggregateSum(this IEnumerable<StepVariantCostInformation> values) =>
        values.Aggregate((v1, v2) => new StepVariantCostInformation(
            v1.WorkCost + v2.WorkCost,
            v1.AdditionalCost + v2.AdditionalCost,
            v1.TransportAndAssemblyCost + v2.TransportAndAssemblyCost,
            v1.MaterialCost + v2.MaterialCost
        ));

    public static StepVariantCostInformation AggregateAverage(this IEnumerable<StepVariantCostInformation> values)
    {
        StepVariantCostInformation[] valueArray = values.ToArray();
        StepVariantCostInformation sum = valueArray.AggregateSum();
        return new StepVariantCostInformation(
            sum.WorkCost / valueArray.Length,
            sum.AdditionalCost / valueArray.Length,
            sum.TransportAndAssemblyCost / valueArray.Length,
            sum.MaterialCost / valueArray.Length
        );
    }
}