import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import {
  IRequestPasswordMailLocalisations,
  requestPasswordMailLocalisations
} from './pm-request-password-mail.shared';
import { DefaultMargins } from '../../utils/pm-component-margin';
import { emailValidationRegExPattern } from '../../utils/validation-regex';
import { TextType } from '../../components/pm-text/pm-text.shared';
import { IImprintLink } from '../../shared/imprint.shared';

@Component({
  selector: 'pm-request-password-mail',
  templateUrl: './pm-request-password-mail.component.html',
  styleUrls: ['./pm-request-password-mail.component.scss']
})
export class PmRequestPasswordMailComponent<T> {

  /** @ignore */
  readonly EPmInputType: typeof EPmInputType = EPmInputType;

  /** @ignore */
  readonly EButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  @Input()
  logoPath: string = '';

  @Input()
  showSuccessPopUp: boolean = false;

  @Input()
  localisations: IRequestPasswordMailLocalisations = requestPasswordMailLocalisations;

  @Input()
  imprintLinks: IImprintLink<T>[] = [];

  @Output()
  onRequestPasswordMail: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onBack: EventEmitter<void> = new EventEmitter();

  @Output()
  onClickImprintLink: EventEmitter<IImprintLink<T>> = new EventEmitter();

  /** @ignore */
  protected email: string = '';

  /** @ignore */
  protected hasError: boolean = false;

  /**
   * @description: a method for submitting the form and emitting the form data
   * @ignore
   */
  onSubmitButtonClick(): void {
    if (!emailValidationRegExPattern.test(this.email)) {
      this.hasError = true;
      return;
    }
    this.onRequestPasswordMail.emit(this.email);
  }

  /**
   * @description: a method for closing the popup
   * @ignore
   */
  closePopUp(): void {
    this.showSuccessPopUp = false;
    this.onBack.emit();
  }

  /** @ignore */
  onImprintLinkClicked(link: IImprintLink<T>): void {
    this.onClickImprintLink.emit(link);
  }
}
