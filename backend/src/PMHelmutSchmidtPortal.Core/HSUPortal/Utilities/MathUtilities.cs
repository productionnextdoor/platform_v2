using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

namespace PMHelmutSchmidtPortal.HSUPortal.Utilities;

public static class MathUtilities
{
    public static decimal LinearCostInterpolation(int position1, int position2, decimal cost1, decimal cost2, int variantPosition, int decimalPlace = 2) =>
        Math.Round((cost2 - cost1) / (position2 - position1) * (variantPosition - position1) + cost1, decimalPlace); // y = mx+b | m = Δy/Δx | Δy = y2 - y1
    
    public static StepVariantCostInformation CalcOutlierAdjustedAverage(IReadOnlyCollection<StepVariantCostInformation> values, decimal outlierOffset = 1.5m)
    {
        // µ = 1/n * (x_1 + x_2 + ... + x_n)
        decimal average = values
            .Select(v => v.TotalCost())
            .ToArray()
            .CalcAverage();
        
        // y_i = (x_i - µ)^2
        List<double> powerTwoDifferences = values.Select(v => Math.Pow((double)(v.TotalCost() - average), 2)).ToList();
        
        // σ = sqrt(1/n * (y_1 + y_2 + ... + y_n))
        decimal defaultDeviation = (decimal)Math.Sqrt(powerTwoDifferences.Aggregate((value1, value2) => value1 + value2) / powerTwoDifferences.Count);

        // µ + 1.5σ
        decimal upperBound = average + defaultDeviation * outlierOffset;
        // µ - 1.5σ
        decimal lowerBound = average - defaultDeviation * outlierOffset;

        // ignore outliers (x ∈ [µ - 1.5σ, µ + 1.5σ])
        List<StepVariantCostInformation> noneOutliers = values
            .Where(value => value.TotalCost() >= lowerBound && value.TotalCost() <= upperBound)
            .ToList();

        return new StepVariantCostInformation(
            noneOutliers.Select(no => no.WorkCost).ToArray().CalcAverage(),
            noneOutliers.Select(no => no.AdditionalCost).ToArray().CalcAverage(),
            noneOutliers.Select(no => no.TransportAndAssemblyCost).ToArray().CalcAverage(),
            noneOutliers.Select(no => no.MaterialCost).ToArray().CalcAverage()
            );
    }

    public static decimal CalcAverage(this IReadOnlyCollection<decimal> values) =>
        values.Aggregate((v1, v2) => v1 + v2) / values.Count;
}