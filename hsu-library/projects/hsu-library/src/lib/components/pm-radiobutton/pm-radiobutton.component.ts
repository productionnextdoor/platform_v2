import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import {
  IRadioButtonEventData
} from './pm-radiobutton.shared';

@Component({
  selector: 'pm-radiobutton',
  templateUrl: './pm-radiobutton.component.html',
  styleUrls: ['./pm-radiobutton.component.scss']
})
export class PmRadiobuttonComponent {
  @Input()
  checked: boolean = false;

  @Input()
  name: string = '';

  @Input()
  radioId: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  label: string = '';

  @Output()
  onActivate: EventEmitter<IRadioButtonEventData> = new EventEmitter<IRadioButtonEventData>();

  /** @ignore */
  onClick(event: Event) {
    const radioTarget: HTMLInputElement = event.target as HTMLInputElement;
    this.onActivate.emit({
      radioButtonId: this.radioId,
      state: radioTarget.checked
    });
    // Update the radio button state
    this.checked = radioTarget.checked;
  }
}
