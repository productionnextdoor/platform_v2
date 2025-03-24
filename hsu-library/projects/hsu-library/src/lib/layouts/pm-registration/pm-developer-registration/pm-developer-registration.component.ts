import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { BannerType } from '../../../components/pm-banner/pm-banner.shared';
import {
  DefaultMargins,
  IMargin
} from '../../../utils/pm-component-margin';
import { EPmInputType } from '../../../components/pm-input/pm-input.component';
import {
  defaultDeveloperRegistrationErrors,
  developerRegistrationLocalisation,
  IDeveloperRegistrationFormErrors,
  IDeveloperRegistrationLocalisation
} from './pm-developer-registration.shared';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { IRegistrationDeveloper } from '../../pm-profile/developer.shared';
import { pmEmailValidationRegEx } from '../../../utils/constants/regex-patterns';
import {
  IPasswordComplexity,
  passwordComplexitySetting,
  PmPasswordValidation
} from '../../../utils/password-validation';
import { PmCheckboxState } from '../../../components/pm-checkbox/pm-checkbox.shared';
import { IImprintLink } from '../../../shared/imprint.shared';
import { TextType } from '../../../components/pm-text/pm-text.shared';

@Component({
  selector: 'pm-developer-registration',
  templateUrl: './pm-developer-registration.component.html',
  styleUrls: ['./pm-developer-registration.component.scss']
})

export class PmDeveloperRegistrationComponent<T> {

  @Input()
  logoPath: string = '';

  @Input()
  developer: IRegistrationDeveloper = {
    password: '',
    repeatedPassword: '',
    verificationCode: '',
  };

  @Input()
  localisations: IDeveloperRegistrationLocalisation = developerRegistrationLocalisation;

  @Input()
  passwordComplexitySetting: IPasswordComplexity = passwordComplexitySetting;

  @Input()
  termsAndConditionLink!: IImprintLink<T>;

  @Input()
  privacyPolicyLink!: IImprintLink<T>;

  @Output()
  onRegister: EventEmitter<IRegistrationDeveloper> = new EventEmitter<IRegistrationDeveloper>();

  @Output()
  onClickImprintLink: EventEmitter<IImprintLink<T>> = new EventEmitter();

  protected developerRegistrationErrors: IDeveloperRegistrationFormErrors= defaultDeveloperRegistrationErrors;

  protected agbAndTerms: PmCheckboxState = PmCheckboxState.DEFAULT;

  /** @ignore */
  protected visibleNote: boolean = true;

  /** @ignore */
  protected errorMessages: string[] = [];

  /** @ignore */
  protected readonly BannerType: typeof BannerType = BannerType;

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  protected onCLoseBanner(): void {
    this.visibleNote = false;
  }

  /** @ignore */
  resetFormErrors(): void {
    this.developerRegistrationErrors = defaultDeveloperRegistrationErrors;
  }

  /** @ignore */
  onRegisterClick(): void {
    this.updateFormErrors();

    this.errorMessages = PmPasswordValidation.ValidatePasswordComplexity(
      this.passwordComplexitySetting,
      this.localisations.passwordErrorTexts,
      this.developer.password
    )

    if (this.errorMessages.length > 0) {
      this.developerRegistrationErrors.password = true;
    }

    if (this.formHasErrors()) {
      return;
    }
    this.onRegister.emit(this.developer);
  }

  /** @ignore */
  private formHasErrors(): boolean {
    return Object.values(this.developerRegistrationErrors).some((error: boolean) => error);
  }

  /** @ignore */
  private updateFormErrors() {
    this.developerRegistrationErrors = {
      fullName: !this.developer.fullName,
      pseudonym: !this.developer.pseudonym,
      street: !this.developer.street,
      zipCode: (this.developer.zipCode === undefined) || (this.developer.zipCode.length < 1),
      city: !this.developer.city,
      region: !this.developer.region,
      country: !this.developer.country,
      mail: !this.developer.email || !pmEmailValidationRegEx.test(this.developer.email),
      phoneNumber: !this.developer.phoneNumber,
      password: !this.developer.password,
      repeatedPassword: !this.developer.repeatedPassword || (this.developer.password !== this.developer.repeatedPassword),
      agbAndTerms: !this.developer.agbAndTerms
    };
  }

  /** @ignore */
  onAgbAndTermsChange(state: PmCheckboxState): void {
    this.agbAndTerms = state;
    this.developer.agbAndTerms = state === PmCheckboxState.ACTIVE;
  }

  /** @ignore */
  onImprintLinkClicked(link: IImprintLink<T>): void {
    this.onClickImprintLink.emit(link);
  }
}
