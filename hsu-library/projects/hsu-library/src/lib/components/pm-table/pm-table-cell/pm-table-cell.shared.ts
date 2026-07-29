import {
  IActionButtonElement
} from '../pm-table-action-buttons/pm-table-action-buttons.shared';
import {
  PmCheckboxState
} from '../../pm-checkbox/pm-checkbox.shared';
import {
  Pipe, PipeTransform
} from '@angular/core';

export interface ICell {
  type: ECellType,
}

export abstract class TextCell implements ICell {
  type: ECellType = ECellType.TEXT_CELL;
  abstract text: string;
}

export abstract class StatusCell extends TextCell {

}

export abstract class ActionCell implements ICell {
  type: ECellType = ECellType.ACTION_CELL;
  abstract actions: IActionButtonElement[];
  abstract disabled?: boolean;
}

export abstract class CheckboxCell implements ICell {
  type: ECellType = ECellType.CHECKBOX_CELL;
  abstract value: PmCheckboxState;
  abstract disabled: boolean;
}

export abstract class RatingCell implements ICell {
  type: ECellType = ECellType.RATING_CELL;
  abstract ratingScore: string;
  abstract ratingType: ERatingType;
}

export enum ECellType {
  UNKNOWN = 'Unknown',
  TEXT_CELL = 'TextCell',
  STATUS_CELL = 'StatusCell',
  ACTION_CELL = 'ActionCell',
  CHECKBOX_CELL = 'CheckboxCell',
  RATING_CELL = 'RatingCell'
}

export enum ERatingType {
  DEFAULT,
  BEST,
  WORST
}

@Pipe({
  name: 'getTextCell', pure: true
})
export class GetTextCellPipe implements PipeTransform {
  transform(cell: ICell): TextCell {
    return cell as TextCell
  }
}

@Pipe({
  name: 'getStatusCell', pure: true
})
export class GetStatusCellPipe implements PipeTransform {
  transform(cell: ICell): StatusCell {
    return cell as StatusCell
  }
}

@Pipe({
  name: 'getActionCell', pure: true
})
export class GetActionCellPipe implements PipeTransform {
  transform(cell: ICell): ActionCell {
    return cell as ActionCell
  }
}

@Pipe({
  name: 'getCheckboxCell', pure: true
})
export class GetCheckboxCellPipe implements PipeTransform {
  transform(cell: ICell): CheckboxCell {
    return cell as CheckboxCell
  }
}

@Pipe({
  name: 'getRatingCell', pure: true
})
export class GetRatingCellPipe implements PipeTransform {
  transform(cell: ICell): RatingCell {
    return cell as RatingCell
  }
}
