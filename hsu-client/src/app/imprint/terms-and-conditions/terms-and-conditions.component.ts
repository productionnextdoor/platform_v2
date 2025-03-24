import { Component } from '@angular/core';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';

@Component({
  selector: 'terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
})
export class TermsAndConditionsComponent {

  /** @ignore */
  title: string = '';

  /** @ignore */
  content: string = '';

  constructor(
    private readonly localizationService: AppLocalizationService
  ) {
    this.title = localizationService.loc('TermsAndConditions.Title');
    this.content = localizationService.loc('TermsAndConditions.Content');
  }
}
