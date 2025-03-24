import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  IColumnHeader,
  IProductionProcessCardLocalisations,
  productionProcessCardLocalisations,
  Row
} from 'hsu-library';
import { IOrderApiService } from '../../../../services/orders/iorder-api.service';
import {
  IOrderValueChainTableService
} from '../../../../services/orders/order-value-chain-table/iorder-value-chain-table.service';
import { IOrderDetailsPageService } from '../../../../services/orders/iorder-details-page.service';
import { WithRx } from '../../../../shared/mixins/with-rx.mixin';
import { map, Observable } from 'rxjs';
import { OrderValueChainActionProducerDto } from '../../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'production-process-card',
  templateUrl: './production-process-card.component.html',
})
export class ProductionProcessCardComponent extends WithRx() implements OnInit {

  @Input()
  public productId: number = 0;

  protected columnHeaders: IColumnHeader[] = [];
  protected rowData: Row[] = [];
  protected localisations: IProductionProcessCardLocalisations = productionProcessCardLocalisations;

  constructor(
    private readonly orderApiService: IOrderApiService,
    private readonly valueChainTableService: IOrderValueChainTableService,
    private readonly detailsPageService: IOrderDetailsPageService,
  ) {
    super();

  }

  ngOnInit(): void {
    this.localisations = this.detailsPageService.getLocalisationsDeveloper();
    this.columnHeaders = this.valueChainTableService.getColumnHeadersDeveloper()
    this.getCommissionedValueChainData().subscribe()
  }

  private getCommissionedValueChainData(): Observable<void> {
    return this.orderApiService.getOrderCommissionedValueChainDeveloper(this.productId)
      .pipe(
        map(orderValueChain => {
          const valueChainActions: OrderValueChainActionProducerDto[] = orderValueChain.valueChainActions ?? [];
          this.rowData = valueChainActions.map(item =>
            this.valueChainTableService.getTableRowDeveloper(item));

        })
      );
  }


}
