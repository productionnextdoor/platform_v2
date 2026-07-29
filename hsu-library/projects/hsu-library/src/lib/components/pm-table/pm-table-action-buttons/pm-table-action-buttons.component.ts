import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  Icon,
  IconSize
} from '../../pm-icon/pm-icon.shared';
import {
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
  disabled: boolean = false;

  @Output()
  onEntryClicked: EventEmitter<IActionButtonElement> = new EventEmitter();

  /** @ignore **/
  readonly Icon: typeof Icon = Icon;

  /** @ignore **/
  readonly IconSize: typeof IconSize = IconSize;

  clickEntry(entry: IActionButtonElement) {
    this.onEntryClicked.emit(entry);
  }
}
