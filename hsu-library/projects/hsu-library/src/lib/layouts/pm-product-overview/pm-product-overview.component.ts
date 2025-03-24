import {
  Component,
  EventEmitter,
  Input, OnChanges,
  Output,
} from '@angular/core';
import {
  IColumnHeader,
  IColumnSortEvent,
} from '../../components/pm-table/pm-table-header/pm-table-header.shared';
import {
  IActionEvent,
  Row
} from '../../components/pm-table/pm-table.shared';
import {
  IPager
} from '../../components/pm-pagination/pm-pagination.shared';
import {
  PmDropdownOption
} from '../../components/pm-dropdown/pm-dropdown.shared';
import {
  IProductOverviewLocalisation
} from './pm-product-overview.shared';
import {
  EPmInputType
} from '../../components/pm-input/pm-input.component';
import {
  ButtonType
} from '../../components/pm-button/pm-button.component';
import {
  Icon
} from '../../components/pm-icon/pm-icon.shared';
import { defaultBreadcrumbs, IBreadcrumbs } from '../pm-header/pm-header.shared';


@Component({
  selector: 'pm-product-overview',
  templateUrl: './pm-product-overview.component.html',
  styleUrls: ['./pm-product-overview.component.scss']
})

export class PmProductOverviewComponent implements OnChanges {

  @Input()
  showCreatProductButton: boolean = false;

  @Input()
  loading: boolean = false;

  @Input()
  columnHeaders: IColumnHeader[] = [];

  @Input()
  rowData: Row[] = [];

  @Input()
  statusFilterOptions: PmDropdownOption<string>[] = [];

  @Input()
  totalItems: number = 0;

  @Input()
  currentPage: number = 1;

  @Input()
    localisationStrings: IProductOverviewLocalisation = {
      totalText: '',
      buttonLabel: '',
      titleAdminOverview: '',
      searchBarTexts: {
        label: '',
        placeholder: '',
      },
      stateFilterTexts:  {
        label: '',
        placeholder: '',
      },
    };

  @Output()
  onActionClicked: EventEmitter<IActionEvent> = new EventEmitter();

  @Output()
  onSortingClicked: EventEmitter<IColumnSortEvent> = new EventEmitter();

  @Output()
  onPageClicked: EventEmitter<IPager> = new EventEmitter();

  @Output()
  onSearchTermChanged: EventEmitter<string> = new EventEmitter();

  @Output()
  onStatusFilterChanged: EventEmitter<string> = new EventEmitter();

  @Output()
  onNewProduct: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  itemsPerPageOptions: PmDropdownOption<string>[] = [
    {
      key: '10',
      value: '10'
    },
    {
      key: '20',
      value: '20'
    },
    {
      key: '30',
      value: '30'
    },
    {
      key: '40',
      value: '40'
    }
  ]

  /** @ignore */
  protected breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;

  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  protected readonly ButtonType: typeof ButtonType = ButtonType;

  protected readonly EIcon: typeof Icon = Icon;

  ngOnChanges() {
    this.breadcrumbs = {
      lastBreadcrumb: this.localisationStrings.titleAdminOverview
    }
  }

  /** @ignore */
  actionClicked(actionEvent: IActionEvent) {
    this.onActionClicked.emit({
      actionType: actionEvent.actionType,
      rowId: actionEvent.rowId
    });
  }


  /** @ignore */
  sortingClicked(sortEvent: IColumnSortEvent) {
    this.onSortingClicked.emit(sortEvent);
  }

  /** @ignore */
  paginationChanged(pager: IPager) {
    this.currentPage = pager.CurrentPage
    this.onPageClicked.emit(pager);
  }

  /** @ignore */
  onSearch(searchTerm: string) {
    this.onSearchTermChanged.emit(searchTerm);
  }

  /** @ignore */
  statusFilterChanged(filterOption: string) {
    this.onStatusFilterChanged.emit(filterOption)
  }

  /**
   * @description: a method for opening the product popup
   * @ignore
   */
  openProductPopup () {
    this.onNewProduct.emit();
  }

}
