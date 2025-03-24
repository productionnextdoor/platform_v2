import {
  ActionStatus,
  ProductionStatus,
  OrderStatus
} from '../../shared/service-proxies/service-proxies';

export abstract class IProductionStatusService {

  public abstract getOrderStatusLocalisationMap(): Map<OrderStatus, string>;

  public abstract getValueChainStatusMap(): Map<ProductionStatus, string>;

  public abstract getActionStatusLocalisationMap(): Map<ActionStatus, string>;
}
