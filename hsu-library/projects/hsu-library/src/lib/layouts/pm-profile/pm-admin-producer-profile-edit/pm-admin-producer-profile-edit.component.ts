import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { PopupType } from '../../../components/pm-popup/pm-popup.component';
import {
  adminProducerProfileEditLocalisation, IAdminProducerProfileEditLocalisation,
  defaultAdminProducerProfileEditErrors, IAdminProducerProfileEditErrors,
  IProducerProductInvolvement,
} from './pm-admin-producer-profile-edit.shared';
import {
  IProducer, IProducerRating, IProducerTradeType
} from '../producer.shared'
import { IPmConfirmPopupLocalisations } from '../../pm-confirm-popup/pm-confirm-popup.shared';
import { EUserStatus } from '../general.shared'
import { PmDropdownOption } from '../../../components/pm-dropdown/pm-dropdown.shared';
import { EPmInputType } from '../../../components/pm-input/pm-input.component';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { DefaultMargins, IMargin } from '../../../utils/pm-component-margin';
import { pmEmailValidationRegEx } from '../../../utils/constants/regex-patterns';
import { Icon, IconSize } from '../../../components/pm-icon/pm-icon.shared';

@Component({
  selector: 'pm-admin-producer-profile-edit',
  templateUrl: './pm-admin-producer-profile-edit.component.html',
  styleUrls: ['./pm-admin-producer-profile-edit.component.scss']
})
export class PmAdminProducerProfileEditComponent {
  @Input()
  localisations: IAdminProducerProfileEditLocalisation = adminProducerProfileEditLocalisation;

  @Input()
  producer: IProducer = {};

  @Input()
  producerRatingMaxValue: number = 0;

  @Input()
  stateDropdownOptions: PmDropdownOption<EUserStatus>[] = [];

  @Input()
  tradeDropdownOptions: PmDropdownOption<number>[] = [];

  @Input()
  ratingDropdownOptions: PmDropdownOption<number>[] = [];

  @Input()
  producerProductInvolvements: IProducerProductInvolvement[] = [];

  @Input()
  confirmRemoveFromProductsPopupLocalisation: IPmConfirmPopupLocalisations = {
    title: '',
    description: '',
    confirm: '',
    cancel: ''
  };

  @Input()
  confirmDeleteProfilePopupLocalisation: IPmConfirmPopupLocalisations = {
    title: '',
    description: '',
    confirm: '',
    cancel: ''
  };

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onSave: EventEmitter<IProducer> = new EventEmitter<IProducer>();

  @Output()
  onDeleteProfile: EventEmitter<void> = new EventEmitter<void>();

  protected confirmRemoveFromProductsPopupIsActive: boolean = false;
  protected confirmDeleteProfilePopupIsActive: boolean = false;

  adminProducerProfileEditErrors: IAdminProducerProfileEditErrors = defaultAdminProducerProfileEditErrors

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType
  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType
  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;
  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;
  /** @ignore */
  protected readonly Icon = Icon;
  /** @ignore */
  protected readonly IconSize = IconSize;
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
      this.onSave.emit(this.producer);
    }
  }

  /** @ignore */
  hasProductInvolvements(): boolean {
    return this.producerProductInvolvements.length > 0;
  }

  /** @ignore */
  hasOrders(): boolean {
    return this.producer.hasOrders === true;
  }

  /** @ignore */
  cannotDeleteProfile(): boolean {
    return this.hasProductInvolvements() || this.hasOrders();
  }

  /** @ignore */
  onDeleteProfileClick(): void {
    if (this.cannotDeleteProfile()) {
      this.confirmRemoveFromProductsPopupIsActive = true;
    } else {
      this.confirmDeleteProfilePopupIsActive = true;
    }
  }

  /** @ignore */
  continueToDeleteProfile(): void {
    this.confirmRemoveFromProductsPopupIsActive = false;
    this.confirmDeleteProfilePopupIsActive = true;
  }

  /** @ignore */
  closeRemoveFromProductsPopup(): void {
    this.confirmRemoveFromProductsPopupIsActive = false;
  }

  /** @ignore */
  confirmDeleteProfile(): void {
    this.onDeleteProfile.emit();
    this.confirmDeleteProfilePopupIsActive = false;
  }

  /** @ignore */
  closeDeleteProfilePopup(): void {
    this.confirmDeleteProfilePopupIsActive = false;
  }

  /** @ignore */
  resetFormErrors(): void {
    this.adminProducerProfileEditErrors = defaultAdminProducerProfileEditErrors;
  }

  /** @ignore */
  setStateInProducer(newKey: string): void {
    this.producer.isActive = (newKey === EUserStatus.Active);
  }

  /** @ignore */
  setTradeTypeInProducer(newKey: number): void {
    const producerTradeTypes: IProducerTradeType[] = this.producer.tradeTypes ?? [];
    const correspondingTradeType: IProducerTradeType | undefined = producerTradeTypes.find(
      tradeType => tradeType.key === newKey
    );
    if (correspondingTradeType) {
      this.producer.trade = correspondingTradeType;
    }
  }

  /** @ignore */
  applyRatingChangeToProducer(newValue: number, type: string): void {
    const producerRatings: IProducerRating[] = this.producer.producerRatings ?? [];
    const ratingForType: IProducerRating | undefined = producerRatings.find(rating => rating.type === type);
    if (ratingForType) {
      ratingForType.rating = newValue;
    }
  }

  /** @ignore **/
  setNumberOfEmployeesValue(newVal: number): void {
    if (newVal === 0) {
      this.producer = {
        ...this.producer, numberOfEmployees: undefined
      };
      return;
    }
    this.producer.numberOfEmployees = newVal;
  }

  /** @ignore */
  private hasFormErrors(): boolean {
    return Object.values(this.adminProducerProfileEditErrors).some((error: boolean) => error);
  }

  /** @ignore */
  private updateFormErrors() {
    this.adminProducerProfileEditErrors = {
      city: !this.producer.city,
      companyName: !this.producer.companyName,
      contactPersonFullName: !this.producer.contactPersonFullName,
      email: !this.producer.email || !pmEmailValidationRegEx.test(this.producer.email),
      phoneNumber: !this.producer.phoneNumber,
      rate: !this.producer.rate,
      street: !this.producer.street,
      tradeType: !this.producer.trade,
      zipCode: !this.producer.zipCode,
    };
  }
}
