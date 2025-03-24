import {
  ActionStatus,
  ProductionStatus,
  OrderStatus
} from '../../shared/service-proxies/service-proxies';
import { Injectable } from '@angular/core';
import {
  EValueChainStatus,
  ValueChainStatusValues
} from 'hsu-library';
import { AppLocalizationService } from '../localization/app-localization.service';
import { IProductionStatusService } from './iproduction-status.service';


@Injectable()
export class ProductionStatusService extends IProductionStatusService {

  public constructor(
    protected readonly localizationService: AppLocalizationService,
  ) {
    super();
  }

  public getOrderStatusLocalisationMap(): Map<OrderStatus, string> {
    return new Map<OrderStatus, string>([
      [OrderStatus.Open, this.localizationService.loc('OrderOverviewTable.Filter.Open')],
      [OrderStatus.Commissioned, this.localizationService.loc('OrderOverviewTable.Filter.Commissioned')],
      [OrderStatus.InProgress, this.localizationService.loc('OrderOverviewTable.Filter.InProgress')],
      [OrderStatus.Completed, this.localizationService.loc('OrderOverviewTable.Filter.Completed')],
      [OrderStatus.NotDone, this.localizationService.loc('OrderOverviewTable.Filter.NotDone')],
      [OrderStatus.Cancelled, this.localizationService.loc('OrderOverviewTable.Filter.Cancelled')],
    ]);
  }


  public getValueChainStatusMap(): Map<ProductionStatus, ValueChainStatusValues> {
    return new Map<ProductionStatus, ValueChainStatusValues>([
      [ProductionStatus.Selected, EValueChainStatus['Selected']],
      [ProductionStatus.Rejected, EValueChainStatus['Rejected']],
      [ProductionStatus.Commissioned, EValueChainStatus['Commissioned']],
      [ProductionStatus.InProgress, EValueChainStatus['InProgress']],
      [ProductionStatus.Completed, EValueChainStatus['Completed']],
      [ProductionStatus.Cancelled, EValueChainStatus['Canceled']],
    ]);
  }

  public getActionStatusLocalisationMap(): Map<ActionStatus, string> {
    return new Map<ActionStatus, string>([
      [ActionStatus.Open, this.localizationService.loc('OrderDetails.ValueChainTable.ActionStatus.Open')],
      [ActionStatus.Rejected, this.localizationService.loc('OrderDetails.ValueChainTable.ActionStatus.Rejected')],
      [ActionStatus.Accepted, this.localizationService.loc('OrderDetails.ValueChainTable.ActionStatus.Accepted')],
      [ActionStatus.Commissioned, this.localizationService.loc('OrderDetails.ValueChainTable.ActionStatus.Commissioned')],
      [ActionStatus.NotCommissioned, this.localizationService.loc('OrderDetails.ValueChainTable.ActionStatus.NotCommissioned')],
      [ActionStatus.InProgress, this.localizationService.loc('OrderDetails.ValueChainTable.ActionStatus.InProgress')],
      [ActionStatus.Completed, this.localizationService.loc('OrderDetails.ValueChainTable.ActionStatus.Completed')],
      [ActionStatus.Cancelled, this.localizationService.loc('OrderDetails.ValueChainTable.ActionStatus.Cancelled')],
    ]);
  }
}
