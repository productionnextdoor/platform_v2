import { Component, OnInit } from '@angular/core';
import { INavigationService } from '../../../services/navigation/inavigation.service';
import { Path } from '../../app-routing.module';
import { IImprintLink, IRequestPasswordMailLocalisations } from 'hsu-library';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import { IPasswordRecoveryService } from '../../../services/account/ipassword-recovery.service';
import { IUiService } from '../../../services/utils/iui.service';
import { finalize } from 'rxjs';
import { AppConsts } from '../../../shared/AppConsts';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {

  logoPath: string = '';
  localisations: IRequestPasswordMailLocalisations;
  showMessage: boolean = false;
  imprintLinks: IImprintLink<Path>[] = [];

  constructor(
    private readonly navigationService: INavigationService,
    private readonly passwordRecoveryService: IPasswordRecoveryService,
    private readonly localisationService: AppLocalizationService,
    private readonly uiService: IUiService,
  ) {
    this.localisations = {
      form: {
        title: this.localisationService.loc('ForgotPassword.Form.Title'),
        text: this.localisationService.loc('ForgotPassword.Form.Text'),
        emailLabel: this.localisationService.loc('ForgotPassword.Form.EmailLabel'),
        confirmButtonText: this.localisationService.loc('ForgotPassword.Form.ConfirmButton'),
        backButtonText: this.localisationService.loc('ForgotPassword.Form.BackButton'),
        emailNotValidError: this.localisationService.loc('ForgotPassword.Form.EmailNotValid')
      },
      successPopUp: {
        title: this.localisationService.loc('ForgotPassword.PopUp.Title'),
        text: this.localisationService.loc('ForgotPassword.PopUp.Text'),
        confirmButtonText: this.localisationService.loc('ForgotPassword.PopUp.ConfirmButton')
      }
    }

    this.imprintLinks = AppConsts.getImprintLinks(this.localisationService.loc('TermsAndConditions.Title'), this.localisationService.loc('PrivacyPolicy.Title'));
  }

  ngOnInit() {
    this.logoPath = this.navigationService.getLogoTextPath();
  }

  onRequestPasswordMail(email: string) {
    this.uiService.showBusyIndicator();
    this.passwordRecoveryService.sendPasswordResetCode(email)
      .pipe(finalize(this.uiService.hideBusyIndicator))
      .subscribe(() => {
        this.showMessage = true
      });
  }

  onBack() {
    this.navigationService.navigate(Path.LOGIN);
  }

  onImprintLinkClicked(imprint: IImprintLink<Path>) {
    this.navigationService.navigate(imprint?.path ?? Path.DEFAULT);
  }
}
