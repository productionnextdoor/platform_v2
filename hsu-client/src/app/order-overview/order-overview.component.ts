import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import {
  DEBOUNCE_TIME, DEFAULT_PER_PAGE, MIN_SEARCH_LENGTH
} from '../../services/table/table-base.service';
import {
  debounceTime, distinctUntilChanged, filter, finalize, Subject, tap
} from 'rxjs';
import {
  ESortOrder,
  IColumnHeader,
  PmDropdownOption,
  IOrderOverviewLocalisation,
  Row,
  IColumnSortEvent,
  IPager,
  IActionEvent
} from 'hsu-library';
import { WithRx } from '../../shared/mixins/with-rx.mixin';
import { EOrderTableColumns, IOrdersFilter } from '../../services/orders/order-table/orders-table.service';
import { IOrderTableService } from '../../services/orders/order-table/iorders-table.service';
import { Path } from '../app-routing.module';
import { INavigationService } from '../../services/navigation/inavigation.service';


@Component({
  selector: 'order-overview',
  templateUrl: './order-overview.component.html',
})
export class OrderOverviewComponent  extends WithRx() implements OnInit, OnDestroy {

  columnHeaders: IColumnHeader[] = [];
  statusFilterOptions: PmDropdownOption<string>[] = [];

  orderFilter: IOrdersFilter = {
    maxResultCount: DEFAULT_PER_PAGE,
    skipCount: 0,
    sortOrder: EOrderTableColumns['OrderNumberColumn'] + ' ' + ESortOrder.Descending,
    searchInput: ''
  }

  localisationStrings: IOrderOverviewLocalisation = {
    totalText: '',
    titleOrderOverview: '',
    searchBarTexts: {
      label: '',
      placeholder: '',
    },
    stateFilterTexts: {
      label: '',
      placeholder: '',
    }
  };

  loading: boolean = false;
  rowData: Row[] = [];
  totalCount: number = 0;
  currentPage: number = 1;

  private filterQuery$ = new Subject<IOrdersFilter>();
  productId: number = 0;
  productName: string = '';

  constructor(
    private readonly orderTableService: IOrderTableService,
    private readonly navigationService: INavigationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initOrderFilter();
    this.statusFilterOptions = this.orderTableService.getStatusOptions();
    this.columnHeaders = this.orderTableService.getColumnHeaders();
    this.localisationStrings = this.orderTableService.getLocalisationStrings();
    this.filterQuery$.next(this.orderFilter);
  }

  onSortData(columnSort: IColumnSortEvent) {
    this.filterQuery$.next({
      ...this.orderFilter,
      sortOrder: columnSort.columnIdentifier + ' ' + columnSort.sortOrder
    });
  }

  onPageChange(pager: IPager) {
    this.currentPage = pager.CurrentPage;
    this.filterQuery$.next({
      ...this.orderFilter,
      maxResultCount: pager.MaxResultCount,
      skipCount: pager.SkipCount
    });
  }

  onSearchTermChanged(searchValue: string) {
    this.resetPagination();
    this.filterQuery$.next({
      ...this.orderFilter,
      searchInput: searchValue,
    });
  }

  onStatusChange(selectedFilter: string) {
    this.resetPagination();
    this.filterQuery$.next({
      ...this.orderFilter,
      status: selectedFilter ? Number(selectedFilter) : undefined,
    });
  }

  onOrderDetailsClicked(actionEvent: IActionEvent) {
    this.navigationService.navigate(Path.ORDER_DETAILS, actionEvent.rowId)
  }

  private initOrderFilter() {
    this.filterQuery$
      .pipe(
        filter(query => query.searchInput.length >= MIN_SEARCH_LENGTH || query.searchInput.length === 0),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => this.loading = true),
        tap(orderFilter => this.orderFilter = orderFilter),
        this.switchMapCancelable(() => this.orderTableService.getTableRows(this.orderFilter)),
        finalize(() => this.loading = false)
      )
      .subscribe(
        {
          next: (result) => {
            this.totalCount = result.totalResultCount
            this.rowData = result.rows
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
  }

  private resetPagination() {
    this.currentPage = 1;
    this.orderFilter.skipCount = 0;
  }

}
