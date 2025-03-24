import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import {
  DeveloperBaseData,
  IDeveloperBaseData,
  IInviteDeveloperPopupLocalisations,
  inviteDeveloperPopupLocalisations
} from './pm-invite-developer-popup.shared';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';
import { emailValidationRegExPattern } from '../../utils/validation-regex';

@Component({
  selector: 'pm-invite-developer-popup',
  templateUrl: './pm-invite-developer-popup.component.html',
  styleUrls: ['./pm-invite-developer-popup.component.scss']
})

export class PmInviteDeveloperPopupComponent {

  @Input()
  localisations: IInviteDeveloperPopupLocalisations = inviteDeveloperPopupLocalisations;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  @Output()
  onInvite: EventEmitter<IDeveloperBaseData> = new EventEmitter<IDeveloperBaseData>();

  protected hasError: boolean = false;
  protected developerBaseData: IDeveloperBaseData = new DeveloperBaseData();

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly subTitleMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.XLarge, 0, DefaultMargins.Medium, 0);

  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  /** @ignore */
  onInviteClick(): void {
    if (!emailValidationRegExPattern.test(this.developerBaseData.email)) {
      this.hasError = true;
      return;
    }
    this.onInvite.emit(this.developerBaseData);
  }
}
