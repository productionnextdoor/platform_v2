import { Injectable } from '@angular/core';
import {
  EActionButtonElementType,
  Icon,
  PmDropdownOption,
  Row,
  IColumnHeader
} from 'hsu-library';
import {
  ProductListDto,
  ProductState
} from '../../../shared/service-proxies/service-proxies';
import {
  ETableColumns,
  EWizardType,
  ProductTableBaseService
} from './product-table-base.service';
import { AppLocalizationService } from '../../localization/app-localization.service';
import { AppConsts } from '../../../shared/AppConsts';
import { ITableBaseService } from '../../table/itable-base.service';


@Injectable()
export class ProducerProductTableService extends ProductTableBaseService {

  private readonly blockedFilterOptions: ProductState[] = [
    ProductState.Draft,
    ProductState.InProcessDeveloper,
    ProductState.ReadyForValueChainPlanning,
  ]
  constructor(localizationService: AppLocalizationService, tableBaseService: ITableBaseService) {
    super(localizationService, tableBaseService, EWizardType.NoWizard);
    this.initProductStateEnumMap();
  }

  // just for configuration
  public override getColumnHeaders(): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductNumberColumn, this.localizationService.loc('ProductTableHeader.ProductNumber'), true),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductNameColumn, this.localizationService.loc('ProductTableHeader.ProductName'), true),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductCreatedAtColumn, this.localizationService.loc('ProductTableHeader.CreatedAt'), true),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductUpdatedAtColumn, this.localizationService.loc('ProductTableHeader.UpdatedAt'), true),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductProcessingDeadline, this.localizationService.loc('ProductTableHeader.ProcessingDeadline'), false),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductStateColumn, this.localizationService.loc('ProductTableHeader.Status'), false),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductDetailsColumn, this.localizationService.loc('ProductTableHeader.Details'), false),
    ];
  }

  public override getTableRow(item: ProductListDto): Row {
    return {
      rowId: item.id,
      isHighlighted: false,
      cells: [
        this.tableBaseService.createTextCell(item.productNumber.toString()),
        this.tableBaseService.createTextCell(item.name ?? ''),
        this.tableBaseService.createTextCell(item.creationTime.toFormat(AppConsts.DateFormatString)),
        this.tableBaseService.createTextCell(item.lastModificationTime?.toFormat(AppConsts.DateFormatString) ?? '-'),
        this.tableBaseService.createTextCell(item.processingDeadline ? (this.localizationService.loc('ProductTableTexts.Until') + ' ' + item.processingDeadline.toFormat(AppConsts.DateFormatString)) : '-'),
        this.tableBaseService.createStatusCell(this.productStateEnumMap.get(item.state) ?? ''),
        this.tableBaseService.createActionCell(this.getActionIcon(), '', this.getActionType())
      ]
    }
  }

  public override getStateOptions(): PmDropdownOption<string>[] {
    return super.getStateOptions(this.blockedFilterOptions);
  }

  protected override getActionIcon(): Icon {
    return Icon.ARROW;
  }

  protected override getActionType(): EActionButtonElementType {
    return EActionButtonElementType.PRODUCT_DETAILS;
  }
}
