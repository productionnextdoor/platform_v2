import { Injectable } from '@angular/core';
import { IOrderTableService } from './iorders-table.service';
import {
  IColumnHeader,
  IOrderOverviewLocalisation,
  Row,
  TConstEnum
} from 'hsu-library';
import { AppLocalizationService } from '../../localization/app-localization.service';
import { ITableBaseService } from '../../table/itable-base.service';

export const  EOrderTableColumns : TConstEnum = {
  OrderNumberColumn : 'orderNumber',
  ProductNumberColumn : 'productNumber',
  ProductNameColumn : 'productName',
  OrderDateColumn : 'orderDate',
  OrderStatusColumn : 'state',
  OrderDetailsColumn : 'details'
} as const

export interface IOrdersFilter {
  maxResultCount: number;
  skipCount: number;
  sortOrder: string;
  searchInput: string;
  status?: number
}

export interface IOrderTableData{
  totalResultCount: number;
  rows: Row[];
}


@Injectable()
export abstract class OrderTableService extends IOrderTableService {

  protected constructor(
    protected readonly localizationService: AppLocalizationService,
    protected readonly tableBaseService: ITableBaseService,
  ) {
    super();
  }

  public override getColumnHeaders(): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader(EOrderTableColumns['OrderNumberColumn'], this.localizationService.loc('OrderOverviewTable.Header.OrderNumber'), true),
      this.tableBaseService.createTextColumnHeader(EOrderTableColumns['ProductNumberColumn'], this.localizationService.loc('OrderOverviewTable.Header.ProductNumber'), true),
      this.tableBaseService.createTextColumnHeader(EOrderTableColumns['ProductNameColumn'], this.localizationService.loc('OrderOverviewTable.Header.ProductName'), true),
      this.tableBaseService.createTextColumnHeader(EOrderTableColumns['OrderDateColumn'], this.localizationService.loc('OrderOverviewTable.Header.OrderDate'), true),
      this.tableBaseService.createTextColumnHeader(EOrderTableColumns['OrderStatusColumn'], this.localizationService.loc('OrderOverviewTable.Header.OrderStatus'), false),
      this.tableBaseService.createTextColumnHeader(EOrderTableColumns['OrderDetailsColumn'], this.localizationService.loc('OrderOverviewTable.Header.OrderDetails'), false),
    ];
  }

  public override getLocalisationStrings(): IOrderOverviewLocalisation {
    return {
      totalText: this.localizationService.loc('OrderOverviewTable.Total'),
      titleOrderOverview: this.localizationService.loc('OrderOverviewTable.OrderTitle'),
      searchBarTexts: {
        label: this.localizationService.loc('OrderOverviewTable.SearchLabel'),
        placeholder: this.localizationService.loc('OrderOverviewTable.SearchPlaceholder'),
      },
      stateFilterTexts: {
        label: this.localizationService.loc('OrderOverviewTable.FilterLabel'),
        placeholder: this.localizationService.loc('OrderOverviewTable.FilterPlaceholder'),
      }
    }
  }
}
