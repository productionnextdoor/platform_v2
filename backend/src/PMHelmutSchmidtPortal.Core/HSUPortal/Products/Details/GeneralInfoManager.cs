using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.Extensions;
using PMHelmutSchmidtPortal.HSUPortal.Products.Dto.ProductDetails.GeneralInfoStep;

namespace PMHelmutSchmidtPortal.HSUPortal.Products.Details;

public class GeneralInfoManager: HSUDomainBaseService, IGeneralInfoManager
{
    private readonly IProductMeasurementRepository _productMeasurementRepository;
    private readonly IProductionStateRepository _productionStateRepository;
    private readonly IProductionDetailsRepository _productionDetailsRepository;

    public GeneralInfoManager(
        IProductMeasurementRepository productMeasurementRepository,
        IProductionStateRepository productionStateRepository,
        IProductionDetailsRepository productionDetailsRepository
    ) {
        _productMeasurementRepository = productMeasurementRepository;
        _productionStateRepository = productionStateRepository;
        _productionDetailsRepository = productionDetailsRepository;
    }

    public GeneralInfoOutputDto GetProductGeneralInfo(Product product)
    {
        ProductMeasurement defaultProductMeasurements = _productMeasurementRepository.GetDefaultProductMeasurement(product.Id);
        return ObjectMapper.Map(defaultProductMeasurements, ObjectMapper.Map<GeneralInfoOutputDto>(product));
    }

    public async Task<GeneralInfoOutputDto> CreateOrUpdateGeneralInfo(Product product, GeneralInfoInputDto input)
    {
        int productiondDetailsId =  await _productionDetailsRepository
            .GetByProduct(product.Id)
            .FilterByStatus(ProductionDetailsType.Live)
            .Select(details => details.Id)
            .SingleAsync();
            
        ProductionState finalProductState = await _productionStateRepository.GetOrCreateFinalProductionStateForProduct(productiondDetailsId);
        finalProductState.Description = product.Name;
        await _productionStateRepository.InsertOrUpdateAndGetIdAsync(finalProductState);

        ProductMeasurement defaultProductMeasurements = _productMeasurementRepository.GetDefaultProductMeasurement(product.Id);
        await _productMeasurementRepository.InsertOrUpdateAndGetIdAsync(ObjectMapper.Map(input,defaultProductMeasurements));
        
        return ObjectMapper.Map(defaultProductMeasurements, ObjectMapper.Map<GeneralInfoOutputDto>(product));
    }

    public async  Task<bool> ValidateGeneralInformation(int productId)
    {
        return await IsDefaultMeasurementsExist(productId) && await IsFinalProductStateExist(productId);
    }

    private async Task<bool> IsDefaultMeasurementsExist(int productId)
    {
        return await _productMeasurementRepository.GetAll().AnyAsync(pm => pm.ProductId == productId && pm.IsDefault);
    }

    private async Task<bool> IsFinalProductStateExist(int productId)
    {
        return await _productionStateRepository.GetAll()
            .AnyAsync(ps => ps.ProductionDetails.ProductId == productId && ps.StateType == ProductionStateType.ProductFinal);
    }
    
}