import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DefaultMargins, PmComponentMargin } from '../../../utils/pm-component-margin';
import {
  Icon,
  IconSize
} from '../../pm-icon/pm-icon.shared';
import {
  ActionButtonType,
  IActionButtonElement
} from './pm-table-action-buttons.shared';

@Component({
  selector: 'pm-table-action-buttons',
  templateUrl: './pm-table-action-buttons.component.html',
  styleUrls: ['./pm-table-action-buttons.component.scss']
})
export class PmTableActionButtonsComponent {

  @Input()
  actions: IActionButtonElement[] = [];

  @Input()
  buttonType: ActionButtonType = ActionButtonType.ICON;

  @Input()
  disabled: boolean = false;

  @Output()
  onEntryClicked: EventEmitter<IActionButtonElement> = new EventEmitter();

  /** @ignore **/
  readonly Icon: typeof Icon = Icon;

  /** @ignore **/
  readonly IconSize: typeof IconSize = IconSize;
  // eslint-disable-next-line no-magic-numbers
  protected readonly buttonMargin: PmComponentMargin = new PmComponentMargin(3, DefaultMargins.XSmall, 3, 0);
  // eslint-disable-next-line no-magic-numbers
  protected readonly noMargin: PmComponentMargin = new PmComponentMargin(3, 0, 3, 0);

  clickEntry(entry: IActionButtonElement) {
    this.onEntryClicked.emit(entry);
  }

  protected readonly ActionButtonType = ActionButtonType;
}
