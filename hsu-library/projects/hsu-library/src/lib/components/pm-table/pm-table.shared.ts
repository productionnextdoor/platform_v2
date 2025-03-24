import {
  ICell
} from './pm-table-cell/pm-table-cell.shared';
import {
  PmCheckboxState
} from '../pm-checkbox/pm-checkbox.shared';
import {
  EActionButtonElementType
} from './pm-table-action-buttons/pm-table-action-buttons.shared';


export interface Row {
  cells: ICell[];
  rowId: number;
  isHighlighted?: boolean;
  isSelected?: boolean;
}

export interface IActionEvent {
  actionType: EActionButtonElementType,
  rowId: number,
}

export interface ICheckboxEvent {
  checkboxState: PmCheckboxState,
  rowId: number,
}

