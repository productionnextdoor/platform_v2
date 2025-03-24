import {
  Component, EventEmitter, Input, Output, OnChanges
} from '@angular/core';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { IColumnHeader, IColumnSortEvent } from '../../components/pm-table/pm-table-header/pm-table-header.shared';
import { IActionEvent, Row } from '../../components/pm-table/pm-table.shared';
import { IPager } from '../../components/pm-pagination/pm-pagination.shared';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { developerOverviewLocalisationStrings, IDeveloperOverviewLocalisation } from './pm-developer-overview.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { Icon } from '../../components/pm-icon/pm-icon.shared';
import { defaultBreadcrumbs, IBreadcrumbs } from '../pm-header/pm-header.shared';

@Component({
  selector: 'pm-developer-overview',
  templateUrl: './pm-developer-overview.component.html',
  styleUrls: ['./pm-developer-overview.component.scss']
})
export class PmDeveloperOverviewComponent implements OnChanges {

  @Input()
  loading: boolean = false;

  @Input()
  columnHeaders: IColumnHeader[] = [];

  @Input()
  rowData: Row[] = [];

  @Input()
  totalItems: number = 0;

  @Input()
  currentPage: number = 1;

  @Input()
  itemsPerPageOptions: PmDropdownOption<string>[] = [];

  @Input()
  localisationStrings: IDeveloperOverviewLocalisation = developerOverviewLocalisationStrings;

  @Output()
  onActionClicked: EventEmitter<IActionEvent> = new EventEmitter();

  @Output()
  onSortingClicked: EventEmitter<IColumnSortEvent> = new EventEmitter();

  @Output()
  onPageClicked: EventEmitter<IPager> = new EventEmitter();

  @Output()
  onSearchTermChanged: EventEmitter<string> = new EventEmitter();

  @Output()
  onButtonClicked: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;

  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly Icon: typeof Icon = Icon;


  ngOnChanges() {
    this.breadcrumbs = {
      lastBreadcrumb: this.localisationStrings.titleDeveloperOverview
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
  paginationChanged(pager: IPager) {
    this.currentPage = pager.CurrentPage
    this.onPageClicked.emit(pager);
  }
}
