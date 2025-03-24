import {
  Component,
  EventEmitter,
  Input, OnChanges,
  Output
} from '@angular/core';
import { IColumnHeader, IColumnSortEvent } from '../../components/pm-table/pm-table-header/pm-table-header.shared';
import { IActionEvent, Row } from '../../components/pm-table/pm-table.shared';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { IPager } from '../../components/pm-pagination/pm-pagination.shared';
import { defaultBreadcrumbs, IBreadcrumbs } from '../pm-header/pm-header.shared';
import { Icon } from '../../components/pm-icon/pm-icon.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { IOrderOverviewLocalisation, pmOrderOverviewLocalisation } from './pm-orders-overview.shared';

@Component({
  selector: 'pm-orders-overview',
  templateUrl: './pm-orders-overview.component.html',
  styleUrls: ['./pm-orders-overview.component.scss']
})
export class PmOrdersOverviewComponent implements OnChanges{

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
  localisationStrings: IOrderOverviewLocalisation = pmOrderOverviewLocalisation;

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
      lastBreadcrumb: this.localisationStrings.titleOrderOverview
    }
  }

  /** @ignore */
  protected actionClicked(actionEvent: IActionEvent) {
    this.onActionClicked.emit({
      actionType: actionEvent.actionType,
      rowId: actionEvent.rowId
    });
  }

  /** @ignore */
  protected sortingClicked(sortEvent: IColumnSortEvent) {
    this.onSortingClicked.emit(sortEvent);
  }

  /** @ignore */
  protected paginationChanged(pager: IPager) {
    this.currentPage = pager.CurrentPage
    this.onPageClicked.emit(pager);
  }

  /** @ignore */
  protected onSearch(searchTerm: string) {
    this.onSearchTermChanged.emit(searchTerm);
  }

  /** @ignore */
  protected statusFilterChanged(filterOption: string) {
    this.onStatusFilterChanged.emit(filterOption)
  }

}
