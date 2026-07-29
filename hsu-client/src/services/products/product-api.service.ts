import { Injectable } from '@angular/core';
import {
  CreateOrUpdateBaseProductInput,
  DeveloperProductInvolvementDto,
  GeneralInfoInputDto,
  GeneralInfoOutputDto,
  IGeneralInfoOutputDto,
  IProductVariantStepOutputDto,
  MaterialGroupDto,
  MaterialGroupStepInput,
  MaterialGroupStepOutput,
  MeasurementDto,
  PagedResultDtoOfProductListDto,
  PositionsDto,
  ProcessingDeadlineInput,
  ProducerAssignmentStatus,
  ProducerAssignmentStatusDto,
  ProducerProductInvolvementDto,
  ProducersAcceptOrRejectInput,
  ProductDetailsServiceProxy,
  ProductFilesStepInput,
  ProductFilesStepOutput,
  ProductListDto,
  ProductMeasurementStepInput,
  ProductMeasurementStepOutput,
  ProductProducerOutput,
  ProductProducersRequestDto,
  ProductServiceProxy,
  ProductState,
  ProductVariantStepInputDto,
  SurfaceDto,
  UserExtendedServiceProxy,
  WizardStepType,
  WorkPieceDto,
  WorkPieceVariantDto,
  WorkPieceWithMaterialDto
} from '../../shared/service-proxies/service-proxies';
import {
  map,
  Observable,
  of
} from 'rxjs';
import { IProductApiService } from './iproduct-api.service';
import { IProductFilter } from './product-table/product-table-base.service';
import {
  IMaterialGroup,
  IMeasurement,
  IOptionGroup,
  IProductModel,
  IWorkingPiece,
  IWorkPieceVariant,
  PmDropdownOption
} from 'hsu-library';
import { AppLocalizationService } from '../localization/app-localization.service';
import { DateTime } from 'luxon';

export interface IProductWithStateModel extends IProductModel {
  productId: number;
  state: ProductState;
}

export interface IProductVariantInfos {
  workPieceOptions: PmDropdownOption<number>[],
  measurements: IMeasurement[],
  workPieceVariants: IWorkPieceVariant[]
}

export interface IProductMaterialGroupsInfo {
  materialGroups: IMaterialGroup[];
  workingPieces: IWorkingPiece[];
}

@Injectable()
export class ProductApiService extends IProductApiService {

  constructor(
    private readonly productServiceProxy: ProductServiceProxy,
    private readonly productDetailServiceProxy: ProductDetailsServiceProxy,
    private readonly localisationService: AppLocalizationService,
    private readonly userExtendedServiceProxy: UserExtendedServiceProxy
  ) {
    super();
  }

  public getFilteredProducts(productFilter: IProductFilter):
    Observable<PagedResultDtoOfProductListDto> {
    return this.productServiceProxy.getProducts(productFilter.state, productFilter.searchInput, productFilter.sortOrder, productFilter.maxResultCount, productFilter.skipCount);
  }

  public getBaseProduct(productId: number): Observable<IProductWithStateModel> {
    return this.productServiceProxy.getBaseProduct(productId).pipe(
      map(this.listDtoToProductModel.bind(this))
    );
  }

  public getBaseProductOrEmpty(productId: number): Observable<IProductWithStateModel> {
    if (productId < 1) {
      return of(this.getEmptyProduct());
    }

    return this.getBaseProduct(productId);
  }

  public saveProduct(product: IProductWithStateModel): Observable<ProductListDto> {
    return this.productServiceProxy.createOrUpdateBaseProduct(this.listProductModelToInputBody(product))
  }

  public getWizardStep(productId: number): Observable<WizardStepType>{
    return this.productDetailServiceProxy.getWizardStep(productId);
  }

  public getGeneralProductInfo(productId: number): Observable<GeneralInfoOutputDto> {
    return this.productDetailServiceProxy.getProductGeneralInfo(productId);
  }

  public saveGeneralProductInfo(generalProductInfo: GeneralInfoOutputDto): Observable<GeneralInfoOutputDto> {
    return this.productDetailServiceProxy.createOrUpdateGeneralInfo(this.mapGeneralInfoDtos(generalProductInfo));
  }

  public getProductMaterialGroups(productId: number): Observable<IProductMaterialGroupsInfo> {
    return this.productDetailServiceProxy.getProductMaterialGroups(productId)
      .pipe(map(this.mapProductMaterialGroupInfos.bind(this)));
  }

  public saveProductMaterialGroups(productId: number, workPieces: IWorkingPiece[]): Observable<IWorkingPiece[]> {
    return this.productDetailServiceProxy.createOrUpdateProductMaterialsGroups(this.mapMaterialGroupStageInput(productId, workPieces))
      .pipe(map(output => this.mapDtoToWorkingPieces(output.workPieceDtos ?? [])));
  }

  public getProductVariants(productId: number): Observable<IProductVariantInfos> {
    return this.productDetailServiceProxy.getProductVariants(productId)
      .pipe(map(this.mapProductVariants.bind(this)))
  }

  public saveProductVariants(productId: number, measurements: IMeasurement[], workPieceVariants: IWorkPieceVariant[]): Observable<IProductVariantInfos> {
    return this.productDetailServiceProxy.createOrUpdateProductVariants(this.mapProductVariantsInputDto(productId, measurements, workPieceVariants))
      .pipe(map(this.mapProductVariants.bind(this)));
  }

  public getProductFilesInformation(productId: number): Observable<ProductFilesStepOutput> {
    return this.productDetailServiceProxy.getProductFilesInformation(productId);
  }

  public saveProductFilesInformation(productId: number, sharePointLink: string, productDescription: string): Observable<ProductFilesStepOutput> {
    return this.productDetailServiceProxy.createOrUpdateProductFilesInformation(new ProductFilesStepInput({
      productId: productId,
      sharepointLink: sharePointLink,
      productDescription: productDescription
    }))
  }

  public finalizeForValueChainPlanning(productId: number): Observable<ProductListDto> {
    return this.productDetailServiceProxy.finalizeForValueChainPlanning(productId);
  }

  public listDtoToProductModel(product: ProductListDto): IProductWithStateModel {
    return {
      productId: product.id ?? 0,
      productName: product.name ?? '',
      developerId: product.developer.developerId,
      description: product.descriptionForDev ?? '',
      productNumber: product.productNumber,
      creationDate: product.creationTime.toJSDate() ?? '',
      state: product.state
    }
  }

  public getProductMeasurements(productId: number): Observable<IMeasurement[]> {
    return this.productDetailServiceProxy.getProductMeasurements(productId).pipe(
      map(this.mapFromMeasurementOutput.bind(this))
    );
  }

  public saveMeasurementSorting(productId: number, measurements: IMeasurement[]): Observable<ProductMeasurementStepInput> {
    return this.productDetailServiceProxy.saveProductMeasurementPositions(this.mapProductMeasurementInput(productId, measurements));
  }

  public getProductProducers(productId: number, productionDetailsId: number, sorting: string, maxResultCount: number, skipCount: number): Observable<ProductProducerOutput> {
    return this.userExtendedServiceProxy.getProductProducers(productId, productionDetailsId,sorting, maxResultCount, skipCount);
  }

  public updateProcessingDeadline(productId: number, productionDetailsId: number, deadLine: DateTime): Observable<void> {
    return this.productServiceProxy.updateProcessingDeadline(new ProcessingDeadlineInput({
      productId: productId,
      productionDetailsId: productionDetailsId,
      processingDeadLine: deadLine
    }))
  }

  public sendProducersRequests(productId: number, productionDetailsId: number, producerIds: number[], deadLine: DateTime): Observable<void> {
    return this.productServiceProxy.requestProducerForProduct(
      new ProductProducersRequestDto({
        productId: productId,
        productionDetailsId: productionDetailsId,
        producersId: producerIds,
        processingDeadLine: deadLine
      })
    )
  }

  public getAssignmentStatusForCurrentProducer(productionDetailsId: number): Observable<ProducerAssignmentStatusDto> {
    return this.productServiceProxy.getAssignmentStatusForCurrentProducer(productionDetailsId)
  }

  public acceptOrRejectProductionRequest(productionDetailsId: number, assignmentAccepted:boolean ): Observable<ProducerAssignmentStatus> {
    return this.productServiceProxy.acceptOrRejectProductionRequest(
      new ProducersAcceptOrRejectInput(
        {
          productionDetailsId: productionDetailsId,
          assignmentAccepted: assignmentAccepted
        })
    )
  }

  public enableEditMode(productId: number): Observable<number> {
    return this.productServiceProxy.enableEditMode(productId);
  }

  public cancelEditMode(productId: number): Observable<void> {
    return this.productServiceProxy.cancelEditMode(productId);
  }

  confirmEditMode(productId: number): Observable<void> {
    return this.productServiceProxy.finalizeEditMode(productId);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.productServiceProxy.deleteProduct(productId);
  }

  public getProducerProductInvolvements(producerId: number): Observable<ProducerProductInvolvementDto[]> {
    return this.productServiceProxy.getProducerProductInvolvements(producerId);
  }

  public getDeveloperProductInvolvements(developerId: number): Observable<DeveloperProductInvolvementDto[]> {
    return this.productServiceProxy.getDeveloperProductInvolvements(developerId);
  }

  private listProductModelToInputBody(product: IProductWithStateModel): CreateOrUpdateBaseProductInput {
    return new CreateOrUpdateBaseProductInput({
      productId: product.productId,
      name: product.productName,
      developerId: product.developerId,
      descriptionForDev: product.description ?? '',
      state: product.state,
    });
  }

  private getEmptyProduct(): IProductWithStateModel {
    return {
      productId: 0,
      productName: '',
      developerId: 0,
      description: '',
      state: ProductState.Draft
    };
  }

  private mapGeneralInfoDtos(product: IGeneralInfoOutputDto): GeneralInfoInputDto {
    return new GeneralInfoInputDto({
      productId: product.productId,
      productName: product.productName ?? '',
      width: product.width,
      height: product.height,
      depth: product.depth
    });
  }

  private mapProductMaterialGroupInfos(infos: MaterialGroupStepOutput): IProductMaterialGroupsInfo {
    const materialGroups: IMaterialGroup[] = this.mapDtoToMaterialGroup(infos.materialGroupDtos ?? []);
    const workingPieces: IWorkingPiece[] = this.mapDtoToWorkingPieces(infos.workPieceDtos ?? []);
    this.deriveSpecificationGroupIds(workingPieces, materialGroups);
    return {
      materialGroups,
      workingPieces
    };
  }

  private mapDtoToMaterialGroup(materialGroupDtos: MaterialGroupDto[]): IMaterialGroup[] {
    return materialGroupDtos?.map(materialGroup => {
      const surfaces: SurfaceDto[] = materialGroup.surfaces ?? [];
      const grouped: SurfaceDto[] = surfaces.filter(surface => surface.specificationGroupId);
      const ungrouped: SurfaceDto[] = surfaces.filter(surface => !surface.specificationGroupId);
      const sortedOptions: PmDropdownOption<number>[] = [
        ...grouped.map(surface => this.getSpecifications(surface)),
        ...ungrouped.map(surface => this.getSpecifications(surface))
      ];
      const optionGroups: IOptionGroup[] = this.buildOptionGroups(grouped, ungrouped);
      return {
        materialGroupId: materialGroup.materialGroupId,
        name: materialGroup.name ?? '',
        localizedName: this.localizeWithFallback('MaterialGroup', materialGroup.name ?? ''),
        options: sortedOptions,
        optionGroups: optionGroups.length > 0 ? optionGroups : undefined
      }
    });
  }

  private buildOptionGroups(grouped: SurfaceDto[], ungrouped: SurfaceDto[]): IOptionGroup[] {
    const groupMap: Map<number, { name: string; options: PmDropdownOption<number>[] }> = new Map();
    for (const surface of grouped) {
      const gId: number = surface.specificationGroupId!;
      if (!groupMap.has(gId)) {
        groupMap.set(gId, {
          name: this.localizeWithFallback('SpecificationGroup', surface.specificationGroupName ?? ''),
          options: []
        });
      }
      groupMap.get(gId)!.options.push(this.getSpecifications(surface));
    }
    const optionGroups: IOptionGroup[] = Array.from(groupMap.entries()).map(([groupId, groupEntry]) => ({
      groupId,
      groupName: groupEntry.name,
      options: groupEntry.options
    }));
    if (ungrouped.length > 0 && grouped.length > 0) {
      optionGroups.push({
        groupId: 0,
        groupName: this.localizeWithFallback('SpecificationGroup', 'Ungrouped'),
        options: ungrouped.map(surface => this.getSpecifications(surface))
      });
    }
    return optionGroups;
  }

  private deriveSpecificationGroupIds(workingPieces: IWorkingPiece[], materialGroups: IMaterialGroup[]): void {
    for (const workingPiece of workingPieces) {
      const materialGroup: IMaterialGroup | undefined = materialGroups.find(group => group.materialGroupId === workingPiece.materialGroupId);
      if (!materialGroup?.optionGroups) continue;
      workingPiece.specificationGroupIds = workingPiece.specificationIds.map(specId => {
        const matchingGroup: IOptionGroup | undefined = materialGroup.optionGroups!.find(optGroup =>
          optGroup.options.some(opt => opt.key === specId)
        );
        return matchingGroup?.groupId ?? 0;
      });
    }
  }

  private getSpecifications(specification: SurfaceDto): PmDropdownOption<number> {
    return {
      key: specification.specificationId,
      value: this.localizeWithFallback('Specification', specification.name ?? ''),
      group: specification.specificationGroupName ?? undefined
    };
  }

  private localizeWithFallback(prefix: string, name: string): string {
    const key: string = `${prefix}.${name}`;
    const localized: string = this.localisationService.loc(key);
    return localized === key ? name : localized;
  }

  private mapDtoToWorkingPieces(workPieceDtos: WorkPieceDto[]): IWorkingPiece[] {
    return workPieceDtos?.map(item => (
      {
        workingPieceId: item.workPieceId ?? 0,
        materialGroupId: item.materialGroupId,
        material: item.name,
        finalState: item.finishedState,
        specificationIds: item.specificationIds ?? [],
        specificationGroupIds: []
      }
    ));
  }

  private mapProductVariants(variantInfo: IProductVariantStepOutputDto): IProductVariantInfos {
    return {
      workPieceOptions: this.mapWorkPieceOptions(variantInfo.workPieces ?? []),
      measurements: this.mapFromMeasurementDto(variantInfo.measurements ?? []),
      workPieceVariants: this.mapFromWorkPieceVariantDto(variantInfo.workPieceVariants ?? [])
    }
  }

  private mapWorkPieceOptions(workPieces: WorkPieceWithMaterialDto[]): PmDropdownOption<number>[] {
    return workPieces.map(workPiece => {
      return {
        key: workPiece.workPieceId ?? 0,
        value: this.localizeWithFallback('MaterialGroup', workPiece.materialGroupName ?? '') + ' (' + workPiece.name + ')'
      }
    });
  }

  private mapMaterialGroupStageInput(productId: number, workPieces: IWorkingPiece[]): MaterialGroupStepInput {
    return new MaterialGroupStepInput({
      productId: productId,
      workPieceDtos: this.mapWorkingPiecesToDto(workPieces)
    });
  }

  private mapWorkingPiecesToDto(workingPieces: IWorkingPiece[]): WorkPieceDto[] {
    return workingPieces.map(workingPiece => (
      new WorkPieceDto({
        workPieceId: workingPiece.workingPieceId ?? 0,
        name: workingPiece.material,
        finishedState: workingPiece.finalState,
        specificationIds: workingPiece.specificationIds,
        materialGroupId: workingPiece.materialGroupId
      })
    ));
  }

  private mapFromMeasurementDto(measurements: MeasurementDto[]): IMeasurement[] {
    return measurements.map(measurement => {
      return {
        measurementId: measurement.measurementId ?? 0,
        height: measurement.height,
        width: measurement.width,
        depth: measurement.depth,
        position: measurement.position,
        isDefaultMeasurement: measurement.isDefault ?? 0,
      }
    });
  }

  private mapFromWorkPieceVariantDto(workPieceVariants: WorkPieceVariantDto[]): IWorkPieceVariant[] {
    return workPieceVariants.map(workPieceVariant => {
      return {
        variantId: workPieceVariant.workPieceVariantId ?? 0,
        workPieceId: workPieceVariant.workPieceId ?? 0,
        description: workPieceVariant.description ?? ''
      }
    });
  }

  private mapProductVariantsInputDto(productId: number, measurements: IMeasurement[], workPieceVariants: IWorkPieceVariant[]): ProductVariantStepInputDto {
    return new ProductVariantStepInputDto({
      productId,
      measurements: this.mapToMeasurementDto(measurements),
      workPieceVariants: this.mapToWorkPieceVariantDto(workPieceVariants)
    });
  }

  private mapToMeasurementDto(measurements: IMeasurement[]): MeasurementDto[] {
    return measurements.map(measurement => {
      return new MeasurementDto({
        measurementId: measurement.measurementId,
        position: measurement.position,
        height: measurement.height,
        width: measurement.width,
        depth: measurement.depth,
        isDefault: measurement.isDefaultMeasurement,
      })
    });
  }

  private mapToWorkPieceVariantDto(workPieceVariants: IWorkPieceVariant[]): WorkPieceVariantDto[] {
    return workPieceVariants.map(workPieceVariant => {
      return new WorkPieceVariantDto({
        workPieceVariantId: workPieceVariant.variantId,
        workPieceId: workPieceVariant.workPieceId,
        description: workPieceVariant.description
      });
    });
  }

  private mapFromMeasurementOutput(measurements: ProductMeasurementStepOutput): IMeasurement[] {
    return measurements.measurementDtos?.map(measurement => {
      return {
        measurementId: measurement.measurementId ?? 0,
        height: measurement.height,
        width: measurement.width,
        depth: measurement.depth,
        position: measurement.position,
        isDefaultMeasurement: measurement.isDefault,
      }
    }) ?? [];
  }

  private mapToPositionsDto(measurements: IMeasurement[]): PositionsDto[] {
    return measurements.map(measurement => {
      return new PositionsDto({
        measurementId: measurement.measurementId,
        position: measurement.position ?? 0,
      })
    });
  }

  private mapProductMeasurementInput(productId: number, measurements: IMeasurement[]): ProductMeasurementStepInput {
    return new ProductMeasurementStepInput({
      productId,
      positionDtos: this.mapToPositionsDto(measurements),
    });
  }
}
