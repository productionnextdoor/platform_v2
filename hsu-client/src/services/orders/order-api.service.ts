import { Injectable } from '@angular/core';
import {
  AcceptOrRejectActionInputDto, ActionReRequestDto,
  ActionStatus,
  AdminOrderDetailsOutput,
  OrderDetailsBaseOutput,
  OrderDetailsServiceProxy,
  OrderProducerRequestOutput,
  OrderServiceProxy,
  OrderValueChainProducerDto,
  PagedResultDtoOfOrderListAdminDto,
  PagedResultDtoOfOrderListProducerDto,
} from '../../shared/service-proxies/service-proxies';
import {
  map,
  Observable,
} from 'rxjs';
import { IOrderApiService } from './iorder-api.service';
import { IOrdersFilter } from './order-table/orders-table.service';
import { ICardSectionData } from 'hsu-library';
import { AppLocalizationService } from '../localization/app-localization.service';
import { IProducerOrderActionData } from '../../app/order-details/order-details-producer/order-details-producer.shared';

@Injectable()
export class OrderApiService extends IOrderApiService {
  constructor(
    private readonly orderServiceProxy: OrderServiceProxy,
    private readonly orderDetailsServiceProxy: OrderDetailsServiceProxy,
    private readonly localizationService: AppLocalizationService,
  ) {
    super();
  }

  public getFilteredOrdersAdmin(productFilter: IOrdersFilter): Observable<PagedResultDtoOfOrderListAdminDto> {
    return this.orderServiceProxy.getOrdersAdmin(productFilter.status, productFilter.searchInput, productFilter.sortOrder, productFilter.maxResultCount, productFilter.skipCount);
  }

  public getFilteredOrdersProducer(productFilter: IOrdersFilter): Observable<PagedResultDtoOfOrderListProducerDto> {
    return this.orderServiceProxy.getOrdersProducer(productFilter.searchInput, productFilter.sortOrder, productFilter.maxResultCount, productFilter.skipCount);
  }

  public getOrderDetailsAdmin(orderId: number): Observable<AdminOrderDetailsOutput> {
    return this.orderDetailsServiceProxy.getOrderDetailsForAdmin(orderId);
  }

  public getOrderCommissionedValueChainProducer(orderId: number): Observable<OrderValueChainProducerDto> {
    return this.orderDetailsServiceProxy.getOrderCommissionedValueChainProducer(orderId);
  }

  public getProducerOrderStatus(orderId: number): Observable<ActionStatus> {
    return this.orderServiceProxy.getProducerOrderStatus(orderId);
  }

  public getOrderActionsData(orderId: number): Observable<IProducerOrderActionData[]> {
    return this.orderDetailsServiceProxy
      .getOrderProducerRequests(orderId)
      .pipe(
        map(this.mapOrderRequestData.bind(this))
      );
  }

  public acceptOrRejectActionRequest(orderId: number, stepId: number, accept: boolean): Observable<void> {
    return this.orderDetailsServiceProxy
      .acceptOrRejectActionRequest(new AcceptOrRejectActionInputDto({
        orderId: orderId,
        productionStepId: stepId,
        accept: accept
      }));
  }

  public getProducerOrderDetails(orderId: number): Observable<OrderDetailsBaseOutput> {
    return this.orderDetailsServiceProxy.getProducerOrderDetails(orderId);
  }

  public startFinishValueChainAction(valueChainActionId: number, start: boolean): Observable<void> {
    return this.orderDetailsServiceProxy.startFinishValueChainAction(valueChainActionId, start)
  }

  public reRequestProductionAction(productionStepId: number, orderId: number): Observable<void> {
    return this.orderDetailsServiceProxy.reRequestProducer(new ActionReRequestDto({
      stepId: productionStepId,
      orderId: orderId
    }));
  }

  public cancelOrder(orderId: number): Observable<void> {
    return this.orderServiceProxy.cancelOrder(orderId);
  }

  private mapOrderRequestData(orderActionData: OrderProducerRequestOutput[]): IProducerOrderActionData[] {
    return orderActionData.map(item => {
      return {
        stepId: item.productionStepId,
        responseNeeded: item.status === ActionStatus.Open,
        badgeText: this.getBadgeText(item.status),
        badgeNegative: item.status !== ActionStatus.Accepted,
        actionData: {
          startStateName: item.startStateName ?? '',
          endStateName: item.finalStateName ?? '',
          baseInfo: this.getBaseInfo(item),
          workTime: this.getWorkTime(item),
          income: this.getCalculated(item),
          calculation: this.getCalculation(item)
        }
      };
    });
  }

  private getCalculation(item: OrderProducerRequestOutput): ICardSectionData {
    return {
      title: this.localizationService.loc('OrderDetails.ProducerRequestCard.Costs.Title.Calculated'),
      properties: [
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.Costs.WorkCost'),
          value: `${item.workCalculated.toFixed(2)} €`
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.Costs.MaterialAndTransport'),
          value: `${item.materialAndTransportationsCalculated.toFixed(2)} €`
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.Costs.Total'),
          value: `${(item.workCalculated + item.materialAndTransportationsCalculated).toFixed(2)} €`
        },
      ]
    };
  }

  private getCalculated(item: OrderProducerRequestOutput): ICardSectionData {
    return {
      title: this.localizationService.loc('OrderDetails.ProducerRequestCard.Costs.Title.Income'),
      properties: [
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.Costs.WorkCost'),
          value: item.workIncomeMin === item.workIncomeMax
            ? `${item.workIncomeMax.toFixed(2)} €`
            : `${item.workIncomeMin.toFixed(2)} - ${item.workIncomeMax.toFixed(2)} €`
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.Costs.MaterialAndTransport'),
          value: item.materialAndTransportationsIncomeMin === item.materialAndTransportationsIncomeMax
            ? `${item.materialAndTransportationsIncomeMax.toFixed(2)} €`
            : `${item.materialAndTransportationsIncomeMin.toFixed(2)} - ${item.materialAndTransportationsIncomeMax.toFixed(2)} €`
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.Costs.Total'),
          value: item.workIncomeMin + item.materialAndTransportationsIncomeMin === item.workIncomeMax + item.materialAndTransportationsIncomeMax
            ? `${(item.workIncomeMin + item.materialAndTransportationsIncomeMin).toFixed(2)} €`
            : `${(item.workIncomeMin + item.materialAndTransportationsIncomeMin).toFixed(2)} - ${(item.workIncomeMax + item.materialAndTransportationsIncomeMax).toFixed(2)} €`
        },
      ]
    };
  }

  private getWorkTime(item: OrderProducerRequestOutput): ICardSectionData {
    return {
      title: this.localizationService.loc('OrderDetails.ProducerRequestCard.WorkTime.Title'),
      properties: [
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.WorkTime.ProcessingTime'),
          value: `${item.processingTimeInWeeks} Wochen`
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.WorkTime.WorkHours'),
          value: `${item.workHours} Stunden`
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.WorkTime.ProcessingFrom'),
          value: `KW ${item.workStart}`
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.WorkTime.ProcessingTo'),
          value: `KW ${item.workEnd}`
        },
      ]
    };
  }

  private getBaseInfo(item: OrderProducerRequestOutput): ICardSectionData {
    return {
      title: this.localizationService.loc('OrderDetails.ProducerRequestCard.BaseInfo.Title'),
      properties: [
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.BaseInfo.Measurement'),
          value: `${item.measurement.height} cm, ${item.measurement.width} cm, ${item.measurement.depth} cm`
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.BaseInfo.Material'),
          value: item.material ?? ''
        },
        {
          key: this.localizationService.loc('OrderDetails.ProducerRequestCard.BaseInfo.DeliveryTime'),
          value: `KW ${item.deliveryWindowInWeeks}`
        },
      ]
    };
  }

  private getBadgeText(status: ActionStatus): string {
    switch (status) {
    case ActionStatus.Rejected:
      return this.localizationService.loc('OrderDetails.ProducerRequestCard.Badge.Reject')
    case ActionStatus.Accepted:
      return this.localizationService.loc('OrderDetails.ProducerRequestCard.Badge.Accept')
    default:
      return '';
    }
  }
}
