import {
  Injectable
} from '@angular/core';
import {
  IColumnHeader,
  IProductOverviewLocalisation,
  Row,
  PmDropdownOption
} from 'hsu-library';
import {
  ProductListDto,
  ProductState
} from '../../../shared/service-proxies/service-proxies';
import {
  IProductTableService
} from './iproduct-table.service';
import {
  AppLocalizationService
} from '../../localization/app-localization.service';
import { AppConsts } from '../../../shared/AppConsts';
import { ITableBaseService } from '../../table/itable-base.service';

export const enum ETableColumns {
  ProductNumberColumn = 'productNumber',
  ProductNameColumn = 'name',
  ProductCreatedAtColumn = 'creationTime',
  ProductUpdatedAtColumn = 'lastModificationTime',
  ProductStateColumn = 'state',
  ProductDetailsColumn = 'details',
  ProductProcessingDeadline = 'ProductProcessingDeadline'
}

export enum EWizardType {
  NoWizard = '',
  BaseProductWizard ='baseProductWizard',
  DeveloperProductWizard = 'developerProductWizard'
}


export interface IProductFilter {
  maxResultCount: number;
  skipCount: number;
  sortOrder: string;
  searchInput: string;
  state?: ProductState;
}

@Injectable()
export abstract class ProductTableBaseService extends IProductTableService {

  protected productStateEnumMap: Map<ProductState, string> = new Map<ProductState, string>();

  protected constructor(
    protected readonly localizationService: AppLocalizationService,
    protected readonly tableBaseService: ITableBaseService,
    protected wizardType: EWizardType
  ) {
    super();
    this.initProductStateEnumMap();
  }

  public getColumnHeaders(): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductNumberColumn, this.localizationService.loc('ProductTableHeader.ProductNumber'), true),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductNameColumn, this.localizationService.loc('ProductTableHeader.ProductName'), true),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductCreatedAtColumn, this.localizationService.loc('ProductTableHeader.CreatedAt'), true),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductUpdatedAtColumn, this.localizationService.loc('ProductTableHeader.UpdatedAt'), true),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductStateColumn, this.localizationService.loc('ProductTableHeader.Status'), false),
      this.tableBaseService.createTextColumnHeader(ETableColumns.ProductDetailsColumn, this.localizationService.loc('ProductTableHeader.Details'), false),
    ];
  }

  public getTableRow(item: ProductListDto): Row {
    return {
      rowId: item.id,
      isHighlighted: false,
      cells: [
        this.tableBaseService.createTextCell(item.productNumber.toString()),
        this.tableBaseService.createTextCell(item.name ?? ''),
        this.tableBaseService.createTextCell(item.creationTime.toFormat(AppConsts.DateFormatString)),
        this.tableBaseService.createTextCell(item.lastModificationTime?.toFormat(AppConsts.DateFormatString) ?? '-'),
        this.tableBaseService.createStatusCell(this.productStateEnumMap.get(item.state) ?? ''),
        this.tableBaseService.createActionCell(this.getActionIcon(item.state), '', this.getActionType(item.state))
      ]
    }
  }

  public getLocalisationStrings():IProductOverviewLocalisation
  {
    return {
      totalText: this.localizationService.loc('ProductTableTexts.Total'),
      buttonLabel: this.localizationService.loc('ProductTableHeader.AdminButton'),
      titleAdminOverview: this.localizationService.loc('ProductTableHeader.AdminTitle'),
      searchBarTexts: {
        label: this.localizationService.loc('ProductTableTexts.SearchLabel'),
        placeholder: this.localizationService.loc('ProductTableTexts.SearchPlaceholder'),
      },
      stateFilterTexts: {
        label: this.localizationService.loc('ProductTableTexts.FilterLabel'),
        placeholder: this.localizationService.loc('ProductTableTexts.FilterPlaceholder'),
      }
    }
  }

  public getStateOptions(blockedFilterOptions: ProductState[] = []){
    const statusFilterOptions: PmDropdownOption<string>[] = [
      {
        value: this.localizationService.loc('ProductTableState.NoFilter'),
        key: ''
      }
    ];

    for (const state in ProductState) {
      //enum iteration gives both numeric and string values, we need only the string options
      const value: string | number = ProductState[state]
      if (typeof value !== 'string' && !blockedFilterOptions.includes(value)) {
        statusFilterOptions.push({
          value: this.productStateEnumMap.get(value) ?? '',
          key: value
        })
      }
    }
    return statusFilterOptions;
  }

  public getWizardType(): EWizardType {
    return this.wizardType;
  }

  protected initProductStateEnumMap() {
    this.productStateEnumMap = new Map<ProductState, string>([
      [ProductState.Draft, this.localizationService.loc('ProductTableState.Draft')],
      [ProductState.InProcessDeveloper, this.localizationService.loc('ProductTableState.InProcessDeveloper')],
      [ProductState.InProcessProducer, this.localizationService.loc('ProductTableState.InProcessProducer')],
      [ProductState.ReadyForValueChainPlanning, this.localizationService.loc('ProductTableState.ReadyForValueChainPlanning')],
      [ProductState.Live, this.localizationService.loc('ProductTableState.Live')],
      [ProductState.Locked, this.localizationService.loc('ProductTableState.Locked')],
      [ProductState.ValueChainExtension, this.localizationService.loc('ProductTableState.ValueChainExtension')],
      [ProductState.InProcessAdmin, this.localizationService.loc('ProductTableState.InProcessAdmin')],
      [ProductState.ProductionReady, this.localizationService.loc('ProductTableState.ProductionReady')]

    ]);
  }


}

