import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  Icon,
  IconSize
} from '../pm-icon/pm-icon.shared';
import { PmTableHeaderComponent } from './pm-table-header/pm-table-header.component';
import { PmCheckboxState } from '../pm-checkbox/pm-checkbox.shared';
import { IActionButtonElement } from './pm-table-action-buttons/pm-table-action-buttons.shared';
import {
  IColumnHeader, IColumnSortEvent, TableHeaderType
} from './pm-table-header/pm-table-header.shared';
import {
  IActionEvent,
  Row
} from './pm-table.shared';
import {
  CdkDragDrop,
  CdkDragStart,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import {
  CheckboxCell,
  ECellType,
  ICell
} from './pm-table-cell/pm-table-cell.shared';

@Component({
  selector: 'pm-table',
  templateUrl: './pm-table.component.html',
  styleUrls: ['./pm-table.component.scss'],
})

export class PmTableComponent implements OnChanges {

  constructor(private el: ElementRef) {}

  @ViewChild('table')
  public standardTableElement!: ElementRef<HTMLElement>;

  @ViewChildren(PmTableHeaderComponent)
  public headerComponents!: QueryList<PmTableHeaderComponent>;

  @Input()
  public columnHeaders: IColumnHeader[] = [];

  @Input()
  checkboxesDisabled: boolean = false;

  @Input()
  public rows: Row[] = [];

  @Input()
  public draggable: boolean = false;

  @Input()
  public multiselect: boolean = true;

  @Input()
  public loading: boolean = false;

  @Output()
  public onActionClicked: EventEmitter<IActionEvent> = new EventEmitter();

  @Output()
  public onSort: EventEmitter<IColumnSortEvent> = new EventEmitter();

  @Output()
  public onCheckboxStateChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  @Output()
  public onHeaderCheckboxStateChange: EventEmitter<PmCheckboxState> = new EventEmitter();

  @Output()
  public onDragStart: EventEmitter<CdkDragStart> = new EventEmitter<CdkDragStart>();

  @Output()
  public rowsChange: EventEmitter<Row[]> = new EventEmitter<Row[]>();

  /** @ignore **/
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore **/
  protected readonly IconSize: typeof IconSize = IconSize;

  /** @ignore **/
  protected readonly ECellType: typeof ECellType = ECellType;

  /** @ignore **/
  protected readonly TableHeaderType: typeof TableHeaderType = TableHeaderType;

  protected headerCheckboxState: PmCheckboxState = PmCheckboxState.DEFAULT;

  /** @ignore */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      this.updateHeaderCheckboxState();
    }
  }

  protected sort(columSort: IColumnSortEvent) {
    this.columnSortIconReset(columSort.columnIdentifier);
    this.onSort.emit(columSort);
  }

  protected executeActionOnCell(actionElement: IActionButtonElement, rowId: number) {
    this.onActionClicked.emit({
      actionType: actionElement.type,
      rowId: rowId
    });
  }

  /** @ignore */
  protected checkboxStateChange(checkboxState: PmCheckboxState, rowId: number) {
    const row: Row | undefined = this.rows.find(currentRow => currentRow.rowId === rowId);

    if (row === undefined) {
      return;
    }

    if (!this.multiselect){
      this.rows.forEach(tableRow => {
        const rowCheckbox: CheckboxCell = tableRow.cells.find(cell => cell.type === ECellType.CHECKBOX_CELL) as CheckboxCell;

        rowCheckbox.value = PmCheckboxState.DEFAULT;
        tableRow.isSelected = false;
      });
    }

    const rowCheckbox: CheckboxCell = row?.cells.find(cell => cell.type === ECellType.CHECKBOX_CELL) as CheckboxCell;

    // update table
    rowCheckbox.value = checkboxState;
    row.isSelected = checkboxState === PmCheckboxState.ACTIVE;

    this.onCheckboxStateChange.emit(this.getSelectedRows());

    this.updateHeaderCheckboxState();
  }

  protected headerCheckboxStateChange(checkboxState: PmCheckboxState) {
    this.rows.forEach(row => {
      const rowCheckbox: CheckboxCell = row.cells.find(cell => cell.type === ECellType.CHECKBOX_CELL) as CheckboxCell;

      if (!rowCheckbox.disabled) {
        rowCheckbox.value = checkboxState;
        row.isSelected = checkboxState === PmCheckboxState.ACTIVE;
      }
    });

    this.onCheckboxStateChange.emit(this.getSelectedRows());
  }

  /** @ignore */
  protected columnSortIconReset(columnName: string) {
    this.headerComponents.forEach(item => {
      if (item.column.columnIdentifier !== columnName) {
        return item.resetSort();
      }
    });
    this.headerComponents.notifyOnChanges();
  }

  /** @ignore*/
  protected drop(event: CdkDragDrop<Row[]>) {
    const cells: ICell[] = this.rows.map(row => row.cells[0]);
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
    this.rows.forEach((row, index) => row.cells[0] = cells[index]);

    // send change event with bubbles so that other components can listen to changes directly without waiting for the
    // user to leave the input field.
    this.el.nativeElement.dispatchEvent(new Event('change', {
      bubbles: true,
    }));

    this.rowsChange.emit(this.rows);
  }

  /**
   * @description: method to adjust dynamic width for the dragged row
   * @ignore
   */
  protected dragStart(event: CdkDragStart) {
    const rowEl: HTMLElement = event.source.element.nativeElement;
    const parentEl: HTMLElement | null = rowEl.parentElement;
    const firstEl: number = 0;
    if (!parentEl) return;
    const previewEl: Element = parentEl.getElementsByClassName('cdk-drag-preview')[firstEl];
    const tdElements: HTMLCollectionOf<HTMLTableCellElement> = previewEl.getElementsByTagName('td');

    const dropContainer: HTMLElement = event.source.dropContainer.element.nativeElement;
    const thElements: HTMLCollectionOf<HTMLTableCellElement> = dropContainer.getElementsByTagName('th');

    if (tdElements.length !== thElements.length) return;

    for (let iter: number = 0; iter < thElements.length; iter++) {
      tdElements[iter].style.width = thElements[iter].getBoundingClientRect().width + 'px';
    }
    this.onDragStart.emit(event);
  }

  private updateHeaderCheckboxState() {
    const selectedRowsCount: number = this.rows.filter(row => row.isSelected).length;
    const totalRowCount: number = this.rows.length;

    if (selectedRowsCount === 0) {
      this.headerCheckboxState = PmCheckboxState.DEFAULT;
      return;
    }

    if (selectedRowsCount >= totalRowCount) {
      this.headerCheckboxState = PmCheckboxState.ACTIVE;
      return;
    }

    this.headerCheckboxState = PmCheckboxState.MULTISELECT;
  }

  private getSelectedRows(): number[] {
    return this.rows
      .filter(item => item.isSelected) // Filter objects based on isActive property
      .map(item => item.rowId)
  }
}
