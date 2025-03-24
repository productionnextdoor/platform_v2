import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  IActionEvent,
  IColumnHeader,
  IColumnSortEvent,
  IPager,
  IProducerTableLocalisation,
  IProducersRequest,
  Pager,
  PmDropdownOption,
  ProducerTableLocalisation,
  Row
} from 'hsu-library';
import {
  ProductProducerListDto,
  ProductProducerOutput
} from '../../../shared/service-proxies/service-proxies';
import { Path } from '../../app-routing.module';
import { DateTime } from 'luxon';
import { AppConsts } from '../../../shared/AppConsts';
import { finalize } from 'rxjs';
import { IProductApiService } from '../../../services/products/iproduct-api.service';
import { IProductDetailsService } from '../../../services/products/product-details/iproduct-details.service';
import { INavigationService } from '../../../services/navigation/inavigation.service';


@Component({
  selector: 'product-producer-table',
  templateUrl: './product-producer-table.component.html',
})
export class ProductProducerTableComponent implements OnInit, OnChanges {

  @Input()
  productId: number = 0;

  @Input()
  public productionDetailsId: number = 0;

  @Input()
  localisations: IProducerTableLocalisation = ProducerTableLocalisation;

  @Input()
  itemsPerPageOptions: PmDropdownOption<string>[] = [];

  @Input()
  producerEditDisabled: boolean = false;

  @Input()
  deadlineDate: string = '';

  @Output()
  deadlineDateChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  loadingState = new EventEmitter<boolean>();

  protected loading: boolean = false;
  protected producerRowData: Row[] = [];
  protected columnHeaders: IColumnHeader[] = [];
  protected producers: ProductProducerListDto[] = [];
  protected producerSorting: string = '';
  protected totalProducers: number = 0;
  protected producersPaginationData: IPager = Pager;



  constructor(
    private readonly productApiService: IProductApiService,
    private readonly productDetailsService: IProductDetailsService,
    private readonly navigationService: INavigationService
  ) {
  }

  ngOnInit(): void {
    this.columnHeaders = this.productDetailsService.getProducerTableColumnHeaders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productionDetailsId'] && this.productionDetailsId !== 0) {
      this.setProducerTableData();
    }
  }

  onProducerSortingClicked(sortEvent: IColumnSortEvent) {
    this.producerSorting = sortEvent.columnIdentifier + ' ' + sortEvent.sortOrder;
    this.setProducerTableData();
  }

  onProducerPageClicked(pager: IPager) {
    this.producersPaginationData = pager;
    this.setProducerTableData();
  }

  onViewProducerProducts(actionEvent: IActionEvent): void {
    this.navigationService.navigate(Path.ADMIN_PRODUCER_PROFILE, actionEvent.rowId)
  }

  onUpdateDeadLine(deadline: string) {
    const deadlineDate: DateTime = DateTime
      .fromFormat(deadline, AppConsts.DateFormatString)
      .set(AppConsts.EndOfTheDay);
    this.productApiService
      .updateProcessingDeadline(this.productId, this.productionDetailsId, deadlineDate)
      .subscribe({
        next: () => {
          this.deadlineDate = deadline;
          this.deadlineDateChange.emit(this.deadlineDate)
        }
      });
  }

  onSendProducersRequest(request: IProducersRequest) {
    const deadlineDate: DateTime = DateTime
      .fromFormat(request.deadlineDate, AppConsts.DateFormatString)
      .set(AppConsts.EndOfTheDay);
    this.productApiService.sendProducersRequests(this.productId, this.productionDetailsId, request.producersIds, deadlineDate)
      .subscribe({
        next: () => {
          this.setProducerTableData();
        }
      });
  }

  private setProducerTableData() {
    this.loading = true
    this.loadingState.emit(true)
    this.productApiService.getProductProducers(this.productId, this.productionDetailsId, this.producerSorting, this.producersPaginationData.MaxResultCount, this.producersPaginationData.SkipCount)
      .pipe(
        finalize(() => (this.loadingState.emit(false)))
      )
      .subscribe({
        next: (producerResult: ProductProducerOutput) => {
          this.handleProducerTableData(producerResult);
          this.loading = false;
          this.deadlineDateChange.emit(this.deadlineDate);
        },
        error: () => {
          this.loading = false;
        }
      })
  }

  private handleProducerTableData(producerTableData: ProductProducerOutput) {
    this.deadlineDate = producerTableData.processingDeadline?.toFormat(AppConsts.DateFormatString) ?? ''
    this.totalProducers = producerTableData.producers.totalCount;
    this.producers = producerTableData.producers.items ?? [];
    this.producerRowData = this.producers.map(producer => (
      this.productDetailsService.getProducerTableRow(producer, this.producerEditDisabled)
    ));
  }
}
