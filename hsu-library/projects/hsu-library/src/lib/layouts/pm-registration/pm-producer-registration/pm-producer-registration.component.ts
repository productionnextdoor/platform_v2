import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { EPmInputType } from '../../../components/pm-input/pm-input.component';
import {
  DefaultMargins,
  IMargin
} from '../../../utils/pm-component-margin';
import {
  defaultProducerRegistrationErrors,
  IProducerRegistrationFormErrors,
  IProducerRegistrationLocalisation,
  producerRegistrationLocalisation
} from './pm-producer-registration.shared';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { IProducerTradeType, IRegistrationProducer } from '../../pm-profile/producer.shared';
import { PmDropdownOption } from '../../../components/pm-dropdown/pm-dropdown.shared';
import { EUserStatus } from '../../pm-profile/general.shared';
import { pmEmailValidationRegEx } from '../../../utils/constants/regex-patterns';
import {
  IPasswordComplexity,
  passwordComplexitySetting,
  PmPasswordValidation
} from '../../../utils/password-validation';
import { IImprintLink } from '../../../shared/imprint.shared';
import { PmCheckboxState } from '../../../components/pm-checkbox/pm-checkbox.shared';
import { TextType } from '../../../components/pm-text/pm-text.shared';

@Component({
  selector: 'pm-producer-registration',
  templateUrl: './pm-producer-registration.component.html',
  styleUrls: ['./pm-producer-registration.component.scss']
})

export class PmProducerRegistrationComponent<T> {

  @Input()
  logoPath: string = '';

  @Input()
  producer: IRegistrationProducer = {
    hourlyWage: 0,
    password: '',
    repeatedPassword: '',
    verificationCode: '',
  };

  @Input()
  localisations: IProducerRegistrationLocalisation = producerRegistrationLocalisation;

  @Input()
  stateDropdownOptions: PmDropdownOption<EUserStatus>[] = [];

  @Input()
  tradeDropdownOptions: PmDropdownOption<number>[] = [];

  @Input()
  passwordComplexitySetting: IPasswordComplexity = passwordComplexitySetting;

  @Input()
  termsAndConditionLink!: IImprintLink<T>;

  @Input()
  privacyPolicyLink!: IImprintLink<T>;

  @Output()
  onRegister: EventEmitter<IRegistrationProducer> = new EventEmitter<IRegistrationProducer>();

  @Output()
  onClickImprintLink: EventEmitter<IImprintLink<T>> = new EventEmitter();

  protected producerRegistrationErrors: IProducerRegistrationFormErrors= defaultProducerRegistrationErrors;

  protected agbAndTerms: PmCheckboxState = PmCheckboxState.DEFAULT;

  /** @ignore */
  protected errorMessages: string[] = [];

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly EUserStatus: typeof EUserStatus = EUserStatus;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore **/
  getStateDropdownPlaceholder(): string {
    return this.producer.isActive ? this.localisations.isActive : this.localisations.isInactive;
  }

  /** @ignore */
  setStateInProducer(newKey: string): void {
    this.producer.isActive = (newKey === EUserStatus.Active);
  }

  /** @ignore */
  setTradeTypeInProducer(newKey: number): void {
    const producerTradeTypes: IProducerTradeType[] = this.producer.tradeTypes ?? [];
    const correspondingTradeType: IProducerTradeType | undefined = producerTradeTypes.find(
      tradeType => tradeType.key === newKey
    );
    if (correspondingTradeType) {
      this.producer.trade = correspondingTradeType;
    }
  }

  /** @ignore */
  resetFormErrors(): void {
    this.producerRegistrationErrors = defaultProducerRegistrationErrors;
  }

  /** @ignore */
  onRegisterClick(): void {
    this.updateFormErrors();

    this.errorMessages = PmPasswordValidation.ValidatePasswordComplexity(
      this.passwordComplexitySetting,
      this.localisations.passwordErrorTexts,
      this.producer.password
    )

    if (this.errorMessages.length > 0) {
      this.producerRegistrationErrors.password = true;
    }

    if (this.formHasErrors()) {
      return;
    }
    this.onRegister.emit(this.producer);
  }

  /** @ignore */
  private formHasErrors(): boolean {
    return Object.values(this.producerRegistrationErrors).some((error: boolean) => error);
  }

  /** @ignore */
  private updateFormErrors(): void {
    this.producerRegistrationErrors = {
      companyName: !this.producer.companyName,
      employees: !this.producer.numberOfEmployees,
      hourlyWage: !this.producer.hourlyWage,
      contactPerson: !this.producer.contactPersonFullName,
      street: !this.producer.street,
      zipCode: (this.producer.zipCode === undefined) || (this.producer.zipCode.length < 1),
      city: !this.producer.city,
      mail: !this.producer.email || !pmEmailValidationRegEx.test(this.producer.email),
      phoneNumber: !this.producer.phoneNumber,
      password: !this.producer.password,
      repeatedPassword: !this.producer.repeatedPassword || (this.producer.password !== this.producer.repeatedPassword),
      agbAndTerms: !this.producer.agbAndTerms,
    };
  }

  /** @ignore */
  onAgbAndTermsChange(state: PmCheckboxState): void {
    this.agbAndTerms = state;
    this.producer.agbAndTerms = state === PmCheckboxState.ACTIVE;
  }

  /** @ignore */
  onImprintLinkClicked(link: IImprintLink<T>): void {
    this.onClickImprintLink.emit(link);
  }
}
