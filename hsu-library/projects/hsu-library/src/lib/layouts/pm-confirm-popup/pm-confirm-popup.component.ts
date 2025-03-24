import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { pmConfirmPopupLocalisations, IPmConfirmPopupLocalisations } from './pm-confirm-popup.shared';

@Component({
  selector: 'pm-confirm-popup',
  templateUrl: './pm-confirm-popup.component.html',
  styleUrls: ['./pm-confirm-popup.component.scss']
})
export class PmConfirmPopupComponent {
  protected readonly ButtonType = ButtonType;
  protected readonly PopupType = PopupType;

  @Input()
  confirmDisabled: boolean = false;

  @Input()
  localisations: IPmConfirmPopupLocalisations = pmConfirmPopupLocalisations;

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onConfirm: EventEmitter<void> = new EventEmitter();
}
