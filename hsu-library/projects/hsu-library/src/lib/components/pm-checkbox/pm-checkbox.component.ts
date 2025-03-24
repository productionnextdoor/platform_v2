import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  PmCheckboxState
} from './pm-checkbox.shared';

@Component({
  selector: 'pm-checkbox',
  templateUrl: './pm-checkbox.component.html',
  styleUrls: ['./pm-checkbox.component.scss']
})
export class PmCheckboxComponent {
  @Input()
  disabled: boolean = false;

  @Input()
  hovered: boolean = false;

  @Input()
  state: PmCheckboxState = PmCheckboxState.DEFAULT;

  @Input()
  label: string = '';

  @Input()
  checkboxId: string = '';

  @Input()
  public hasError: boolean = false;

  @Output()
  stateChange: EventEmitter<PmCheckboxState> = new EventEmitter<PmCheckboxState>();

  /** @ignore */
  readonly ECheckboxState: typeof PmCheckboxState = PmCheckboxState;

  /** @ignore */
  checkboxOnClick() {
    this.hasError = false;
    this.state = this.state === PmCheckboxState.DEFAULT ? PmCheckboxState.ACTIVE : PmCheckboxState.DEFAULT;
    this.stateChange.emit(this.state);
  }
}
