import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { PopupType } from '../../../components/pm-popup/pm-popup.component';
import {
  adminDeveloperProfileEditLocalisation, IAdminDeveloperProfileEditLocalisation,
  defaultAdminDeveloperProfileEditErrors, IAdminDeveloperProfileEditErrors,
} from './pm-admin-developer-profile-edit.shared';
import { IDeveloper } from '../developer.shared'
import { EUserStatus } from '../general.shared'
import { PmDropdownOption } from '../../../components/pm-dropdown/pm-dropdown.shared';
import { EPmInputType } from '../../../components/pm-input/pm-input.component';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { DefaultMargins, IMargin } from '../../../utils/pm-component-margin';
import { pmEmailValidationRegEx } from '../../../utils/constants/regex-patterns';

@Component({
  selector: 'pm-admin-developer-profile-edit',
  templateUrl: './pm-admin-developer-profile-edit.component.html',
  styleUrls: ['./pm-admin-developer-profile-edit.component.scss']
})
export class PmAdminDeveloperProfileEditComponent {
  @Input()
  localisations: IAdminDeveloperProfileEditLocalisation = adminDeveloperProfileEditLocalisation;

  @Input()
  developer: IDeveloper = {};

  @Input()
  stateDropdownOptions: PmDropdownOption<EUserStatus>[] = [];

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onSave: EventEmitter<IDeveloper> = new EventEmitter<IDeveloper>();

  adminDeveloperProfileEditErrors: IAdminDeveloperProfileEditErrors = defaultAdminDeveloperProfileEditErrors

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType
  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType
  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;
  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;
  /** @ignore */
  protected readonly EUserStatus: typeof EUserStatus = EUserStatus;

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
    this.adminDeveloperProfileEditErrors = defaultAdminDeveloperProfileEditErrors;
  }

  /** @ignore */
  setStateInDeveloper(newKey: string): void {
    this.developer.isActive = (newKey === EUserStatus.Active);
  }

  /** @ignore */
  private hasFormErrors(): boolean {
    return Object.values(this.adminDeveloperProfileEditErrors).some((error: boolean) => error);
  }

  /** @ignore */
  private updateFormErrors() {
    this.adminDeveloperProfileEditErrors = {
      city: !this.developer.city,
      country: !this.developer.country,
      email: !this.developer.email || !pmEmailValidationRegEx.test(this.developer.email),
      fullName: !this.developer.fullName,
      phoneNumber: !this.developer.phoneNumber,
      pseudonym: !this.developer.pseudonym,
      region: !this.developer.region,
      street: !this.developer.street,
      zipCode: !this.developer.zipCode,
    };
  }
}
