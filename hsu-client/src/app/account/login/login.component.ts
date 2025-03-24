import {
  Component,
  OnInit
} from '@angular/core';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import {
  IImprintLink,
  ILoginEvent,
  ILoginPageTexts
} from 'hsu-library';
import { IAuthService } from '../../../services/account/iauth.service';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { Path } from '../../app-routing.module';
import { AppConsts } from '../../../shared/AppConsts';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  email: string = '';

  password: string = '';

  logoPath: string = '';

  imprintLinks: IImprintLink<Path>[] = AppConsts.getImprintLinks(this.localizationService.loc('TermsAndConditions.Title'), this.localizationService.loc('PrivacyPolicy.Title'));

  loginPageTexts: ILoginPageTexts = {
    title: this.localizationService.loc('LoginPage.Title'),
    emailAddress: this.localizationService.loc('LoginPage.EmailAddress'),
    emailName: this.localizationService.loc('LoginPage.EmailName'),
    password: this.localizationService.loc('LoginPage.Password'),
    passwordName: this.localizationService.loc('LoginPage.PasswordName'),
    submitTitle: this.localizationService.loc('LoginPage.SubmitTitle'),
    forgotPassword: this.localizationService.loc('LoginPage.ForgotPassword'),
    rememberMe: this.localizationService.loc('LoginPage.RememberMe'),
    inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
  };

  constructor(
    private readonly navigationService: INavigationService,
    private readonly authService: IAuthService,
    private readonly localizationService: AppLocalizationService
  ) {
  }

  ngOnInit() {
    this.logoPath = this.navigationService.getLogoTextPath();
  }

  loginHandler(event: ILoginEvent) {
    this.authService.authenticate(event.email, event.password, event.rememberMe,this.navigationService.getRedirectUrl());
  }

  navigateToForgotPassword() {
    this.navigationService.navigate(Path.FORGOT_PASSWORD);
  }

  onImprintLinkClicked(imprint: IImprintLink<Path>) {
    this.navigationService.navigate(imprint?.path ?? Path.DEFAULT);
  }
}
