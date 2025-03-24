import { Injectable } from '@angular/core';
import { IDeveloperRegistrationService } from './ideveloper-registration.service';
import { AppLocalizationService } from '../../localization/app-localization.service';
import {
  DeveloperInviteDto,
  DeveloperProfile,
  DevelopersRegistrationInput,
  UserRegistrationServiceProxy
} from '../../../shared/service-proxies/service-proxies';
import {
  IRegistrationDeveloper,
  IDeveloperBaseData,
  IErrorTexts,
  IDeveloperRegistrationLocalisation
} from 'hsu-library';
import { map, Observable } from 'rxjs';

@Injectable()
export class DeveloperRegistrationService extends IDeveloperRegistrationService {

  constructor(
    protected readonly localizationService: AppLocalizationService,
    protected readonly registrationService: UserRegistrationServiceProxy,
  ) {
    super();
  }

  inviteDeveloper(developerBaseData: IDeveloperBaseData): Observable<void> {
    return this.registrationService.sendDeveloperInvitation(
      new DeveloperInviteDto({
        fullName: developerBaseData.developerName,
        email: developerBaseData.email
      })
    )
  }

  getRegisteredDeveloperData(verificationCode: string): Observable<IRegistrationDeveloper> {
    return this.registrationService.getDeveloperForRegistration(verificationCode).pipe(
      map(this.mapFromDeveloperProfile.bind(this))
    );
  }

  registerDeveloper(developer: IRegistrationDeveloper): Observable<void> {
    const {
      fullName = '',
      pseudonym = '',
      street = '',
      zipCode = '',
      city = '',
      region = '',
      country = '',
      email = '',
      phoneNumber = '',
      password = '',
      repeatedPassword = '',
      verificationCode = '',
      agbAndTerms = false,
    } = developer;

    return this.registrationService.registerDeveloper(
      new DevelopersRegistrationInput({
        contactPersonFullName: fullName,
        companyName: pseudonym,
        street,
        zipCode,
        city,
        region,
        country,
        email,
        phoneNumber,
        password,
        confirmPassword: repeatedPassword,
        verificationCode,
        acceptedTermsAndPrivacy: agbAndTerms
      })
    );
  }

  // eslint-disable-next-line max-lines-per-function
  getLocalisationStrings(): IDeveloperRegistrationLocalisation {
    return {
      title: this.localizationService.loc('Registration.Title'),
      bannerText: this.localizationService.loc('Registration.Developer.Banner'),
      labels: {
        fullName: this.localizationService.loc('Registration.Developer.Input.Name.Label'),
        pseudonym: this.localizationService.loc('Registration.Developer.Input.Pseudonym.Label'),
        street: this.localizationService.loc('Registration.Input.Street.Label'),
        zipCode: this.localizationService.loc('Registration.Input.ZIP.Label'),
        city: this.localizationService.loc('Registration.Input.City.Label'),
        region: this.localizationService.loc('Registration.Input.Region.Label'),
        country: this.localizationService.loc('Registration.Input.Country.Label'),
        mail: this.localizationService.loc('Registration.Input.Mail.Label'),
        phoneNumber: this.localizationService.loc('Registration.Input.Phone.Label'),
        password: this.localizationService.loc('Registration.Input.Password.Label'),
        repeatPassword: this.localizationService.loc('Registration.Input.RepeatPassword.Label'),
        register: this.localizationService.loc('Registration.ButtonLabel'),
        acceptTermsAndPrivacyPartOne: this.localizationService.loc('TermsAndPrivacy.Acknowledgement.First'),
        acceptTermsAndPrivacyPartTwo: this.localizationService.loc('TermsAndPrivacy.Acknowledgement.Second'),
      },
      placeholder: {
        fullName: this.localizationService.loc('Registration.Developer.Input.Name.Placeholder'),
        pseudonym: this.localizationService.loc('Registration.Developer.Input.Pseudonym.Placeholder'),
        street: this.localizationService.loc('Registration.Input.Street.Placeholder'),
        zipCode: this.localizationService.loc('Registration.Input.ZIP.Placeholder'),
        city: this.localizationService.loc('Registration.Input.City.Placeholder'),
        region: this.localizationService.loc('Registration.Input.Region.Placeholder'),
        country: this.localizationService.loc('Registration.Input.Country.Placeholder'),
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

  private mapFromDeveloperProfile(developerProfile: DeveloperProfile): IRegistrationDeveloper {
    return {
      fullName: developerProfile.contactPersonFullName,
      pseudonym: '',
      street: developerProfile.street,
      zipCode: developerProfile.zipCode,
      city: developerProfile.city,
      region: developerProfile.region,
      country: developerProfile.country,
      email: developerProfile.email,
      phoneNumber: developerProfile.phoneNumber,
      isActive: false,
      password: '',
      repeatedPassword: '',
      verificationCode: ''
    };
  }
}
