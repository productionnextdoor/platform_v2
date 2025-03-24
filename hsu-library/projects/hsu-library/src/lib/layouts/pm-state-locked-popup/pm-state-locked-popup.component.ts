import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { IPmStateLockedPopupLocalisations, pmStateLockedPopupLocalisations } from './pm-state-locked-popup.shared';



@Component({
  selector: 'pm-state-lock-popup',
  templateUrl: './pm-state-locked-popup.component.html',
  styleUrls: ['./pm-state-locked-popup.component.scss']
})
export class PmStateLockedPopupComponent {
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly PopupType: typeof PopupType = PopupType;

  @Input()
  localisations: IPmStateLockedPopupLocalisations = pmStateLockedPopupLocalisations;

  @Output()
  onConfirm: EventEmitter<void> = new EventEmitter();
}
