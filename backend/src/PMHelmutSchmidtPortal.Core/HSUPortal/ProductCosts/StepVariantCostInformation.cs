namespace PMHelmutSchmidtPortal.HSUPortal.ProductCosts;

public record StepVariantCostInformation(
    decimal WorkCost,
    decimal AdditionalCost,
    decimal TransportAndAssemblyCost,
    decimal MaterialCost) 
{
    public decimal TotalCost() =>
        WorkCost + AdditionalCost + TransportAndAssemblyCost + MaterialCost;
}