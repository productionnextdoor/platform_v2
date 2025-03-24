import {
  Component, Input, OnInit
} from '@angular/core';
import {
  PmDropdownOption,
  IProducerRegistrationLocalisation,
  producerRegistrationLocalisation,
  IPasswordComplexity,
  IRegistrationProducer,
  IImprintLink
} from 'hsu-library';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { IPasswordRecoveryService } from '../../../services/account/ipassword-recovery.service';
import { IProducerRegistrationService } from '../../../services/user/registration/iproducer-registration.service';
import { Path } from '../../app-routing.module';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { AppConsts } from '../../../shared/AppConsts';

@Component({
  selector: 'producer-registration',
  templateUrl: './producer-registration.component.html'
})
export class ProducerRegistrationComponent implements OnInit {
  @Input()
  verificationCode: string = '';

  protected logoPath: string = '';
  protected localisations: IProducerRegistrationLocalisation = producerRegistrationLocalisation;
  protected tradeDropdownOptions: PmDropdownOption<number>[] = [];

  protected producer: IRegistrationProducer  = {
    hourlyWage: 0,
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
    private readonly producerRegistrationService: IProducerRegistrationService,
    private readonly passwordRecoveryService: IPasswordRecoveryService,
    private readonly localizationService: AppLocalizationService
  ) {
  }

  ngOnInit() {
    this.logoPath = this.navigationService.getLogoTextPath();
    this.localisations = this.producerRegistrationService.getLocalisationStrings();

    this.producerRegistrationService.getTradeTypes().subscribe(options => {
      this.tradeDropdownOptions = options;

      //tradeDropdownOṕtions need to be set before requesting RegisteredProducerData
      this.producerRegistrationService.getRegisteredProducerData(this.verificationCode).subscribe((result) => {
        this.producer.companyName = result.companyName;
        this.producer.email = result.email;
        this.producer.trade = result.trade;
        this.producer.contactPersonFullName = result.contactPersonFullName;
        this.producer.agbAndTerms = false;
      });
    });

    this.passwordRecoveryService.GetPasswordComplexitySetting()
      .subscribe((result: IPasswordComplexity) => {
        this.passwordComplexitySetting = result;
      });

    this.imprintLinks = AppConsts.getImprintLinks(this.localizationService.loc('TermsAndConditions.ShortTitle'), this.localizationService.loc('PrivacyPolicy.Title'));
  }

  registerProducer() {
    this.producerRegistrationService.registerProducer({
      ...this.producer,
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
