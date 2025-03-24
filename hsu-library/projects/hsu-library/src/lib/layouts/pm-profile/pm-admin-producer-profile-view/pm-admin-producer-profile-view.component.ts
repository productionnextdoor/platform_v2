import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../../utils/pm-component-margin';
import { TextType } from '../../../components/pm-text/pm-text.shared';
import { PmRatingPipe } from '../../../utils/pipes/pm-rating.pipe';
import { Icon, IconSize } from '../../../components/pm-icon/pm-icon.shared';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import {
  defaultAdminProducerProfileViewLocalisation, IAdminProducerProfileViewLabelLocalisation,
  IAdminProducerProfileViewLocalisation
} from './pm-admin-producer-profile-view.shared';
import {
  IProducer,
} from '../producer.shared'
import {
  EUserStatus,
  ISectionData,
} from '../general.shared';
import { defaultBreadcrumbs, IBreadcrumbs } from '../../pm-header/pm-header.shared';

@Component({
  selector: 'pm-admin-producer-profile-view',
  templateUrl: './pm-admin-producer-profile-view.component.html',
  styleUrls: ['./pm-admin-producer-profile-view.component.scss']
})
export class PmAdminProducerProfileViewComponent implements OnChanges {
  @Input()
  localisations: IAdminProducerProfileViewLocalisation = defaultAdminProducerProfileViewLocalisation;

  @Input()
  producer: IProducer = {};

  @Input()
  breadcrumbs: IBreadcrumbs = defaultBreadcrumbs;

  @Input()
  ratingMaxValue: number = 0;

  @Output()
  onEditButtonClick: EventEmitter<void> = new EventEmitter();

  @Output()
  onImpersonateButtonClick: EventEmitter<void> = new EventEmitter();

  @Output()
  onDeleteButtonClick: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected companySectionData: ISectionData[] = [];
  /** @ignore */
  protected productsAndServicesSectionData: ISectionData[] = [];

  /** @ignore */
  protected readonly firstTitleMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.Medium, 0);
  /** @ignore */
  protected readonly defaultTitleMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.XLarge, 0, DefaultMargins.Medium, 0);

  /** @ignore */
  private static readonly companySectionFields: string[] = [
    'companyName', 'street', 'email',
    'tradeType', 'zipCode', 'phoneNumber',
    'numberOfEmployees', 'city', 'note'
  ];

  /** @ignore */
  private static readonly productAndServicesFields: string[] = [
    'associatedProducts', 'alreadyProducedFurniture', 'currentOrders'
  ];

  /** @ignore */
  protected readonly DefaultMargins: IMargin = DefaultMargins;
  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;
  /** @ignore */
  protected readonly Icon: typeof Icon = Icon;
  /** @ignore */
  protected readonly PmRatingPipe: typeof PmRatingPipe = PmRatingPipe;
  /** @ignore */
  protected readonly IconSize: typeof IconSize = IconSize;
  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  /** @ignore */
  protected readonly EUserStatus: typeof EUserStatus = EUserStatus;

  /** @ignore */
  ngOnChanges(): void {
    this.setData();
  }

  getBadgeText(): string {
    switch (this.producer.status) {
    case EUserStatus.Active:
      return this.localisations.statuses.active
    case EUserStatus.Invited:
      return this.localisations.statuses.invited;
    case EUserStatus.InActive:
      return this.localisations.statuses.inactive;
    default:
      return '';
    }
  }

  /** @ignore */
  private setData(): void {
    this.companySectionData = this.generateSectionData(PmAdminProducerProfileViewComponent.companySectionFields);
    this.productsAndServicesSectionData = this.generateSectionData(PmAdminProducerProfileViewComponent.productAndServicesFields);
  }

  /** @ignore */
  private generateSectionData(fieldNames: string[]): ISectionData[] {
    return fieldNames.map((fieldName: string) => {
      const label: string = this.localisations.labels[fieldName as keyof IAdminProducerProfileViewLabelLocalisation].toString();
      if (fieldName === 'tradeType') {
        return {
          key: label,
          value: this.producer?.trade?.value ?? ''
        };
      }
      return {
        key: label,
        value: this.producer ? this.producer[fieldName as keyof IProducer]?.toString() : '-'
      }
    });
  }
}

