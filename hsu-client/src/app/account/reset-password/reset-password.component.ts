import { Component, OnInit } from '@angular/core';
import {
  ResetPasswordInput,
  ResetPasswordOutput
} from '../../../shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { Path } from '../../app-routing.module';
import {
  IResetPasswordLocalisations,
  IPasswordComplexity,
  IImprintLink
} from 'hsu-library';
import { IAuthService } from '../../../services/account/iauth.service';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { IPasswordRecoveryService } from '../../../services/account/ipassword-recovery.service';
import { IUiService } from '../../../services/utils/iui.service';
import { finalize } from 'rxjs';
import { AppConsts } from '../../../shared/AppConsts';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {

  protected logoPath: string = '';
  protected localisations: IResetPasswordLocalisations;
  protected passwordComplexitySetting: IPasswordComplexity = {
    requireDigit: false,
    requireLowercase: false,
    requireNonAlphanumeric: false,
    requireUppercase: false,
    requiredLength: 0
  };

  protected imprintLinks: IImprintLink<Path>[] = [];

  private model: ResetPasswordInput = new ResetPasswordInput;


  constructor(
    private readonly passwordRecoveryService: IPasswordRecoveryService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly navigationService: INavigationService,
    private readonly authService: IAuthService,
    private readonly localisationService: AppLocalizationService,
    private readonly uiService: IUiService

  ) {
    this.localisations = {
      title: this.localisationService.loc('ResetPassword.Title'),
      text: this.localisationService.loc('ResetPassword.Text'),
      passwordLabel: this.localisationService.loc('ResetPassword.PasswordLabel'),
      repeatPasswordLabel: this.localisationService.loc('ResetPassword.ConfirmPasswordLabel'),
      confirmButtonText: this.localisationService.loc('ResetPassword.ConfirmButton'),
      backButtonText: this.localisationService.loc('ResetPassword.BackButton'),
      errorTexts: {
        passwordMismatch: this.localisationService.loc('ResetPassword.PasswordComplexity.PasswordsMismatch'),
        requireDigit: this.localisationService.loc('ResetPassword.PasswordComplexity.RequireDigit'),
        requireLowercase: this.localisationService.loc('ResetPassword.PasswordComplexity.RequireLowercase'),
        requireNonAlphanumeric: this.localisationService.loc('ResetPassword.PasswordComplexity.RequireNonAlphanumeric'),
        requireUppercase: this.localisationService.loc('ResetPassword.PasswordComplexity.RequireUppercase'),
        requiredLength: this.localisationService.loc('ResetPassword.PasswordComplexity.RequiredLength'),
      }
    }

    this.imprintLinks = AppConsts.getImprintLinks(this.localisationService.loc('TermsAndConditions.Title'), this.localisationService.loc('PrivacyPolicy.Title'));
  }

  ngOnInit(): void {
    this.passwordRecoveryService.GetPasswordComplexitySetting()
      .subscribe((result: IPasswordComplexity) => {
        this.passwordComplexitySetting = result;
      })
    this.logoPath = this.navigationService.getLogoTextPath();

    if (this.activatedRoute.snapshot.queryParams['c']) {
      //Proxy-services dto parameter, can't be changed
      // eslint-disable-next-line id-length
      this.model.c = this.activatedRoute.snapshot.queryParams['c'];
      return;
    }

    this.model.userId = this.activatedRoute.snapshot.queryParams['userId'];
    this.model.resetCode = this.activatedRoute.snapshot.queryParams['resetCode'];

  }

  onResetPassword(password: string): void {
    this.uiService.showBusyIndicator();
    this.model.password = password
    this.passwordRecoveryService.resetPassword(this.model)
      .pipe(finalize(this.uiService.hideBusyIndicator))
      .subscribe((result: ResetPasswordOutput) => {
        if (!result.canLogin || !result.userName || !this.model.password) {
          this.navigationService.navigate(Path.LOGIN);
          return
        }
        this.authService.authenticate(result.userName, this.model.password);
      });
  }

  onBack() {
    this.navigationService.navigate(Path.LOGIN);
  }

  onImprintLinkClicked(imprint: IImprintLink<Path>) {
    this.navigationService.navigate(imprint?.path ?? Path.DEFAULT);
  }
}
