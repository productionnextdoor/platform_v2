import {
  Component, Input, OnInit
} from '@angular/core';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import {
  developerRegistrationLocalisation,
  IDeveloperRegistrationLocalisation,
  IRegistrationDeveloper,
  IPasswordComplexity,
  IImprintLink
} from 'hsu-library';
import { IDeveloperRegistrationService } from '../../../services/user/registration/ideveloper-registration.service';
import { Path } from '../../app-routing.module';
import { IPasswordRecoveryService } from '../../../services/account/ipassword-recovery.service';
import { AppConsts } from '../../../shared/AppConsts';
import { AppLocalizationService } from 'src/services/localization/app-localization.service';

@Component({
  selector: 'developer-registration',
  templateUrl: './developer-registration.component.html'
})
export class DeveloperRegistrationComponent implements OnInit{

  @Input()
  verificationCode: string = '';

  protected logoPath: string = '';
  protected localisations: IDeveloperRegistrationLocalisation = developerRegistrationLocalisation;

  protected developer: IRegistrationDeveloper = {
    password: '',
    repeatedPassword: '',
    verificationCode: '',
  };

  protected passwordComplexitySetting: IPasswordComplexity = {
    requireDigit: false,
    requireLowercase: false,
    requireNonAlphanumeric: false,
    requireUppercase: false,
    requiredLength: 0
  };

  protected imprintLinks: IImprintLink<Path>[] = [];

  constructor(
    private readonly navigationService: INavigationService,
    private readonly developerRegistrationService: IDeveloperRegistrationService,
    private readonly passwordRecoveryService: IPasswordRecoveryService,
    private readonly localizationService: AppLocalizationService
  ) {
  }

  ngOnInit() {
    this.logoPath = this.navigationService.getLogoTextPath();
    this.localisations = this.developerRegistrationService.getLocalisationStrings();

    this.developerRegistrationService.getRegisteredDeveloperData(this.verificationCode).subscribe((result) => {
      this.developer.fullName = result.fullName;
      this.developer.email = result.email;
      this.developer.agbAndTerms = false;
    })

    this.passwordRecoveryService.GetPasswordComplexitySetting()
      .subscribe((result: IPasswordComplexity) => {
        this.passwordComplexitySetting = result;
      });

    this.imprintLinks = AppConsts.getImprintLinks(this.localizationService.loc('TermsAndConditions.ShortTitle'), this.localizationService.loc('PrivacyPolicy.Title'));
  }

  registerDeveloper() {
    this.developerRegistrationService.registerDeveloper({
      ...this.developer,
      verificationCode: this.verificationCode
    }).subscribe({
      next: () => {
        this.navigationService.navigate(Path.LOGIN);
      }
    })
  }

  onImprintLinkClicked(imprint: IImprintLink<Path>) {
    this.navigationService.navigateToNewTab(imprint?.path ?? Path.DEFAULT);
  }
}
