import {
  Component, EventEmitter, Input, OnChanges, Output
} from '@angular/core';
import {
  DefaultMargins, IMargin, PmComponentMargin
} from '../../../utils/pm-component-margin';
import { TextType } from '../../../components/pm-text/pm-text.shared';
import { PmRatingPipe } from '../../../utils/pipes/pm-rating.pipe';
import { Icon, IconSize } from '../../../components/pm-icon/pm-icon.shared';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import {
  defaultAdminDeveloperProfileViewLocalisation,
  IAdminDeveloperProfileViewLabelLocalisation,
  IAdminDeveloperProfileViewLocalisation
} from './pm-admin-developer-profile-view.shared';
import { IDeveloper } from '../developer.shared'
import {
  EUserStatus,
  ISectionData
} from '../general.shared';
import { defaultBreadcrumbs, IBreadcrumbs } from '../../pm-header/pm-header.shared';

@Component({
  selector: 'pm-admin-developer-profile-view',
  templateUrl: './pm-admin-developer-profile-view.component.html',
  styleUrls: ['./pm-admin-developer-profile-view.component.scss']
})
export class PmAdminDeveloperProfileViewComponent implements OnChanges {
  @Input()
  localisations: IAdminDeveloperProfileViewLocalisation = defaultAdminDeveloperProfileViewLocalisation;

  @Input()
  developer: IDeveloper = {};

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
    'fullName', 'zipCode', 'country', 'pseudonym',
    'city', 'phoneNumber', 'street', 'region', 'email', 'note'
  ];

  /** @ignore */
  private static readonly productAndServicesFields: string[] = [
    'numberOfDraftedProducts', 'numberOfProducts'
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
  protected readonly EUserStatus = EUserStatus;

  /** @ignore */
  ngOnChanges(): void {
    this.setData();
  }

  getBadgeText(): string {
    switch (this.developer.status) {
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
    this.companySectionData = this.generateSectionData(PmAdminDeveloperProfileViewComponent.companySectionFields);
    this.productsAndServicesSectionData = this.generateSectionData(PmAdminDeveloperProfileViewComponent.productAndServicesFields);
  }

  /** @ignore */
  private generateSectionData(fieldNames: string[]): ISectionData[] {
    return fieldNames.map((fieldName: string) => ({
      key: this.localisations.labels[fieldName as keyof IAdminDeveloperProfileViewLabelLocalisation].toString(),
      value: this.developer ? this.developer[fieldName as keyof IDeveloper]?.toString() : '-'
    }));
  }
}
