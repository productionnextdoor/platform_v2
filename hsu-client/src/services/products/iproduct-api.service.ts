import {
  PagedResultDtoOfProductListDto,
  ProducerAssignmentStatus,
  ProducerAssignmentStatusDto,
  ProductFilesStepOutput,
  ProductListDto,
  ProductMeasurementStepInput,
  ProductProducerOutput,
  WizardStepType,
} from '../../shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';
import { IProductFilter } from './product-table/product-table-base.service';
import {
  IProductMaterialGroupsInfo,
  IProductVariantInfos,
  IProductWithStateModel
} from './product-api.service';
import {
  IMeasurement,
  IProductDeliveryAddress,
  IWorkingPiece,
  IWorkPieceVariant
} from 'hsu-library';
import { DateTime } from 'luxon';
import {
  IGeneralInfoDto
} from '../../app/product-developer-wizard/product-step-general/product-create-or-edit-general.shared';

export abstract class IProductApiService {
  abstract getFilteredProducts(productFilter: IProductFilter): Observable<PagedResultDtoOfProductListDto>;
  abstract getBaseProduct (productId: number): Observable<IProductWithStateModel>;
  abstract getBaseProductOrEmpty(productId: number): Observable<IProductWithStateModel>;
  abstract saveProduct (product: IProductWithStateModel): Observable<ProductListDto>;
  abstract getWizardStep(productId: number): Observable<WizardStepType>;
  abstract getGeneralProductInfo(productId: number): Observable<IGeneralInfoDto>;
  abstract saveGeneralProductInfo(generalProductInfo: IGeneralInfoDto): Observable<IGeneralInfoDto>;
  abstract getProductDeliveryAddress(productId: number): Observable<IProductDeliveryAddress>;
  abstract saveProductDeliveryAddress(productId: number, deliveryAddress: IProductDeliveryAddress): Observable<IProductDeliveryAddress>;
  abstract getProductVariants(productId: number): Observable<IProductVariantInfos>;
  abstract saveProductVariants(productId: number, measurements: IMeasurement[], workPieceVariants: IWorkPieceVariant[]): Observable<IProductVariantInfos>;
  abstract getProductMaterialGroups(productId: number): Observable<IProductMaterialGroupsInfo>;
  abstract saveProductMaterialGroups(productId: number, workPieces: IWorkingPiece[]): Observable<IWorkingPiece[]>;
  abstract getProductFilesInformation(productId: number): Observable<ProductFilesStepOutput>;
  abstract saveProductFilesInformation(productId: number, sharePointLink: string, productDescription: string): Observable<ProductFilesStepOutput>;
  abstract finalizeForValueChainPlanning(productId: number): Observable<ProductListDto>;
  abstract listDtoToProductModel(product: ProductListDto): IProductWithStateModel;
  abstract getProductMeasurements (productId: number) : Observable<IMeasurement[]>;
  abstract saveMeasurementSorting (productId: number, measurements: IMeasurement[]): Observable<ProductMeasurementStepInput>;
  abstract getProductProducers(productId: number, productionDetailsId: number, sorting: string, maxResultCount: number, skipCount: number): Observable<ProductProducerOutput>
  abstract updateProcessingDeadline(productId: number, productionDetailsId: number, deadLine: DateTime): Observable<void>
  abstract sendProducersRequests(productId: number, productionDetailsId: number, producerIds: number[], deadLine: DateTime): Observable<void>
  abstract getAssignmentStatusForCurrentProducer(productionDetailsId: number): Observable<ProducerAssignmentStatusDto>
  abstract acceptOrRejectProductionRequest (productionDetailsId: number, assignmentAccepted:boolean ): Observable<ProducerAssignmentStatus>
  abstract enableEditMode(productId: number): Observable<number>
  abstract cancelEditMode(productId: number): Observable<void>
  abstract confirmEditMode(productId: number): Observable<void>
}
