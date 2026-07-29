import { IDetailsDisplayService } from './idetails-display.service';
import { Injectable } from '@angular/core';
import {
  MeasurementDto,
  ProductDetailsOverviewDto,
  ProductDetailsServiceProxy,
  WorkPieceVariantDto
} from '../../../../shared/service-proxies/service-proxies';
import { AppLocalizationService } from '../../../localization/app-localization.service';
import { map, Observable } from 'rxjs';
import {
  ICardProperty,
  IPropertySection,
  IPropertyGroup
} from 'hsu-library';
import { ProductFileService } from '../../product-file.service';
import { AppConsts } from '../../../../shared/AppConsts';

@Injectable()
export class DetailsDisplayService extends IDetailsDisplayService {

  constructor(
    private readonly productDetailServiceProxy: ProductDetailsServiceProxy,
    private readonly productFilesService: ProductFileService,
    private readonly localizationService: AppLocalizationService,
  ) {
    super();
  }

  public getProductDetailsData(productId: number): Observable<ProductDetailsOverviewDto> {
    return this.productDetailServiceProxy.getProductDetailsOverview(productId);
  }

  public getProductDetailsDataByOrderId(orderId: number): Observable<ProductDetailsOverviewDto> {
    return this.productDetailServiceProxy.getProductDetailsOverviewByOrderId(orderId);
  }

  public mapFromProductDetailsOverviewDto(productData: ProductDetailsOverviewDto): IPropertySection[] {
    const sections: IPropertySection[] = [];

    const generalProperties: ICardProperty[] = this.generateGeneralProperties(productData);
    this.addPropertySection(sections, this.localizationService.loc('ProductDetailsSidebar.SectionGeneralInfo.Title'), '', [this.createPropertyGroup(generalProperties)]);

    const materialGroups: IPropertyGroup[] = this.generateMaterialGroups(productData);
    if (materialGroups.length)
      this.addPropertySection(sections, this.localizationService.loc('ProductDetailsSidebar.SectionMaterialGroups.Title'), '', materialGroups);

    const variantsGroups: IPropertyGroup[] = [
      ...this.generateMeasurementGroups(productData),
      ...this.generateMaterialVariantsGroups(productData)
    ];

    if (variantsGroups.length) {
      this.addPropertySection(sections, this.localizationService.loc('ProductDetailsSidebar.SectionVariants.Title'), '', variantsGroups);
    }

    if (productData.description?.length) {
      this.addPropertySection(sections, this.localizationService.loc('ProductDetailsSidebar.SectionDescription.Title'), productData.description, []);
    }

    return sections;
  }

  public getGeneralInformationDeveloper(productData: ProductDetailsOverviewDto): IPropertyGroup {
    return {
      groupTitle: this.localizationService.loc('ProductDetailsDeveloper.SectionGeneralInfo.Title'),
      properties: [
        {
          key: this.localizationService.loc('ProductDetailsDeveloper.SectionGeneralInfo.ProductName'),
          value: productData.productName ?? '',
        },
        {
          key: this.localizationService.loc('ProductDetailsDeveloper.SectionGeneralInfo.ProductNumber'),
          value: productData.productNumber.toString(),
        },
        {
          key: this.localizationService.loc('ProductDetailsDeveloper.SectionGeneralInfo.CreationDate'),
          value: productData.createdAt.toFormat(AppConsts.DateFormatString),
        },
        {
          key: this.localizationService.loc('ProductDetailsDeveloper.SectionGeneralInfo.ModifiedDate'),
          value: productData.updatedAt.toFormat(AppConsts.DateFormatString),
        },
        {
          key: this.localizationService.loc('ProductDetailsDeveloper.SectionGeneralInfo.DefaultMeasurement'),
          value: productData.defaultMeasurement.height
            ? this.mapMeasurementsToString(productData.defaultMeasurement.height, productData.defaultMeasurement.width, productData.defaultMeasurement.depth)
            : '',
        }
      ]
    };
  }


  public getImageURL(fileId: number): Observable<string> {
    return this.productFilesService.getImage(fileId).pipe(
      map(imageBlob => {
        return URL.createObjectURL(imageBlob);
      })
    );
  }

  public downloadAllProductFiles(productId: number, fileName: string) {
    this.productFilesService.downloadProductFiles(productId, fileName).subscribe();
  }

  public getUploadCategories(): { [key: string]: string } {
    return {
      ProductDescription: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.ProductDescription'),
      ProductPicture: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.ProductPicture'),
      ModelsAndDrawings: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.ModelsAndDrawings'),
      TechnicalDetails: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.TechnicalDetails'),
      ManufacturingHints: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.ManufacturingHints'),
      InstallationAndUsageInstructions: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.InstallationAndUsageInstructions'),
      Miscellaneous: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.Miscellaneous')
    };
  }

  public mapToDeveloperDetails(productData: ProductDetailsOverviewDto): IPropertySection[] {
    const sections: IPropertySection[] = [];

    const materialGroups: IPropertyGroup[] = this.generateMaterialGroups(productData);
    if (materialGroups.length)
      this.addPropertySection(sections, this.localizationService.loc('ProductDetailsDeveloper.SectionMaterialGroups.Title'), '', materialGroups);

    const variantsGroups: IPropertyGroup[] = [
      ...this.generateMeasurementGroups(productData),
      ...this.generateMaterialVariantsGroups(productData)
    ];

    if (variantsGroups.length) {
      this.addPropertySection(sections, this.localizationService.loc('ProductDetailsSidebar.SectionVariants.Title'), '', variantsGroups);
    }

    return sections;
  }

  private addPropertySection(sections: IPropertySection[], sectionTitle: string, content: string, groups?: IPropertyGroup[]) {
    if (!groups) return;

    sections.push({
      sectionTitle,
      content,
      groups
    });
  }

  private createPropertyGroup(properties: ICardProperty[], groupTitle: string = ''): IPropertyGroup {
    return {
      groupTitle,
      properties
    };
  }

  private addProperty(properties: ICardProperty[], key: string, value?: string) {
    if (!value) return;

    properties.push({
      key: key,
      value: value
    });
  }

  private generateGeneralProperties(productData: ProductDetailsOverviewDto): ICardProperty[] {
    const generalProperties: ICardProperty[] = [];

    this.addProperty(generalProperties, this.localizationService.loc('ProductDetailsSidebar.SectionGeneralInfo.Developer'), `${productData.developer.name} ${productData.developer.surname}`);
    this.addProperty(generalProperties, this.localizationService.loc('ProductDetailsSidebar.SectionGeneralInfo.ProductName'), productData.productName);
    this.addProperty(generalProperties, this.localizationService.loc('ProductDetailsSidebar.SectionGeneralInfo.ProductNumber'), String(productData.productNumber));
    this.addProperty(generalProperties, this.localizationService.loc('ProductDetailsSidebar.SectionGeneralInfo.CreationDate'), productData.createdAt.toFormat(AppConsts.DateFormatString));

    if (productData.defaultMeasurement.height) {
      this.addProperty(
        generalProperties,
        this.localizationService.loc('ProductDetailsSidebar.SectionGeneralInfo.DefaultMeasurement'),
        this.mapMeasurementsToString(productData.defaultMeasurement.height, productData.defaultMeasurement.width, productData.defaultMeasurement.depth)
      );
    }

    return generalProperties;
  }

  private generateMaterialGroups(productData: ProductDetailsOverviewDto): IPropertyGroup[] {
    const groups: IPropertyGroup[] = [];

    if (!productData.workPieces?.length)
      return groups;

    productData.workPieces?.forEach(workPiece => {
      const properties: ICardProperty[] = [];
      this.addProperty(properties, this.localizationService.loc('ProductDetailsSidebar.SectionMaterialGroups.Material'), workPiece.name);
      this.addProperty(properties, this.localizationService.loc('ProductDetailsSidebar.SectionMaterialGroups.FinalState'), workPiece.finishedState);
      const specificationNames: string = (workPiece.specifications ?? [])
        .map(spec => this.localizationService.getLocalizedSpecification(spec.name ?? '') ?? spec.name)
        .join(', ');
      this.addProperty(properties, this.localizationService.loc('ProductDetailsSidebar.SectionMaterialGroups.Specification'), specificationNames);

      groups.push(this.createPropertyGroup(properties, this.localizationService.getLocalizedMaterialGroupName(workPiece.materialGroup.name ?? '')))
    });

    return groups;
  }

  private generateMeasurementGroups(productData: ProductDetailsOverviewDto): IPropertyGroup[] {
    const groups: IPropertyGroup[] = [];

    if (!productData.measurements?.length)
      return [];

    const properties: ICardProperty[] = [];

    const sortedMeasurements: MeasurementDto[] = this.sortMeasurementsByPosition(productData.measurements);

    sortedMeasurements.forEach(measurement => {
      this.addProperty(properties, this.localizationService.loc('ProductDetailsSidebar.SectionVariants.Measurements.Key'), this.mapMeasurementsToString(measurement.height, measurement.width, measurement.depth))
    });

    if (properties.length) {
      groups.push(this.createPropertyGroup(properties, this.localizationService.loc('ProductDetailsSidebar.SectionVariants.Measurements.Title')));
    }

    return groups;
  }

  private sortMeasurementsByPosition(measurements: MeasurementDto[]): MeasurementDto[] {
    return measurements.sort((measurementA, measurementB) => {
      return (measurementA.position ?? 0) - (measurementB.position ?? 0);
    });
  }

  private mapMeasurementsToString(height: number, width: number, depth: number): string {
    const unit: string = this.localizationService.loc('Measurement.Unit');
    return [height, width, depth]
      .map(measurement => String(measurement) + unit)
      .join(', ');
  }

  private generateMaterialVariantsGroups(productData: ProductDetailsOverviewDto): IPropertyGroup[] {
    if (!productData.workPieceVariants || !productData.workPieceVariants.length)
      return [];

    const workPieceIdsByMaterialGroupName: { [key: string]: number[] } = {};
    productData.workPieces?.forEach((workPiece) => {
      if (!workPiece.materialGroup.name || !workPiece.workPieceId)
        return;

      if (!(workPiece.materialGroup.name in workPieceIdsByMaterialGroupName))
        workPieceIdsByMaterialGroupName[workPiece.materialGroup.name] = [];

      workPieceIdsByMaterialGroupName[workPiece.materialGroup.name].push(workPiece.workPieceId);
    });

    const workPieceVariantsByMaterialGroupName: { [key: string]: WorkPieceVariantDto[] } = {};
    Object.keys(workPieceIdsByMaterialGroupName).forEach((materialGroupName) => {
      workPieceVariantsByMaterialGroupName[materialGroupName] = productData.workPieceVariants?.filter(
        (workPieceVariant) => workPieceIdsByMaterialGroupName[materialGroupName].includes(workPieceVariant.workPieceId)
      ) ?? [];
    });

    const groups: IPropertyGroup[] = [];
    Object.keys(workPieceVariantsByMaterialGroupName).forEach((materialGroupName) => {
      if (!workPieceVariantsByMaterialGroupName[materialGroupName].length)
        return;
      const properties: ICardProperty[] = [];
      workPieceVariantsByMaterialGroupName[materialGroupName].forEach((workPieceVariant) => {
        this.addProperty(properties, this.addMaterialGroupName(this.localizationService.loc('ProductDetailsSidebar.SectionMaterialGroups.Material'), materialGroupName), workPieceVariant.description);
      });

      groups.push(this.createPropertyGroup(properties, this.addMaterialGroupName(this.localizationService.loc('ProductDetailsSidebar.SectionVariants.Materials.Title'), materialGroupName)));
    });

    return groups;
  }

  private addMaterialGroupName(prefix: string, materialGroupName: string): string {
    return `${prefix} (${this.localizationService.getLocalizedMaterialGroupName(materialGroupName)})`;
  }
}
