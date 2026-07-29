import {
  ActionStatus,
  IPagedResultDtoOfOrderListProducerDto,
  OrderListProducerDto
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
export class OrdersTableProducerService extends OrderTableService {

  protected actionStatusEnumLocalizationMap: Map<ActionStatus, string> = new Map<ActionStatus, string>();

  public constructor(
    localizationService: AppLocalizationService,
    tableBaseService: ITableBaseService,
    private readonly ordersApiService: IOrderApiService,
    private readonly productionStatusesService: IProductionStatusService
  ) {
    super(localizationService, tableBaseService);
    this.actionStatusEnumLocalizationMap = this.productionStatusesService.getActionStatusLocalisationMap();
  }

  public override getTableRows(filter: IOrdersFilter): Observable<IOrderTableData> {
    return this.ordersApiService
      .getFilteredOrdersProducer(filter)
      .pipe(
        map((result: IPagedResultDtoOfOrderListProducerDto) => {
          return {
            totalResultCount: result.totalCount,
            rows: result.items ? result.items.map(order => this.getTableRow(order)) : []
          };
        })
      )
  }

  public override getStatusOptions(): PmDropdownOption<string>[] {
    return [];
  }

  private getTableRow(item: OrderListProducerDto): Row {
    return {
      rowId: item.orderId,
      isHighlighted: false,
      cells: [
        this.tableBaseService.createTextCell(item.orderNumber.toString()),
        this.tableBaseService.createTextCell(item.productNumber.toString()),
        this.tableBaseService.createTextCell(item.productName ?? ''),
        this.tableBaseService.createTextCell(item.orderDate?.toFormat(AppConsts.DateFormatString) ?? '-'),
        this.tableBaseService.createStatusCell(this.actionStatusEnumLocalizationMap.get(item.status) ?? ''),
        this.tableBaseService.createActionCell(Icon.ARROW, '', EActionButtonElementType.ORDER_DETAILS)
      ]
    }
  }


}
