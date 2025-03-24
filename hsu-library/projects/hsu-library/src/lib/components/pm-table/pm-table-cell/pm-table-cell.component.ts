import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  IActionButtonElement
} from '../pm-table-action-buttons/pm-table-action-buttons.shared';
import {
  Icon,
  IconSize
} from '../../pm-icon/pm-icon.shared';
import {
  PmCheckboxState
} from '../../pm-checkbox/pm-checkbox.shared';
import {
  ICell,
  ECellType,
  ERatingType
} from './pm-table-cell.shared';

@Component({
  selector: 'pm-table-cell',
  templateUrl: './pm-table-cell.component.html',
  styleUrls: ['./pm-table-cell.component.scss']
})
export class PmTableCellComponent {

  @Input()
  loading: boolean = false;

  @Input()
  cell: ICell = {
    type: ECellType.UNKNOWN,
  }

  @Input()
  checkboxDisabled: boolean = false;

  @Output()
  onExecuteAction: EventEmitter<IActionButtonElement> = new EventEmitter();

  @Output()
  onCheckboxStateChange: EventEmitter<PmCheckboxState> = new EventEmitter();

  /** @ignore **/
  protected readonly CellType: typeof ECellType = ECellType;

  /** @ignore **/
  protected readonly Icon: typeof Icon = Icon;

  /** @ignore **/
  protected readonly IconSize: typeof IconSize = IconSize;

  /** @ignore **/
  protected readonly ERatingType: typeof ERatingType = ERatingType;

  onClickActionEntry($event: IActionButtonElement) {
    this.onExecuteAction.emit($event);
  }

  onSelectCheckbox($event: PmCheckboxState) {
    this.onCheckboxStateChange.emit($event);
  }
}
