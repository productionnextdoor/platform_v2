using AutoMapper;
using PMHelmutSchmidtPortal.HSUPortal.ProductCosts;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.Dto.ProductionSteps;

namespace PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning.ProductionSteps;

public class ProductionStepDefaultCostResolver: IValueResolver<ProductionStep, ProductionStepListDto, decimal>
{
    public decimal Resolve(ProductionStep source, ProductionStepListDto destination, decimal destMember, ResolutionContext context)
    {
        // as this resolver is used in a static context (CustomDtoMapper)
        // we cannot inject any services and therefore have to use the 
        // concrete implementation and cannot use the interface
        return ProductionStepCostManager.CalculateDefaultStepCost(source);
    }
}