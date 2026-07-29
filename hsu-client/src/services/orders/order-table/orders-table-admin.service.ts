import {
  OrderStatus,
  IPagedResultDtoOfOrderListAdminDto,
  OrderListAdminDto
} from '../../../shared/service-proxies/service-proxies';
import { Injectable } from '@angular/core';
import {
  PmDropdownOption,
  Row,
  EActionButtonElementType,
  Icon
} from 'hsu-library';
import { AppLocalizationService } from '../../localization/app-localization.service';
import { ITableBaseService } from '../../table/itable-base.service';
import { AppConsts } from '../../../shared/AppConsts';
import {
  IOrdersFilter,
  IOrderTableData,
  OrderTableService
} from './orders-table.service';
import { IOrderApiService } from '../iorder-api.service';
import { map, Observable } from 'rxjs';
import { IProductionStatusService } from '../iproduction-status.service';

@Injectable()
export class OrdersTableAdminService extends OrderTableService {

  protected orderEnumLocalizationMap: Map<OrderStatus, string> = new Map<OrderStatus, string>();

  public constructor(
    localizationService: AppLocalizationService,
    tableBaseService: ITableBaseService,
    private readonly ordersApiService: IOrderApiService,
    private readonly productionStatusesService: IProductionStatusService
  ) {
    super(localizationService, tableBaseService);
    this.orderEnumLocalizationMap = this.productionStatusesService.getOrderStatusLocalisationMap();
  }

  public override getTableRows(filter: IOrdersFilter): Observable<IOrderTableData> {
    return this.ordersApiService
      .getFilteredOrdersAdmin(filter)
      .pipe(
        map((result: IPagedResultDtoOfOrderListAdminDto) => ({
          totalResultCount: result.totalCount,
          rows: result.items ? result.items.map(order => this.getTableRow(order)) : []
        }))
      )
  }

  private getTableRow(item: OrderListAdminDto): Row {
    return {
      rowId: item.orderId,
      isHighlighted: false,
      cells: [
        this.tableBaseService.createTextCell(item.orderNumber.toString()),
        this.tableBaseService.createTextCell(item.productNumber.toString()),
        this.tableBaseService.createTextCell(item.productName ?? ''),
        this.tableBaseService.createTextCell(item.orderDate?.toFormat(AppConsts.DateFormatString) ?? '-'),
        this.tableBaseService.createStatusCell(this.orderEnumLocalizationMap.get(item.status) ?? ''),
        this.tableBaseService.createActionCell(Icon.ARROW, '', EActionButtonElementType.ORDER_DETAILS)
      ]
    }
  }

  public override getStatusOptions(): PmDropdownOption<string>[] {
    const statusFilterOptions: PmDropdownOption<string>[] = [
      {
        value: this.localizationService.loc('OrderOverviewTable.Filter.NoFilter'),
        key: ''
      }
    ];

    Object
      .keys(OrderStatus)
      .filter(key => !isNaN(Number(key)))
      .map(orderStatus => {
        statusFilterOptions.push({
          value: this.orderEnumLocalizationMap.get(Number(orderStatus)) ?? '',
          key: orderStatus
        });
      });
    return statusFilterOptions;
  }
}
