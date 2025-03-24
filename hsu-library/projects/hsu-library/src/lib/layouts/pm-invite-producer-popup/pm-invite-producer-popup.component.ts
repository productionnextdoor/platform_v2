import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import {
  IInviteProducerPopupLocalisations, InviteProducerPopupLocalisations, IProducerBaseData, ProducerBaseData
} from './pm-invite-producer-popup.shared';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { DefaultMargins } from '../../utils/pm-component-margin';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { emailValidationRegExPattern } from '../../utils/validation-regex';

@Component({
  selector: 'pm-invite-producer-popup',
  templateUrl: './pm-invite-producer-popup.component.html',
  styleUrls: ['./pm-invite-producer-popup.component.scss']
})
export class PmInviteProducerPopupComponent {

  protected readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly PopupType: typeof PopupType = PopupType;
  protected readonly TextType: typeof TextType = TextType;
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  protected isValid: boolean = false;
  protected hasEmailError: boolean = false;
  protected producerBaseData: IProducerBaseData = new ProducerBaseData();

  @Input()
  localisations: IInviteProducerPopupLocalisations = InviteProducerPopupLocalisations;

  @Input()
  tradeOptions: PmDropdownOption<number>[] = [];

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  @Output()
  onInvite: EventEmitter<IProducerBaseData> = new EventEmitter<IProducerBaseData>();

  validateData(): void {
    this.isValid =
      !!this.producerBaseData.companyName &&
      !!this.producerBaseData.trade &&
      !!this.producerBaseData.email &&
      !!this.producerBaseData.contactPerson
  }

  validateEmailData(): void {
    this.validateData();
    this.hasEmailError = false;
  }

  /** @ignore */
  onInviteClick(): void {
    if (!emailValidationRegExPattern.test(this.producerBaseData.email)) {
      this.hasEmailError = true;
      return;
    }
    this.onInvite.emit(this.producerBaseData)
  }
}
