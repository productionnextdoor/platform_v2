import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { Icon, IconSize } from '../../pm-icon/pm-icon.shared';
import {
  CheckboxColumnHeader,
  ESortOrder,
  IColumnHeader,
  IColumnSortEvent,
  TableHeaderType,
  TextColumnHeader
} from './pm-table-header.shared';
import { PmCheckboxState } from '../../pm-checkbox/pm-checkbox.shared';

@Component({
  selector: 'pm-table-header',
  templateUrl: './pm-table-header.component.html',
  styleUrls: ['./pm-table-header.component.scss']
})

export class PmTableHeaderComponent implements OnInit {
  @Input()
  column: IColumnHeader = {
    type: TableHeaderType.Text,
    columnIdentifier: '',
  }

  @Input()
  disabled: boolean = false;

  @Input()
  checkboxDisabled: boolean = false;

  @Input()
  checkboxState: PmCheckboxState = PmCheckboxState.DEFAULT;

  @Output()
  checkboxStateChange: EventEmitter<PmCheckboxState> = new EventEmitter<PmCheckboxState>();

  @Output()
  onSort: EventEmitter<IColumnSortEvent> = new EventEmitter();

  /** @ignore **/
  protected textColumn: TextColumnHeader = {
    type: TableHeaderType.Text,
    columnIdentifier: '',
    columnTitle: '',
    sortable: false
  }

  /** @ignore **/
  protected checkboxColumn: CheckboxColumnHeader = {
    type: TableHeaderType.Checkbox,
    columnIdentifier: ''
  }

  /** @ignore **/
  protected icon: Icon = Icon.TABLE_SORT;

  /** @ignore **/
  protected sortOrder: ESortOrder = ESortOrder.None

  /** @ignore **/
  protected readonly IconSize: typeof IconSize = IconSize;

  /** @ignore **/
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore **/
  protected readonly HeaderType: typeof TableHeaderType = TableHeaderType;

  ngOnInit(): void {
    if (this.column.type === TableHeaderType.Checkbox) {
      this.checkboxColumn = this.column as CheckboxColumnHeader;
    } else {
      this.textColumn = this.column as TextColumnHeader;
    }
  }

  sort() {
    this.sortStateUpdate();
    this.onSort.emit({
      columnIdentifier: this.column.columnIdentifier,
      sortOrder: this.sortOrder
    });
  }

  sortStateUpdate() {
    switch (this.sortOrder) {
    case ESortOrder.None:
      this.sortOrder = ESortOrder.Ascending;
      this.icon = Icon.SORT_UP;
      break;
    case ESortOrder.Ascending:
      this.sortOrder = ESortOrder.Descending;
      this.icon = Icon.SORT_DOWN;
      break;
    case ESortOrder.Descending:
      this.sortOrder = ESortOrder.Ascending;
      this.icon = Icon.SORT_UP;
      break;
    default:
      this.sortOrder = ESortOrder.None;
      this.icon = Icon.TABLE_SORT;
    }
  }

  resetSort() {
    this.sortOrder = ESortOrder.None;
    this.icon = Icon.TABLE_SORT;
  }
}
