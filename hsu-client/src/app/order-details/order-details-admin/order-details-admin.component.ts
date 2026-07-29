import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  defaultBreadcrumbs,
  IActionEvent,
  IBreadcrumbs,
  IColumnHeader,
} from 'hsu-library';
import {
  IOrderDetailsAdminLocalisation,
  IValueChainData,
  orderDetailsAdminLocalisation,
  topValueChainStatuses
} from './order-details-admin.shared';

import { IOrderApiService } from '../../../services/orders/iorder-api.service';
import {
  IOrderValueChainTableService
} from '../../../services/orders/order-value-chain-table/iorder-value-chain-table.service';
import {
  ICustomerInfoCard,
  IOrderDetailsPageService,
  IProductInfoCard
} from '../../../services/orders/iorder-details-page.service';
import { IOrderFileService } from '../../../services/orders/iorder-file.service';
import {
  finalize,
  map,
  Observable
} from 'rxjs';
import { IUiService } from '../../../services/utils/iui.service';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import { OrderStatus } from '../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'order-details-admin',
  templateUrl: './order-details-admin.component.html'
})
export class OrderDetailsAdminComponent extends WithRx() implements OnInit {

  @Input()
  orderId: number = 0;

  protected productName: string = '';
  protected topValueChainData?: IValueChainData[] = [];
  protected bottomValueChainData: IValueChainData[] = [];
  protected productInfoCard?: IProductInfoCard;
  protected customerInfoCard?: ICustomerInfoCard;
  protected columnHeaders: IColumnHeader[] = [];
  protected localisations: IOrderDetailsAdminLocalisation = orderDetailsAdminLocalisation;
  protected breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;
  protected isCancelDisabled: boolean = true;

  constructor(
    private readonly orderApiService: IOrderApiService,
    private readonly valueChainTableService: IOrderValueChainTableService,
    private readonly detailsPageService: IOrderDetailsPageService,
    private readonly orderFileService: IOrderFileService,
    private readonly uiService: IUiService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.columnHeaders = this.valueChainTableService.getColumnHeadersAdmin()
    this.localisations = this.detailsPageService.getLocalisationsAdmin()
    this.setValueChainsData().subscribe();
  }

  protected ReRequestAction(action: IActionEvent): void {
    this.uiService.showBusyIndicator();
    this.orderApiService
      .reRequestProductionAction(action.rowId, this.orderId)
      .pipe(
        this.switchMapCancelable(this.setValueChainsData.bind(this)),
        finalize(this.uiService.hideBusyIndicator)
      )
      .subscribe();
  }

  protected downloadFiles(): void {
    this.orderFileService.downloadOrderDocuments(this.orderId).subscribe();
  }

  protected onCancelOrder(): void {
    this.uiService.showBusyIndicator();
    this.orderApiService
      .cancelOrder(this.orderId)
      .pipe(
        this.switchMapCancelable(this.setValueChainsData.bind(this)),
        finalize(this.uiService.hideBusyIndicator)
      ).subscribe();
  }

  private setValueChainsData(): Observable<void> {
    return this.orderApiService
      .getOrderDetailsAdmin(this.orderId)
      .pipe(
        map((result) => {
          const valueChains: IValueChainData[] = this.valueChainTableService.mapValueChains(result.valueChains ?? [], result.orderStatus)
          this.productName = result.productName ?? '';
          this.topValueChainData = valueChains.filter(valueChain => topValueChainStatuses.includes(valueChain.status));
          this.bottomValueChainData = valueChains.filter(valueChain => !topValueChainStatuses.includes(valueChain.status));
          this.breadcrumbs = this.detailsPageService.getBreadcrumbs(this.productName);
          this.productInfoCard = this.detailsPageService.mapProductInfoData(result.orderedProduct);
          this.customerInfoCard = this.detailsPageService.mapCustomerInfoData(result.customerInfo);
          this.isCancelDisabled = result.orderStatus !== OrderStatus.Open && result.orderStatus !== OrderStatus.NotDone;
        }));
  }
}
