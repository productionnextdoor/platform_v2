import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  ESortOrder,
  IColumnHeader,
  IColumnSortEvent,
  IPager,
  IProductOverviewLocalisation,
  Row,
  PmDropdownOption,
  PopupType,
  IActionEvent,
  EActionButtonElementType
} from 'hsu-library';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  Subject,
  tap,
} from 'rxjs';
import {
  ETableColumns,
  IProductFilter,
  EWizardType,
} from '../../services/products/product-table/product-table-base.service';
import { IProductApiService } from '../../services/products/iproduct-api.service';
import { IProductTableService } from '../../services/products/product-table/iproduct-table.service';
import { PagedResultDtoOfProductListDto, ProductListDto } from '../../shared/service-proxies/service-proxies';
import { WithRx } from '../../shared/mixins/with-rx.mixin';
import { IPermissionManagerService } from '../../services/permissions/ipermission-manager.service';
import { PERMISSIONS } from '../../services/permissions/permissions';
import { INavigationService } from '../../services/navigation/inavigation.service';
import { Path } from '../app-routing.module';
import {
  DEFAULT_PER_PAGE,
  DEBOUNCE_TIME,
  MIN_SEARCH_LENGTH,
} from '../../services/table/table-base.service';

@Component({
  selector: 'product-overview',
  templateUrl: './product-overview.component.html'
})
export class ProductOverviewComponent extends WithRx() implements OnInit, OnDestroy {

  columnHeaders: IColumnHeader[] = [];
  statusFilterOptions: PmDropdownOption<string>[] = [];

  productFilter: IProductFilter = {
    maxResultCount: DEFAULT_PER_PAGE,
    skipCount: 0,
    sortOrder: ETableColumns.ProductNumberColumn + ' ' + ESortOrder.Descending,
    searchInput: ''
  }

  localisationStrings: IProductOverviewLocalisation = {
    totalText: '',
    buttonLabel: '',
    titleAdminOverview: '',
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

  protected readonly PopupType: typeof PopupType = PopupType;
  protected readonly EWizardType: typeof EWizardType = EWizardType;

  actionPopupOpen: boolean = false;
  wizardType: EWizardType;

  private filterQuery$ = new Subject<IProductFilter>();
  productId: number = 0;
  productName: string = '';
  products: ProductListDto[] = [];

  constructor(
    private readonly productApiService: IProductApiService,
    private readonly productTableService: IProductTableService,
    private readonly permissionService: IPermissionManagerService,
    private readonly navigationService: INavigationService
  ) {
    super();
    this.wizardType = this.productTableService.getWizardType();
  }

  ngOnInit(): void {
    this.initProductFilter();
    this.statusFilterOptions = this.productTableService.getStateOptions();
    this.columnHeaders = this.productTableService.getColumnHeaders();
    this.localisationStrings = this.productTableService.getLocalisationStrings();
    this.filterQuery$.next(this.productFilter);
  }

  onSortData(columnSort: IColumnSortEvent) {
    this.filterQuery$.next({
      ...this.productFilter,
      sortOrder: columnSort.columnIdentifier + ' ' + columnSort.sortOrder
    });
  }

  onPageChange(pager: IPager) {
    this.currentPage = pager.CurrentPage;
    this.filterQuery$.next({
      ...this.productFilter,
      maxResultCount: pager.MaxResultCount,
      skipCount: pager.SkipCount
    });
  }

  onSearchTermChanged(searchValue: string) {
    this.resetPagination();
    this.filterQuery$.next({
      ...this.productFilter,
      searchInput: searchValue,
    });
  }

  onStatusChange(selectedFilter: string) {
    this.resetPagination();
    this.filterQuery$.next({
      ...this.productFilter,
      state: selectedFilter ? Number(selectedFilter) : undefined,
    });
  }

  private setTableData(products: PagedResultDtoOfProductListDto) {
    this.totalCount = products.totalCount;
    this.products = products.items ?? [];
    this.rowData = products.items?.map(item => (
      this.productTableService.getTableRow(item)
    )) as Row[];
  }

  private initProductFilter() {
    this.filterQuery$
      .pipe(
        filter(query => query.searchInput.length >= MIN_SEARCH_LENGTH || query.searchInput.length === 0),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        tap(() => this.loading = true),
        tap(productFilter => this.productFilter = productFilter),
        this.switchMapCancelable(() => this.productApiService.getFilteredProducts(this.productFilter)),
        finalize(() => this.loading = false)
      )
      .subscribe(
        {
          next: (result) => {
            this.setTableData(result);
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
  }

  private resetPagination() {
    this.currentPage = 1;
    this.productFilter.skipCount = 0;
  }

  protected closeActionPopup() {
    this.actionPopupOpen = false;
    this.productId = 0;
    this.resetPagination();
    this.filterQuery$.next({
      ...this.productFilter,
    });
  }

  protected onProductCreate() {
    this.actionPopupOpen = true;
  }

  protected onActionClicked(event: IActionEvent) {
    switch (event.actionType) {
    case EActionButtonElementType.PRODUCT_CREATE:
    case EActionButtonElementType.DEVELOPER_PRODUCT_WIZARD:
      this.productId = event.rowId;
      this.productName = this.products.find(product => product.id === event.rowId)?.name ?? '';
      this.actionPopupOpen = true;
      break;
    case EActionButtonElementType.PRODUCT_DETAILS:
      this.navigationService.navigate(
        Path.PRODUCT_DETAILS,
        event.rowId
      );
      break;
    }
  }

  protected canCreateNewProduct(): boolean {
    return this.permissionService.isGranted(PERMISSIONS.products.base.createOrUpdate);
  }
}
