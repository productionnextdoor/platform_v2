import {
  Component,
  EventEmitter,
  Input, Output
} from '@angular/core';
import { PopupType } from '../../../components/pm-popup/pm-popup.component';
import { EPmInputType } from '../../../components/pm-input/pm-input.component';
import { DefaultMargins, IMargin } from '../../../utils/pm-component-margin';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { PmDropdownOption } from '../../../components/pm-dropdown/pm-dropdown.shared';
import { pmEmailValidationRegEx } from '../../../utils/constants/regex-patterns';
import {
  adminProfileLocalisation as defaultAdminProfileLocalisation,
  defaultAdminProfileErrors,
  IAdminProfileFormErrors,
  IAdminProfileLocalisation
} from './pm-current-admin-profile.shared';
import { IAdmin } from '../admin.shared';

@Component({
  selector: 'pm-current-admin-profile',
  templateUrl: './pm-current-admin-profile.component.html',
  styleUrls: ['./pm-current-admin-profile.component.scss']
})
export class PmCurrentAdminProfileComponent {

  @Input()
  localisations: IAdminProfileLocalisation = defaultAdminProfileLocalisation;

  @Input()
  admin: IAdmin = {};

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onSave: EventEmitter<IAdmin> = new EventEmitter<IAdmin>();

  adminProfileErrors: IAdminProfileFormErrors = defaultAdminProfileErrors;

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

  /** @ignore */
  onCancelClick(): void {
    this.onCancel.emit();
    this.resetFormErrors();
  }

  /** @ignore */
  onSaveClick(): void {
    this.updateFormErrors();
    if (!this.hasFormErrors()) {
      this.onSave.emit(this.admin);
    }
  }

  /** @ignore */
  resetFormErrors(): void {
    this.adminProfileErrors = defaultAdminProfileErrors;
  }

  /** @ignore */
  private hasFormErrors(): boolean {
    return Object.values(this.adminProfileErrors).some((error: boolean) => error);
  }

  /** @ignore */
  private updateFormErrors() {
    this.adminProfileErrors = {
      fullName: !this.admin.fullName,
      email: !this.admin.emailAddress || !pmEmailValidationRegEx.test(this.admin.emailAddress),
    };
  }
}
