import {
  IColumnHeader,
  Row
} from 'hsu-library';
import {
  OrderStatus,
  OrderValueChainActionAdminDto, OrderValueChainActionProducerDto,
  OrderValueChainAdminDto,
} from '../../../shared/service-proxies/service-proxies';
import {
  IValueChainData
} from '../../../app/order-details/order-details-admin/order-details-admin.shared';

export abstract class IOrderValueChainTableService {
  public abstract getColumnHeadersAdmin(): IColumnHeader[];
  public abstract getColumnHeadersProducer(): IColumnHeader[];
  public abstract getTableRowAdmin(action: OrderValueChainActionAdminDto, orderStatus: OrderStatus): Row;
  public abstract getTableRowProducer(action: OrderValueChainActionProducerDto, currentProducerId: number): Row;
  public abstract mapValueChains(valueChains: OrderValueChainAdminDto[], orderStatus: OrderStatus): IValueChainData[];
}
