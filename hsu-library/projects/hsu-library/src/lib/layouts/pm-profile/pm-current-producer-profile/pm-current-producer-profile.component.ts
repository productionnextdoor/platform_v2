import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { PopupType } from '../../../components/pm-popup/pm-popup.component';
import {
  defaultProducerProfileErrors,
  IProducerProfileFormErrors,
  IProducerProfileLocalisation,
  producerProfileLocalisation as defaultProducerProfileLocalisation,
} from './pm-current-producer-profile.shared';
import { PmDropdownOption } from '../../../components/pm-dropdown/pm-dropdown.shared';
import { PmRatingPipe } from '../../../utils/pipes/pm-rating.pipe';
import { EPmInputType } from '../../../components/pm-input/pm-input.component';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import { DefaultMargins, IMargin } from '../../../utils/pm-component-margin';
import { pmEmailValidationRegEx } from '../../../utils/constants/regex-patterns';
import { Icon, IconSize } from '../../../components/pm-icon/pm-icon.shared';
import { IProducer } from '../producer.shared'

@Component({
  selector: 'pm-current-producer-profile',
  templateUrl: './pm-current-producer-profile.component.html',
  styleUrls: ['./pm-current-producer-profile.component.scss']
})
export class PmCurrentProducerProfileComponent {
  @Input()
  localisations: IProducerProfileLocalisation = defaultProducerProfileLocalisation;

  @Input()
  producer: IProducer = {};

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onSave: EventEmitter<IProducer> = new EventEmitter<IProducer>();

  @Input()
  producerRatingMaxValue: number = 0;
  producerProfileErrors: IProducerProfileFormErrors = defaultProducerProfileErrors

  /** @ignore */
  protected tradeTypeDropdownOptions: PmDropdownOption<string>[] = [];

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType
  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType
  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;
  /** @ignore */
  protected readonly PmRatingPipe: typeof PmRatingPipe = PmRatingPipe;
  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;
  /** @ignore */
  protected readonly Icon = Icon;
  /** @ignore */
  protected readonly IconSize = IconSize;

  /** @ignore */
  onCancelClick(): void {
    this.onCancel.emit();
    this.resetFormErrors();
  }

  /** @ignore */
  onSaveClick(): void {
    this.updateFormErrors();
    if (!this.hasFromErrors()) {
      this.onSave.emit(this.producer);
    }
  }

  /** @ignore */
  resetFormErrors(): void {
    this.producerProfileErrors = defaultProducerProfileErrors;
  }

  /** @ignore */
  private hasFromErrors(): boolean {
    return Object.values(this.producerProfileErrors).some((error: boolean) => error);
  }

  /** @ignore */
  private updateFormErrors() {
    this.producerProfileErrors = {
      city: !this.producer.city,
      companyName: !this.producer.companyName,
      contactPersonFullName: !this.producer.contactPersonFullName,
      email: !this.producer.email || !pmEmailValidationRegEx.test(this.producer.email),
      numberOfEmployees: false,
      phoneNumber: !this.producer.phoneNumber,
      rate:  (this.producer.rate === undefined) || (this.producer.rate <= 0.00),
      street: !this.producer.street,
      zipCode: (this.producer.zipCode === undefined) || (this.producer.zipCode.length < 1),
    };
  }
}
