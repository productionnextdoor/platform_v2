import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { IWorkstepTableLocalisations, WorkstepTableLocalisations } from './pm-workstep-table.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { IColumnHeader, IColumnSortEvent } from '../../components/pm-table/pm-table-header/pm-table-header.shared';
import { IActionEvent, Row } from '../../components/pm-table/pm-table.shared';

@Component({
  selector: 'pm-workstep-table',
  templateUrl: './pm-workstep-table.component.html',
  styleUrls: ['./pm-workstep-table.component.scss']
})
export class PmWorkstepTableComponent {

  protected readonly ButtonType: typeof ButtonType = ButtonType;

  @Input()
  localisations: IWorkstepTableLocalisations = WorkstepTableLocalisations;

  @Input()
  totalItems: number = 0;

  @Input()
  loading: boolean = false;

  @Input()
  noShadow: boolean = false;

  @Input()
  columnHeaders: IColumnHeader[] = [];

  @Input()
  rowData: Row[] = [];

  @Output()
  onActionClicked: EventEmitter<IActionEvent> = new EventEmitter();

  @Output()
  onSortingClicked: EventEmitter<IColumnSortEvent> = new EventEmitter();

  /** @ignore */
  actionClicked(actionEvent: IActionEvent) {
    this.onActionClicked.emit({
      actionType: actionEvent.actionType,
      rowId: actionEvent.rowId
    });
  }
}
