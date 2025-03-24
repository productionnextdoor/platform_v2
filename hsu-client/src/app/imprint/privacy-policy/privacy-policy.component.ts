import { Component } from '@angular/core';
import { AppLocalizationService } from 'src/services/localization/app-localization.service';

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent {

  /** @ignore */
  title: string = '';

  /** @ignore */
  content: string = '';

  constructor(
    private readonly localizationService: AppLocalizationService
  ) {
    this.title = localizationService.loc('PrivacyPolicy.Title');
    this.content = localizationService.loc('PrivacyPolicy.Content');
  }
}
