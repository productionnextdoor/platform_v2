import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  IStepItem
} from './pm-steps.shared';

@Component({
  selector: 'pm-steps',
  templateUrl: './pm-steps.component.html',
  styleUrls: ['./pm-steps.component.scss']
})
export class PmStepsComponent {
  @Input()
  steps: IStepItem[] = [];

  @Output()
  onChange: EventEmitter<string> = new EventEmitter();

  /** @ignore */
  onClickHandler(event: Event, step: IStepItem): void {
    event.preventDefault();
    if (step.disabled || step.active)
      return;

    this.onChange.emit(step.value);
  }
}
