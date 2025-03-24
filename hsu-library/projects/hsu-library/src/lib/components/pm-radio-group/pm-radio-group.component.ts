import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  IRadioButtonData,
  IRadioButtonEventData
} from '../pm-radiobutton/pm-radiobutton.shared';

@Component({
  selector: 'pm-radio-group',
  templateUrl: './pm-radio-group.component.html',
  styleUrls: ['./pm-radio-group.component.scss']
})
export class PmRadioGroupComponent {

  @Input()
  radioGroup: IRadioButtonData[] = [];

  @Output()
  onSelect: EventEmitter<IRadioButtonEventData[]> = new EventEmitter<IRadioButtonEventData[]>();

  /** @ignore */
  onSelectHandler(event: IRadioButtonEventData) {
    // Map over the radio group data to create a new array with updated radio states
    const updatedRadioStates: IRadioButtonData[] = this.radioGroup.map((radio: IRadioButtonData) => ({
      ...radio, // Use object spread to clone the radio object
      state: radio.radioButtonId === event.radioButtonId ? event.state : false, // Update radio state based on radio ID
    }));

    this.radioGroup = updatedRadioStates;
    // Emit an event with the updated radio group data
    this.onSelect.emit(updatedRadioStates);
  }
}
