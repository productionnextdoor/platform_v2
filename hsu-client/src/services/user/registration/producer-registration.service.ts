import { Injectable } from '@angular/core';
import { IProducerRegistrationService } from './iproducer-registration.service';
import { AppLocalizationService } from '../../localization/app-localization.service';
import { map, Observable } from 'rxjs';
import {
  ProducerInviteDto,
  ProducerRegistrationInput,
  ProducerRegistrationOutput,
  TradeTypeDto,
  UserRegistrationServiceProxy,
  UserTradeServiceProxy
} from '../../../shared/service-proxies/service-proxies';
import {
  IErrorTexts,
  IProducerBaseData,
  IProducerRegistrationLocalisation,
  IProducerTradeType,
  IRegistrationProducer,
  PmDropdownOption
} from 'hsu-library';

@Injectable()
export class ProducerRegistrationService extends IProducerRegistrationService {

  constructor(
    protected readonly localizationService: AppLocalizationService,
    protected readonly registrationService: UserRegistrationServiceProxy,
    protected readonly tradeTypeService: UserTradeServiceProxy,
  ) {
    super();
  }

  // eslint-disable-next-line max-lines-per-function
  getLocalisationStrings(): IProducerRegistrationLocalisation {
    return {
      title: this.localizationService.loc('Registration.Title'),
      isActive: this.localizationService.loc('Registration.Producer.State.IsActive'),
      isInactive: this.localizationService.loc('Registration.Producer.State.IsInactive'),
      hourlyWageUnit: this.localizationService.loc('Registration.Producer.HourlyWage.Unit'),
      labels: {
        companyName: this.localizationService.loc('Registration.Producer.Input.CompanyName.Label'),
        tradeType: this.localizationService.loc('Registration.Producer.Input.TradeType.Label'),
        employees: this.localizationService.loc('Registration.Producer.Input.Employees.Label'),
        state: this.localizationService.loc('Registration.Producer.Input.State.Label'),
        hourlyWage: this.localizationService.loc('Registration.Producer.Input.HourlyWage.Label'),
        contactPerson: this.localizationService.loc('Registration.Producer.Input.ContactPerson.Label'),
        street: this.localizationService.loc('Registration.Input.Street.Label'),
        zipCode: this.localizationService.loc('Registration.Input.ZIP.Label'),
        city: this.localizationService.loc('Registration.Input.City.Label'),
        mail: this.localizationService.loc('Registration.Input.Mail.Label'),
        phoneNumber: this.localizationService.loc('Registration.Input.Phone.Label'),
        password: this.localizationService.loc('Registration.Input.Password.Label'),
        repeatPassword: this.localizationService.loc('Registration.Input.RepeatPassword.Label'),
        register: this.localizationService.loc('Registration.ButtonLabel'),
        acceptTermsAndPrivacyPartOne: this.localizationService.loc('TermsAndPrivacy.Acknowledgement.First'),
        acceptTermsAndPrivacyPartTwo: this.localizationService.loc('TermsAndPrivacy.Acknowledgement.Second'),
      },
      placeholder: {
        companyName: this.localizationService.loc('Registration.Producer.Input.CompanyName.Placeholder'),
        tradeType: this.localizationService.loc('Registration.Producer.Input.TradeType.Placeholder'),
        employees: this.localizationService.loc('Registration.Producer.Input.Employees.Placeholder'),
        state: this.localizationService.loc('Registration.Producer.Input.State.Placeholder'),
        hourlyWage: this.localizationService.loc('Registration.Producer.Input.HourlyWage.Placeholder'),
        contactPerson: this.localizationService.loc('Registration.Producer.Input.ContactPerson.Placeholder'),
        street: this.localizationService.loc('Registration.Input.Street.Placeholder'),
        zipCode: this.localizationService.loc('Registration.Input.ZIP.Placeholder'),
        city: this.localizationService.loc('Registration.Input.City.Placeholder'),
        mail: this.localizationService.loc('Registration.Input.Mail.Placeholder'),
        phoneNumber: this.localizationService.loc('Registration.Input.Phone.Placeholder'),
        password: this.localizationService.loc('Registration.Input.Password.Placeholder'),
        repeatPassword: this.localizationService.loc('Registration.Input.RepeatPassword.Placeholder'),
      },
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
      passwordErrorTexts: this.getPasswordErrorTexts(),
    }
  }

  getPasswordErrorTexts(): IErrorTexts {
    return {
      passwordMismatch: this.localizationService.loc('ResetPassword.PasswordComplexity.PasswordsMismatch'),
      requireDigit: this.localizationService.loc('ResetPassword.PasswordComplexity.RequireDigit'),
      requireLowercase: this.localizationService.loc('ResetPassword.PasswordComplexity.RequireLowercase'),
      requireNonAlphanumeric: this.localizationService.loc('ResetPassword.PasswordComplexity.RequireNonAlphanumeric'),
      requireUppercase: this.localizationService.loc('ResetPassword.PasswordComplexity.RequireUppercase'),
      requiredLength: this.localizationService.loc('ResetPassword.PasswordComplexity.RequiredLength'),
    }
  }

  inviteProducer(producerBaseData: IProducerBaseData): Observable<void> {
    return this.registrationService.sendProducerInvitation(
      new ProducerInviteDto({
        companyName: producerBaseData.companyName,
        email: producerBaseData.email,
        tradeType: this.mapToTradeTypeDto(producerBaseData.trade),
        fullName: producerBaseData.contactPerson
      })
    )
  }

  getTradeTypes(): Observable<PmDropdownOption<number>[]> {
    return this.tradeTypeService.getTradeTypes().pipe(
      map(result => (
        result.map((tradeType: TradeTypeDto) => ({
          key: tradeType.tradeTypeId,
          value: this.localizationService.getLocalizedTradeTypeName(tradeType.tradeTypeName) ?? ''
        }))
      ))
    );
  }

  getRegisteredProducerData(verificationCode: string): Observable<IRegistrationProducer> {
    return this.registrationService.getProducerForRegistration(verificationCode).pipe(
      map(this.mapFromProducerProfileOutput.bind(this))
    );
  }

  registerProducer(producer: IRegistrationProducer): Observable<void> {
    const {
      companyName= '',
      contactPersonFullName = '',
      numberOfEmployees = 0,
      hourlyWage = 0,
      street = '',
      zipCode = '',
      city = '',
      email = '',
      phoneNumber = '',
      password = '',
      repeatedPassword = '',
      verificationCode = '',
      agbAndTerms = false,
    } = producer;

    return this.registrationService.registerProducer(
      new ProducerRegistrationInput({
        companyName,
        contactPersonFullName,
        numberOfEmployees,
        rate: hourlyWage,
        street,
        zipCode,
        city,
        email,
        phoneNumber,
        password,
        confirmPassword: repeatedPassword,
        verificationCode,
        acceptedTermsAndPrivacy: agbAndTerms
      })
    );
  }

  private mapToTradeTypeDto(tradeType: IProducerTradeType): TradeTypeDto {
    return new TradeTypeDto( {
      tradeTypeName: tradeType.value ?? '',
      tradeTypeId: tradeType.key,
    });
  }

  private mapFromTradeTypeDto(tradeType: TradeTypeDto): IProducerTradeType {
    return {
      key: tradeType.tradeTypeId,
      value: tradeType.tradeTypeName ?? ''
    };
  }

  private mapFromProducerProfileOutput(producerProfile: ProducerRegistrationOutput): IRegistrationProducer {
    return {
      contactPersonFullName: producerProfile.contactPersonFullName,
      companyName: producerProfile.companyName,
      trade: this.mapFromTradeTypeDto(producerProfile.tradeType),
      numberOfEmployees: producerProfile.numberOfEmployees,
      hourlyWage: 0,
      street: producerProfile.street,
      zipCode: producerProfile.zipCode,
      city: producerProfile.city,
      email: producerProfile.email,
      phoneNumber: producerProfile.phoneNumber,
      isActive: false,
      password: '',
      repeatedPassword: '',
      verificationCode: ''
    };
  }
}
