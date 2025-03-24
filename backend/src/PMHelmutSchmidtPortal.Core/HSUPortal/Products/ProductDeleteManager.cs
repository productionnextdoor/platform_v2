using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.EntityFrameworkCore.Repositories;
using Castle.Core.Logging;
using Microsoft.EntityFrameworkCore;
using PMHelmutSchmidtPortal.HSUPortal.ProductionSteps;
using PMHelmutSchmidtPortal.HSUPortal.Products.Details;
using PMHelmutSchmidtPortal.HSUPortal.ProductVariants;
using PMHelmutSchmidtPortal.HSUPortal.ShopOrders;
using PMHelmutSchmidtPortal.HSUPortal.ValueChainPlanning;

namespace PMHelmutSchmidtPortal.HSUPortal.Products;

public class ProductDeleteManager : HSUDomainBaseService, IProductDeleteManager
{
    private readonly IProductRepository _productRepository;
    private readonly IProductionDetailsRepository _productionDetailsRepository;
    private readonly IOrderRepository _orderRepository;
    private readonly IProductProducerRepository _productProducerRepository;
    private readonly IProductionStateRepository _productionStateRepository;
    private readonly IProductionStepRepository _productionStepRepository;
    private readonly IWorkPieceRepository _workPieceRepository;
    private readonly IProductFileManager _productFileManager;
    private readonly IProductionPlanRepository _productionPlanRepository;
    private readonly IProductMeasurementRepository _productMeasurementRepository;
    private readonly IProductVariantRepository _productVariantRepository;
    private ILogger Logger { get; set; }

    public ProductDeleteManager(
        IProductRepository productRepository,
        IProductionDetailsRepository productionDetailsRepository,
        IOrderRepository orderRepository,
        IProductProducerRepository productProducerRepository,
        IProductionStateRepository productionStateRepository,
        IProductionStepRepository productionStepRepository,
        IWorkPieceRepository workPieceRepository,
        IProductFileManager productFileManager,
        IProductionPlanRepository productionPlanRepository,
        IProductMeasurementRepository productMeasurementRepository,
        IProductVariantRepository productVariantRepository
    )
    {
        _productRepository = productRepository;
        _productionDetailsRepository = productionDetailsRepository;
        _orderRepository = orderRepository;
        _productProducerRepository = productProducerRepository;
        _productionStateRepository = productionStateRepository;
        _productionStepRepository = productionStepRepository;
        _workPieceRepository = workPieceRepository;
        _productFileManager = productFileManager;
        _productionPlanRepository = productionPlanRepository;
        _productMeasurementRepository = productMeasurementRepository;
        _productVariantRepository = productVariantRepository;
        Logger = NullLogger.Instance;
    }

    public async Task<List<int>> DeleteProductsById(List<int> ids)
    {
        List<int> removedIds = new List<int>();
        foreach (int id in ids)
        {
            if (await DeleteProductById(id))
            {
                removedIds.Add(id);
            }
        }

        return removedIds;
    }

    public async Task<bool> DeleteProductById(int id)
    {
        try
        {
            Product product = await _productRepository
                .GetProduct(id)
                .Include(product => product.ProductFiles)
                .Include(product => product.ProductMeasurements)
                .SingleOrDefaultAsync();

            await DeleteProductVariantsWithOrders(product.Id);
            await DeleteProductionDetails(product);
            _workPieceRepository.RemoveWorkPiecesByProduct(product.Id);
            _productMeasurementRepository.RemoveRange(product.ProductMeasurements);
            await RemoveFiles(product.ProductFiles);
            await _productRepository.DeleteAsync(product);
            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            Logger.Error($"Product with id ={id} wasn't deleted. Exception: {e.Message}" );
            return false;
        }
        
    }

    private async Task RemoveFiles(ICollection<ProductFile> productFiles)
    {
        foreach (ProductFile productFile in productFiles)
        {
            string filePath = _productFileManager.GetFullFilePath(productFile.FilePath);
            await _productFileManager.RemoveFile(productFile.Id);
        }
    }

    private async Task DeleteProductVariantsWithOrders(int productId)
    {
        List<int> productVariantIdsList = await _productVariantRepository
            .GetAll()
            .Where(pv => pv.ProductId == productId)
            .Select(pv => pv.Id)
            .ToListAsync();

        foreach (int productVariant in productVariantIdsList)
        {
            _orderRepository.RemoveOrdersByProductVariant(productVariant);
        }

        _productVariantRepository.DeleteProductVariants(productVariantIdsList);
    }

    private async Task DeleteProductionDetails(Product product)
    {
        List<ProductionDetails> productionDetailsList = await _productionDetailsRepository
            .GetByProduct(product.Id)
            .ToListAsync();


        foreach (ProductionDetails productionDetails in productionDetailsList)
        {
            _productionStateRepository.RemoveStatesByProductionDetailsId(productionDetails.Id);
            _productionStepRepository.RemoveStepsByProductionDetailsId(productionDetails.Id);
            _productProducerRepository.RemoveProductProducersByDetailsId(productionDetails.Id);
            _productionPlanRepository.RemovePlansByDetailsId(productionDetails.Id);
            await _productionDetailsRepository.DeleteAsync(productionDetails);
        }
    }
}