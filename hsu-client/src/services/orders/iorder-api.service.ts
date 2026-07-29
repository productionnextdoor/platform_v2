import { Observable } from 'rxjs';
import {
  ActionStatus,
  AdminOrderDetailsOutput, OrderDetailsBaseOutput, OrderValueChainProducerDto,
  PagedResultDtoOfOrderListAdminDto,
  PagedResultDtoOfOrderListProducerDto
} from '../../shared/service-proxies/service-proxies';
import { IOrdersFilter } from './order-table/orders-table.service';
import { IProducerOrderActionData } from '../../app/order-details/order-details-producer/order-details-producer.shared';



export abstract class IOrderApiService {

  abstract getFilteredOrdersAdmin(productFilter: IOrdersFilter): Observable<PagedResultDtoOfOrderListAdminDto>;
  abstract getFilteredOrdersProducer(productFilter: IOrdersFilter): Observable<PagedResultDtoOfOrderListProducerDto>;
  abstract getOrderDetailsAdmin(orderId: number): Observable<AdminOrderDetailsOutput>;
  abstract getProducerOrderStatus(orderId: number): Observable<ActionStatus>;
  abstract getOrderActionsData(orderId: number):Observable<IProducerOrderActionData[]>;
  abstract getProducerOrderDetails(orderId: number):Observable<OrderDetailsBaseOutput>;
  abstract startFinishValueChainAction(valueChainActionId: number, start: boolean): Observable<void>
  abstract getOrderCommissionedValueChainProducer(orderId:number): Observable<OrderValueChainProducerDto>;
  abstract acceptOrRejectActionRequest(orderId: number, stepId: number, accept: boolean): Observable<void>;
  abstract reRequestProductionAction(productionStepId: number, orderId: number): Observable<void>;
  abstract cancelOrder(orderId: number): Observable<void>;
}
