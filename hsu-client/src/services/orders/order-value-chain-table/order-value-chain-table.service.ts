import {
  ActionStatus, OrderStatus,
  OrderValueChainActionAdminDto,
  OrderValueChainActionProducerDto,
  OrderValueChainAdminDto,
  ProductionStatus,
  ValueChainActionProducerDto,
  ValueChainActionStepDto
} from '../../../shared/service-proxies/service-proxies';
import { Injectable } from '@angular/core';
import {
  EActionButtonElementType,
  EValueChainStatus,
  IColumnHeader, Icon,
  PmCheckboxState,
  Row
} from 'hsu-library';
import { AppLocalizationService } from '../../localization/app-localization.service';
import { ITableBaseService } from '../../table/itable-base.service';
import { IOrderValueChainTableService } from './iorder-value-chain-table.service';
import {  IValueChainData} from '../../../app/order-details/order-details-admin/order-details-admin.shared';
import { AppConsts } from '../../../shared/AppConsts';
import { IProductionStatusService } from '../iproduction-status.service';

export const enum EValueChainColumns {
  MaterialColumn = 'material',
  StartStateColumn = 'startState',
  FinalStateColumn = 'finalState',
  StatusColumn = 'status',
  ProcessingTimeColumn = 'processingTime',
  ProcessingFrom = 'processingFrom',
  ProcessingTo = 'processingTo',
  ProducerNameColumn = 'producerName',
  WorkTypeColumn = 'workType',
  AddressColumn = 'address',
  EmailColumn = 'email',
  PhoneNumberColumn = 'phoneNumber',
}

@Injectable()
export class OrderValueChainTableService extends IOrderValueChainTableService {

  protected valueChainActionStatusEnumLocalizationMap: Map<ActionStatus, string> = new Map<ActionStatus, string>();
  private valueChainStatusEnumMap: Map<ProductionStatus, string> = new Map<ProductionStatus, string>();


  public constructor(
    protected readonly localizationService: AppLocalizationService,
    protected readonly tableBaseService: ITableBaseService,
    protected readonly productionStatusesService: IProductionStatusService
  ) {
    super();
    this.valueChainActionStatusEnumLocalizationMap = this.productionStatusesService.getActionStatusLocalisationMap();
    this.valueChainStatusEnumMap = this.productionStatusesService.getValueChainStatusMap();
  }

  public override getColumnHeadersAdmin(): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader('', '', false),
      ...this.getColumnHeaderActionInfo(),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.ProcessingTimeColumn, this.localizationService.loc('OrderDetails.ValueChainTable.ProcessingTime'), false),
      ...this.getColumnHeaderProducerInfo(),
    ];
  }

  public override getColumnHeadersProducer(): IColumnHeader[] {
    return [
      this.tableBaseService.createTextColumnHeader('', '', false),
      ...this.getColumnHeaderActionInfo(),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.ProcessingFrom, this.localizationService.loc('OrderDetails.ValueChainTable.ProcessingFrom'), false),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.ProcessingTo, this.localizationService.loc('OrderDetails.ValueChainTable.ProcessingTo'), false),
      ...this.getColumnHeaderProducerInfo(),
    ];
  }

  public override getTableRowAdmin(action: OrderValueChainActionAdminDto, orderStatus: OrderStatus): Row {

    return {
      rowId: action.productionStepId,
      isHighlighted: false,
      cells: [
        this.tableBaseService.createActionCell(
          Icon.RELOAD,
          '',
          EActionButtonElementType.RE_REQUEST_ACTION,
          !((orderStatus === OrderStatus.Open || orderStatus === OrderStatus.NotDone) && action.status === ActionStatus.Rejected)),
        ...this.getTableRowActionInfo(action.actionStepDto, action.status),
        this.tableBaseService.createTextCell(action.processingTimeInWeeks.toString() + ' ' + this.localizationService.loc('ValueChainPlanning.Units.Weeks') ?? ''),
        ...this.getTableRowProducerInfo(action.producerDto)
      ]
    }
  }

  public override getTableRowProducer(action: OrderValueChainActionProducerDto, currentProducerId: number): Row {

    return {
      rowId: action.orderValueChainActionId,
      isHighlighted: false,
      cells: [
        this.tableBaseService.createCheckboxCell(PmCheckboxState.DEFAULT, action.producerId !== currentProducerId || action.status === ActionStatus.Completed),
        ...this.getTableRowActionInfo(action.actionStepDto, action.status),
        this.tableBaseService.createTextCell(this.localizationService.loc('ValueChainPlanning.Units.CalendarWeek') + ' ' + (action.processingFrom.toString() ?? '')),
        this.tableBaseService.createTextCell(this.localizationService.loc('ValueChainPlanning.Units.CalendarWeek') + ' ' + (action.processingTo.toString() ?? '')),
        ...this.getTableRowProducerInfo(action.producerDto)
      ]
    }
  }

  public mapValueChains(valueChains: OrderValueChainAdminDto[], orderStatus: OrderStatus): IValueChainData[] {

    const vcpOrder: string[] = Object.values(EValueChainStatus);
    return valueChains?.sort((valueChainA, valueChainB) => {
      return valueChainA.requestDate.toMillis() - valueChainB.requestDate.toMillis();
    })
      .map((item, index) => this.mapValueChainData(item, index,orderStatus))
      .sort((valueChainA, valueChainB) => {
        return vcpOrder.indexOf(valueChainA.status) - vcpOrder.indexOf(valueChainB.status);
      }) ?? [];
  }

  private getColumnHeaderActionInfo() {
    return [
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.MaterialColumn, this.localizationService.loc('OrderDetails.ValueChainTable.Material'), false),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.StartStateColumn, this.localizationService.loc('OrderDetails.ValueChainTable.StartState'), false),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.FinalStateColumn, this.localizationService.loc('OrderDetails.ValueChainTable.FinalState'), false),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.StatusColumn, this.localizationService.loc('OrderDetails.ValueChainTable.Status'), false)
    ]
  }

  private getColumnHeaderProducerInfo() {
    return [
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.ProducerNameColumn, this.localizationService.loc('OrderDetails.ValueChainTable.ProducerName'), false),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.WorkTypeColumn, this.localizationService.loc('OrderDetails.ValueChainTable.WorkType'), false),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.AddressColumn, this.localizationService.loc('OrderDetails.ValueChainTable.Address'), false),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.EmailColumn, this.localizationService.loc('OrderDetails.ValueChainTable.Email'), false),
      this.tableBaseService.createTextColumnHeader(EValueChainColumns.PhoneNumberColumn, this.localizationService.loc('OrderDetails.ValueChainTable.PhoneNumber'), false),
    ]
  }

  private getTableRowActionInfo(actionStepDto: ValueChainActionStepDto, status: ActionStatus) {
    const {
      materialName = '',
      startStateName = '',
      endStateName = '',
    } = actionStepDto;

    return [
      this.tableBaseService.createTextCell(materialName),
      this.tableBaseService.createTextCell(startStateName),
      this.tableBaseService.createTextCell(endStateName),
      this.tableBaseService.createStatusCell(this.valueChainActionStatusEnumLocalizationMap.get(status) ?? ''),
    ]
  }

  private getTableRowProducerInfo(producerDto: ValueChainActionProducerDto) {
    const {
      name: producerName = '',
      workType = '',
      street = '',
      zipCode = '',
      city = '',
      email = '',
      phone = '',
    } = producerDto;

    return [
      this.tableBaseService.createTextCell(producerName),
      this.tableBaseService.createTextCell(`${this.localizationService.getLocalizedTradeTypeName(workType)}`),
      this.tableBaseService.createTextCell(this.tableBaseService.mapAddress(street, zipCode, city)),
      this.tableBaseService.createTextCell(email),
      this.tableBaseService.createTextCell(phone),
    ]
  }

  private mapValueChainData(ovcDto: OrderValueChainAdminDto, index: number, orderStatus: OrderStatus): IValueChainData {
    return {
      index: index + 1,
      requestDate: ovcDto.requestDate.toFormat(AppConsts.DateFormatString),
      status: this.valueChainStatusEnumMap.get(ovcDto.status) ?? EValueChainStatus['Selected'],
      rowData: ovcDto.valueChainActions?.map(action => this.getTableRowAdmin(action,orderStatus)) ?? [],
    };
  }
}
