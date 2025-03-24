import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { IPmFinalProductStepPopupLocalisations, pmFinalProductStepPopupLocalisations } from './pm-final-product-step-popup.shared';



@Component({
  selector: 'pm-final-product-step-popup',
  templateUrl: './pm-final-product-step-popup.component.html',
  styleUrls: ['./pm-final-product-step-popup.component.scss']
})
export class PmFinalProductStepPopupComponent {
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly PopupType: typeof PopupType = PopupType;

  @Input()
  localisations: IPmFinalProductStepPopupLocalisations = pmFinalProductStepPopupLocalisations;

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onConfirm: EventEmitter<void> = new EventEmitter();
}
