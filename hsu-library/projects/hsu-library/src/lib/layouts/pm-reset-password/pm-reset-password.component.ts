import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { DefaultMargins } from '../../utils/pm-component-margin';
import { IResetPasswordLocalisations, resetPasswordLocalisations } from './pm-reset-password.shared';
import {
  IPasswordComplexity, passwordComplexitySetting, PmPasswordValidation
} from '../../utils/password-validation';
import { IImprintLink } from '../../shared/imprint.shared';
import { TextType } from '../../components/pm-text/pm-text.shared';


@Component({
  selector: 'pm-reset-password',
  templateUrl: './pm-reset-password.component.html',
  styleUrls: ['./pm-reset-password.component.scss']
})
export class PmResetPasswordComponent<T> {

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
  localisations: IResetPasswordLocalisations = resetPasswordLocalisations;

  @Input()
  passwordComplexitySetting: IPasswordComplexity = passwordComplexitySetting;

  @Input()
  imprintLinks: IImprintLink<T>[] = [];

  @Output()
  onResetPassword: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onBack: EventEmitter<void> = new EventEmitter();

  @Output()
  onClickImprintLink: EventEmitter<IImprintLink<T>> = new EventEmitter();

  /** @ignore */
  protected password: string = '';

  /** @ignore */
  protected repeatedPassword: string = '';

  /** @ignore */
  protected hasError: boolean = false;

  /** @ignore */
  protected errorMessages: string[] = [];

  /**
   * @description: a method for submitting the form and emitting the form data
   * @ignore
   */
  onSubmitButtonClick(): void {
    this.resetValidation();
    this.passwordValidation();

    if (this.hasError) {
      return;
    }
    this.onResetPassword.emit(this.password);
  }

  resetValidation() {
    this.hasError = false;
    this.errorMessages = [];
  }

  passwordValidation() {
    if (this.password !== this.repeatedPassword) {
      this.hasError = true;
    }

    this.errorMessages = PmPasswordValidation.ValidatePasswordComplexity(
      this.passwordComplexitySetting,
      this.localisations.errorTexts,
      this.password
    )

    if (this.errorMessages.length > 0) {
      this.hasError = true;
    }
  }

  /** @ignore */
  onImprintLinkClicked(link: IImprintLink<T>): void {
    this.onClickImprintLink.emit(link);
  }
}
