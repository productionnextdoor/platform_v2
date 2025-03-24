import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { PopupType } from '../../../components/pm-popup/pm-popup.component';
import {
  developerProfileLocalisation as defaultDeveloperProfileLocalisation,
  defaultDeveloperProfileErrors,
  IDeveloperProfileLocalisation,
  IDeveloperProfileFormErrors,
} from './pm-current-developer-profile.shared';
import { PmDropdownOption } from '../../../components/pm-dropdown/pm-dropdown.shared';
import { EPmInputType } from '../../../components/pm-input/pm-input.component';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { DefaultMargins, IMargin } from '../../../utils/pm-component-margin';
import { pmEmailValidationRegEx } from '../../../utils/constants/regex-patterns';
import { IDeveloper } from '../developer.shared'

@Component({
  selector: 'pm-current-developer-profile',
  templateUrl: './pm-current-developer-profile.component.html',
  styleUrls: ['./pm-current-developer-profile.component.scss']
})
export class PmCurrentDeveloperProfileComponent implements OnInit {
  @Input()
  localisations: IDeveloperProfileLocalisation = defaultDeveloperProfileLocalisation;

  @Input()
  developer: IDeveloper = {};

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onSave: EventEmitter<IDeveloper> = new EventEmitter<IDeveloper>();

  developerProfileErrors: IDeveloperProfileFormErrors = defaultDeveloperProfileErrors;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType
  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType
  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;
  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;
  /** @ignore */
  protected readonly stateDropdownOptions: PmDropdownOption<string>[] = [];

  ngOnInit(): void {
    this.initDropdown();
  }

  /** @ignore */
  onCancelClick(): void {
    this.onCancel.emit();
    this.resetFormErrors();
  }

  /** @ignore */
  onSaveClick(): void {
    this.updateFormErrors();
    if (!this.hasFormErrors()) {
      this.onSave.emit(this.developer);
    }
  }

  /** @ignore */
  resetFormErrors(): void {
    this.developerProfileErrors = defaultDeveloperProfileErrors;
  }

  /** @ignore */
  private hasFormErrors(): boolean {
    return Object.values(this.developerProfileErrors).some((error: boolean) => error);
  }

  /** @ignore */
  private initDropdown(): void {
    const isActive: PmDropdownOption<string> = {
      key: this.localisations.isActiveState,
      value: this.localisations.isActiveState
    };
    const isInactive: PmDropdownOption<string> = {
      key: this.localisations.isInactiveState,
      value: this.localisations.isInactiveState
    };
    this.stateDropdownOptions.push(isActive, isInactive);
  }

  /** @ignore */
  private updateFormErrors() {
    this.developerProfileErrors = {
      fullName: !this.developer.fullName,
      street: !this.developer.street,
      zipCode: (this.developer.zipCode === undefined) || (this.developer.zipCode.length < 1),
      city: !this.developer.city,
      region: !this.developer.region,
      country: !this.developer.country,
      email: !this.developer.email || !pmEmailValidationRegEx.test(this.developer.email),
      phoneNumber: !this.developer.phoneNumber,
    };
  }
}
