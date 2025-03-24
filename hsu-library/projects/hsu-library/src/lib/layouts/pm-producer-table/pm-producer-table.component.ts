import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { IColumnHeader, IColumnSortEvent } from '../../components/pm-table/pm-table-header/pm-table-header.shared';
import { IActionEvent, Row } from '../../components/pm-table/pm-table.shared';
import { PmCheckboxState } from '../../components/pm-checkbox/pm-checkbox.shared';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { IPager, Pager } from '../../components/pm-pagination/pm-pagination.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import {
  IProducersRequest,
  IProducerTableLocalisation,
  ProducerTableLocalisation
} from './pm-producer-table.shared';
import { CheckboxCell, ECellType } from '../../components/pm-table/pm-table-cell/pm-table-cell.shared';

@Component({
  selector: 'pm-producer-table',
  templateUrl: './pm-producer-table.component.html',
  styleUrls: ['./pm-producer-table.component.scss']
})

export class PmProducerTableComponent implements OnChanges {

  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly PopupType: typeof PopupType = PopupType;
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  @Input()
  loading: boolean = false;

  @Input()
  noShadow: boolean = false;

  @Input()
  columnHeaders: IColumnHeader[] = [];

  @Input()
  rowData: Row[] = [];

  @Input()
  totalItems: number = 0;

  @Input()
  itemsPerPageOptions: PmDropdownOption<string>[] = [];

  @Input()
  paginationData: IPager = Pager;

  @Input()
  localisations: IProducerTableLocalisation = ProducerTableLocalisation;

  @Input()
  showDeadlinePopup: boolean = false;

  @Input()
  showProducerRequestPopup: boolean = false;

  @Input()
  confirmedDeadlineDate: string = '';

  @Input()
  editDisabled: boolean = false;

  @Output()
  onActionClicked: EventEmitter<IActionEvent> = new EventEmitter();

  @Output()
  onSortingClicked: EventEmitter<IColumnSortEvent> = new EventEmitter();

  @Output()
  onTableHeaderCheckboxStateChange: EventEmitter<PmCheckboxState> = new EventEmitter();

  @Output()
  onPageClicked: EventEmitter<IPager> = new EventEmitter();

  @Output()
  onPopupConfirmClicked: EventEmitter<string> = new EventEmitter();

  @Output()
  onSendRequestProducersClicked: EventEmitter<IProducersRequest> = new EventEmitter();

  protected allowRequest: boolean = false;
  protected deadlineDate: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['confirmedDeadlineDate']) {
      this.deadlineDate = this.confirmedDeadlineDate;
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
    this.paginationData = pager;

    this.onPageClicked.emit(pager);
  }

  /** @ignore */
  datePickerButtonClicked() {
    this.showDeadlinePopup = true;
  }

  dateSelected(date: string ) {
    // date from input-field
    this.deadlineDate = date;
  }

  /** @ignore */
  popupCancelClicked() {
    this.showDeadlinePopup = false;
  }

  /** @ignore */
  popupConfirmClicked() {
    if (this.deadlineDate) {
      // only update deadline-data when confirm is clicked
      this.confirmedDeadlineDate = this.deadlineDate.toString();

      this.onPopupConfirmClicked.emit(this.deadlineDate);
    }

    this.showDeadlinePopup = false;
  }

  sendRequest() {
    if (this.deadlineDate) {
      this.onSendRequestProducersClicked.emit({
        deadlineDate: this.deadlineDate,
        producersIds: this.rowData
          .filter(item => item.isSelected) // Filter objects based on isActive property
          .map(item => item.rowId)
      });
    }
    this.showProducerRequestPopup = false
  }

  onCheckboxStateChange(selectedIds: number[]) {
    this.allowRequest = false;
    for (const producerId of selectedIds) {
      if (this.rowData.some(item => item.rowId === producerId &&
        !(item.cells.find(cell => cell.type === ECellType.CHECKBOX_CELL) as CheckboxCell).disabled)){
        this.allowRequest = true;
        break;
      }
    }
  }
}
