import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { pmStatePopupLocalisations, IPmStatePopupLocalisations } from './pm-state-popup.shared';

const DEFAULT_COUNTDOWN: number = 300;

@Component({
  selector: 'pm-state-popup',
  templateUrl: './pm-state-popup.component.html',
  styleUrls: ['./pm-state-popup.component.scss']
})
export class PmStatePopupComponent {
  protected readonly ButtonType = ButtonType;
  protected readonly PopupType = PopupType;

  @Input()
  localisations: IPmStatePopupLocalisations = pmStatePopupLocalisations;

  @Input()
  countdown: number = DEFAULT_COUNTDOWN;

  @Input()
  stateName: string = '';

  @Input()
  stateId: number = 0;

  @Input()
  canDelete: boolean = false;

  @Input()
  suggestions: string[] = [];

  @Output()
  stateNameChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onTimerReset: EventEmitter<void> = new EventEmitter();

  @Output()
  onTimerFinished: EventEmitter<void> = new EventEmitter();

  @Output()
  onDelete: EventEmitter<void> = new EventEmitter();

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onConfirm: EventEmitter<string> = new EventEmitter<string>();
}
