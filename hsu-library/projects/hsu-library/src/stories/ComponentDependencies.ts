/* eslint-disable max-lines */

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { PmBackgroundCardComponent } from '../lib/components/pm-background-card/pm-background-card.component';
import { PmBannerComponent } from '../lib/components/pm-banner/pm-banner.component';
import { PmButtonComponent } from '../lib/components/pm-button/pm-button.component';
import { PmCalendarComponent } from '../lib/components/pm-calendar/pm-calendar.component';
import { PmCardComponent } from '../lib/components/pm-card/pm-card.component';
import { PmCheckboxComponent } from '../lib/components/pm-checkbox/pm-checkbox.component';
import { PmColComponent } from '../lib/components/pm-col/pm-col.component';
import { PmContactCardComponent } from '../lib/components/pm-contact-card/pm-contact-card.component';
import { PmDropdownComponent } from '../lib/components/pm-dropdown/pm-dropdown.component';
import { PmErrorMessageComponent} from '../lib/components/pm-error-message/pm-error-message.component';
import { PmFilenameTagComponent } from '../lib/components/pm-filename-tag/pm-filename-tag.component';
import { PmIconComponent } from '../lib/components/pm-icon/pm-icon.component';
import { PmInputComponent } from '../lib/components/pm-input/pm-input.component';
import { PmLabelComponent } from '../lib/components/pm-label/pm-label.component';
import { PmLogoScreenComponent } from '../lib/components/pm-logo-screen/pm-logo-screen.component';
import { PmPaginationComponent } from '../lib/components/pm-pagination/pm-pagination.component';
import { PmPopupComponent } from '../lib/components/pm-popup/pm-popup.component';
import { PmRadiobuttonComponent } from '../lib/components/pm-radiobutton/pm-radiobutton.component';
import { PmRadioGroupComponent } from '../lib/components/pm-radio-group/pm-radio-group.component';
import { PmRowComponent } from '../lib/components/pm-row/pm-row.component';
import { PmSkeletonComponent } from '../lib/components/pm-skeleton/pm-skeleton.component';
import { PmStepsComponent } from '../lib/components/pm-steps/pm-steps.component';
import { PmTableCellComponent } from '../lib/components/pm-table/pm-table-cell/pm-table-cell.component';
import { PmTableComponent } from '../lib/components/pm-table/pm-table.component';
import { PmTableHeaderComponent } from '../lib/components/pm-table/pm-table-header/pm-table-header.component';
import { PmTextComponent } from '../lib/components/pm-text/pm-text.component';
import { PmTimerComponent } from '../lib/components/pm-timer/pm-timer.component';
import { PmWizardComponent } from '../lib/components/pm-wizard/pm-wizard.component';
import {
  PmFinalProductStepPopupComponent
} from '../lib/layouts/pm-final-product-step-popup/pm-final-product-step-popup.component';
import { PmProductGraphCardComponent } from '../lib/layouts/pm-product-graph-card/pm-product-graph-card.component';

// Layouts
import { PmAdminDeveloperProfileViewComponent } from '../lib/layouts/pm-profile/pm-admin-developer-profile-view/pm-admin-developer-profile-view.component';
import { PmAdminDeveloperProfileEditComponent } from '../lib/layouts/pm-profile/pm-admin-developer-profile-edit/pm-admin-developer-profile-edit.component';
import { PmAdminProducerProfileEditComponent } from '../lib/layouts/pm-profile/pm-admin-producer-profile-edit/pm-admin-producer-profile-edit.component';
import { PmAdminProducerProfileViewComponent } from '../lib/layouts/pm-profile/pm-admin-producer-profile-view/pm-admin-producer-profile-view.component';
import { PmConfirmPopupComponent } from '../lib/layouts/pm-confirm-popup/pm-confirm-popup.component';
import { PmCurrentDeveloperProfileComponent} from '../lib/layouts/pm-profile/pm-current-developer-profile/pm-current-developer-profile.component';
import { PmCurrentProducerProfileComponent } from '../lib/layouts/pm-profile/pm-current-producer-profile/pm-current-producer-profile.component';
import { PmGridComponent } from '../lib/layouts/pm-grid/pm-grid.component';
import { PmHeaderComponent } from '../lib/layouts/pm-header/pm-header.component';
import { PmLoginComponent } from '../lib/layouts/pm-login/pm-login.component';
import { PmMenuComponent } from '../lib/layouts/pm-menu/pm-menu.component';
import { PmProductOverviewComponent } from '../lib/layouts/pm-product-overview/pm-product-overview.component';
import { PmRequestPasswordMailComponent } from '../lib/layouts/pm-request-password-mail/pm-request-password-mail.component';
import { PmResetPasswordComponent } from '../lib/layouts/pm-reset-password/pm-reset-password.component';
import { PmSidebarComponent } from '../lib/layouts/pm-sidebar/pm-sidebar.component';

import {
  PmTableActionButtonsComponent
} from '../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.component';
import {
  GetActionCellPipe,
  GetCheckboxCellPipe,
  GetRatingCellPipe,
  GetStatusCellPipe,
  GetTextCellPipe
} from '../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { PmStatePopupComponent } from '../lib/layouts/pm-state-popup/pm-state-popup.component';
import {PmStateLockedPopupComponent} from '../lib/layouts/pm-state-locked-popup/pm-state-locked-popup.component';
import { PmMarginConverterPipe } from '../lib/utils/pipes/pm-margin-converter.pipe';
import { PmRatingPipe } from '../lib/utils/pipes/pm-rating.pipe';
import { PmUploadComponent } from '../lib/components/pm-upload/pm-upload.component';
import { PmMaterialGroupComponent } from '../lib/layouts/pm-material-group/pm-material-group.component';
import { FormsModule } from '@angular/forms';
import { PmMaterialItemComponent } from '../lib/layouts/pm-material-item/pm-material-item.component';
import { PmProductVariantsComponent } from '../lib/layouts/pm-product-variants/pm-product-variants.component';
import { PmProductPopupComponent } from '../lib/layouts/pm-product-popup/pm-product-popup.component';
import { PmSortingMeasurementsComponent } from '../lib/layouts/pm-sorting-measurements/pm-sorting-measurements.component';
import {
  CdkDrag,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { PmProductFileUploadComponent } from '../lib/layouts/pm-file-upload/pm-file-upload.component';
import { PmFiletagCategoryPipe } from '../lib/layouts/pm-file-upload/pm-filetag-category.pipe';
import { PmFiletypeIconPipe } from '../lib/layouts/pm-file-upload/pm-icontype.pipe';
import { PmProducerTableComponent } from '../lib/layouts/pm-producer-table/pm-producer-table.component';
import { PmImageComponent } from '../lib/components/pm-image/pm-image.component';
import { PmContentWithSidebarComponent } from '../lib/layouts/pm-content-with-sidebar/pm-content-with-sidebar.component';
import { PmDeveloperOverviewComponent } from '../lib/layouts/pm-developer-overview/pm-developer-overview.component';
import { PmBadgeComponent } from '../lib/components/pm-badge/pm-badge.component';
import { PmProductDetailsSidebarComponent } from '../lib/layouts/pm-product-details-sidebar/pm-product-details-sidebar.component';
import { PmProductDetailsDeveloperComponent } from '../lib/layouts/pm-product-details-developer/pm-product-details-developer.component';
import { PmProductDetailsInProgressComponent } from '../lib/layouts/pm-product-details-in-progress/pm-product-details-in-progress.component';
import { PmProducerOverviewComponent } from '../lib/layouts/pm-producer-overview/pm-producer-overview.component';
import { PmProducerRequestCardComponent } from '../lib/components/pm-producer-request-card/pm-producer-request-card.component';
import { PmCurrentAdminProfileComponent } from '../lib/layouts/pm-profile/pm-current-admin-profile/pm-current-admin-profile.component';
import { PmInviteDeveloperPopupComponent } from '../lib/layouts/pm-invite-developer-popup/pm-invite-developer-popup.component';
import { PmDeveloperRegistrationComponent } from '../lib/layouts/pm-registration/pm-developer-registration/pm-developer-registration.component';
import { PmInviteProducerPopupComponent } from '../lib/layouts/pm-invite-producer-popup/pm-invite-producer-popup.component';
import { PmProducerRegistrationComponent } from '../lib/layouts/pm-registration/pm-producer-registration/pm-producer-registration.component';
import { PmWorkstepTableComponent } from '../lib/layouts/pm-workstep-table/pm-workstep-table.component';
import { PmValueChainTableComponent } from '../lib/layouts/pm-value-chain-table/pm-value-chain-table.component';
import { PmWorkStepPopupComponent } from '../lib/layouts/pm-work-step-popup/pm-work-step-popup.component';
import { PmOrdersOverviewComponent } from '../lib/layouts/pm-orders-overview/pm-orders-overview.component';
import { PmMaxCostPopupComponent } from '../lib/layouts/pm-max-cost-popup/pm-max-cost-popup.component';
import {
  PmOrderValueChainCardComponent
} from '../lib/layouts/pm-order-details/pm-order-value-chain-card/pm-order-value-chain-card.component';
import {
  PmOrderDetailsAdminComponent
} from '../lib/layouts/pm-order-details/pm-order-details-admin/pm-order-details-admin.component';
import {
  PmOrderProducerRequestCardComponent
} from '../lib/layouts/pm-order-details/pm-order-producer-request-card/pm-order-producer-request-card.component';
import {
  PmOrderedProductDetailsComponent
} from '../lib/layouts/pm-order-details/pm-ordered-product-details/pm-ordered-product-details.component';
import {
  PmOrderedProductCustomerInfoComponent
} from '../lib/layouts/pm-order-details/pm-ordered-product-customer-info/pm-ordered-product-customer-info.component';
import {
  PmProductionProcessCardComponent
} from '../lib/layouts/pm-order-details/pm-production-process-card/pm-production-process-card.component';
import { PmDeveloperRevenueCardComponent } from '../lib/layouts/pm-developer-revenue-card/pm-developer-revenue-card.component';
import { PmTabCardComponent } from '../lib/components/pm-tab-card/pm-tab-card.component';
import {PmStatisticsCardComponent} from '../lib/layouts/pm-statistics-card/pm-statistics-card.component';
import { PmImprintComponent } from '../lib/layouts/pm-imprint/pm-imprint.component';
import { PmMatrixFillPopoverComponent } from '../lib/layouts/pm-matrix-fill-popover/pm-matrix-fill-popover.component';
import { PmWorkstepMatrixComponent } from '../lib/layouts/pm-workstep-matrix/pm-workstep-matrix.component';

// Storybook don't have any interfaces for the components, though they all have a name property due to the Angular
// Component decorator. This not the best way and also kinda hacky, but it's better than unknown
export interface IComponent {
  name: string;
}

// Storybook don't have any interfaces for the modules...
// eslint-disable-next-line @typescript-eslint/ban-types
export type TModule = unknown;

export type TStoryMeta = {
  declarations: IComponent[],
  imports?: TModule[],
}

export type TStoryMetaList = {
  [key: string]: TStoryMeta
}

const BASE_META: TStoryMeta = {
  declarations: [],
  imports: []
}

const DECLARATIONS: TStoryMetaList = {
  // Components
  [PmBackgroundCardComponent.name]: {
    declarations: [
      PmCardComponent,
      PmButtonComponent,
      PmTimerComponent,
    ],
    imports: [
      BrowserAnimationsModule
    ]
  },
  [PmBadgeComponent.name]: {
    declarations: [
      PmLabelComponent
    ]
  },
  [PmBannerComponent.name]: {
    declarations: [
      PmIconComponent,
      PmMarginConverterPipe
    ]
  },
  [PmButtonComponent.name]: {
    declarations: [
      PmIconComponent,
      PmMarginConverterPipe,
    ]
  },
  [PmCalendarComponent.name]: {
    declarations: [
      PmIconComponent,
    ]
  },
  [PmCardComponent.name]: {
    declarations: [
      PmButtonComponent,
      PmIconComponent,
      PmBadgeComponent,
    ],
    imports: [
      BrowserAnimationsModule
    ]
  },
  [PmCheckboxComponent.name]: {
    declarations: [
      PmLabelComponent,
    ]
  },
  [PmColComponent.name]: {
    declarations: []
  },
  [PmContactCardComponent.name]: {
    declarations: [
      PmIconComponent,
    ]
  },
  [PmDropdownComponent.name]: {
    declarations: [
      PmIconComponent,
      PmErrorMessageComponent,
      PmLabelComponent,
      PmMarginConverterPipe,
    ]
  },
  [PmErrorMessageComponent.name]: {
    declarations: [
      PmIconComponent,
    ]
  },
  [PmFilenameTagComponent.name]: {
    declarations: [
      PmIconComponent,
    ]
  },
  [PmIconComponent.name]: {
    declarations: []
  },
  [PmInputComponent.name]: {
    declarations: [
      PmCalendarComponent,
      PmErrorMessageComponent,
      PmIconComponent,
      PmLabelComponent,
      PmMarginConverterPipe,
    ]
  },
  [PmLabelComponent.name]: {
    declarations: []
  },
  [PmLogoScreenComponent.name]: {
    declarations: [
      PmInputComponent,
      PmCardComponent,
      PmButtonComponent,
      PmColComponent,
    ]
  },
  [PmPaginationComponent.name]: {
    declarations: [
      PmButtonComponent,
      PmDropdownComponent,
    ]
  },
  [PmPopupComponent.name]: {
    declarations: [
      PmCardComponent,
    ]
  },
  [PmRadioGroupComponent.name]: {
    declarations: [
      PmRadiobuttonComponent,
    ]
  },
  [PmRadiobuttonComponent.name]: {
    declarations: [
      PmLabelComponent,
    ]
  },
  [PmRowComponent.name]: {
    declarations: []
  },
  [PmSkeletonComponent.name]: {
    declarations: []
  },
  [PmStepsComponent.name]: {
    declarations: []
  },
  [PmTextComponent.name]: {
    declarations: [
      PmMarginConverterPipe,
    ]
  },
  [PmTimerComponent.name]: {
    declarations: [
      PmButtonComponent,
    ]
  },
  [PmWizardComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmStepsComponent,
      PmButtonComponent,
      PmRowComponent,
      PmConfirmPopupComponent
    ]
  },
  [PmUploadComponent.name]: {
    declarations: [
      PmIconComponent,
      PmLabelComponent,
    ]
  },
  [PmImageComponent.name]: {
    declarations: [
      PmButtonComponent,
      PmPopupComponent,
    ]
  },

  // Layouts
  [PmAdminDeveloperProfileEditComponent.name]: {
    declarations: [
      PmColComponent,
      PmDropdownComponent,
      PmInputComponent,
      PmPopupComponent,
      PmRowComponent,
    ]
  },
  [PmAdminDeveloperProfileViewComponent.name]: {
    declarations: [
      PmBadgeComponent,
      PmButtonComponent,
      PmCardComponent,
      PmHeaderComponent,
      PmIconComponent,
      PmRatingPipe,
      PmTextComponent,
    ]
  },
  [PmAdminProducerProfileEditComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmRowComponent,
      PmColComponent,
      PmInputComponent,
      PmDropdownComponent,
      PmIconComponent,
    ]
  },
  [PmAdminProducerProfileViewComponent.name]: {
    declarations: [
      PmBadgeComponent,
      PmButtonComponent,
      PmCardComponent,
      PmHeaderComponent,
      PmIconComponent,
      PmRatingPipe,
      PmTextComponent,
    ]
  },
  [PmProductGraphCardComponent.name]: {
    declarations: [
      PmCardComponent,
      PmRowComponent,
      PmTextComponent,
    ]
  },
  [PmConfirmPopupComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmButtonComponent,
    ]
  },
  [PmCurrentAdminProfileComponent.name]: {
    declarations: [
      PmColComponent,
      PmInputComponent,
      PmPopupComponent,
      PmRowComponent,
    ]
  },
  [PmCurrentDeveloperProfileComponent.name]: {
    declarations: [
      PmColComponent,
      PmDropdownComponent,
      PmInputComponent,
      PmPopupComponent,
      PmRowComponent,
    ]
  },
  [PmFinalProductStepPopupComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmColComponent,
      PmButtonComponent,
    ]
  },
  [PmGridComponent.name]: {
    declarations: [
      PmButtonComponent,
    ]
  },
  [PmHeaderComponent.name]: {
    declarations: [
      PmIconComponent,
    ],
    imports: [
      RouterTestingModule,
    ]
  },
  [PmInviteDeveloperPopupComponent.name]: {
    declarations: [
      PmInputComponent,
      PmPopupComponent,
      PmRowComponent,
      PmTextComponent
    ]
  },
  [PmLoginComponent.name]: {
    declarations: [
      PmButtonComponent,
      PmCardComponent,
      PmInputComponent,
      PmCheckboxComponent,
      PmLogoScreenComponent,
      PmTextComponent,
      PmRowComponent
    ]
  },
  [PmMenuComponent.name]: {
    declarations: [
      PmIconComponent,
      PmContactCardComponent,
    ]
  },
  [PmStatePopupComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmTimerComponent,
      PmInputComponent,
      PmButtonComponent,
      PmTextComponent
    ]
  },
  [PmStateLockedPopupComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmButtonComponent,
    ]
  },
  [PmProductOverviewComponent.name]: {
    declarations: [
      PmCardComponent,
      PmInputComponent,
      PmDropdownComponent,
      PmTableComponent,
      PmPaginationComponent,
      PmHeaderComponent
    ]
  },
  [PmCurrentProducerProfileComponent.name]: {
    declarations: [
      PmColComponent,
      PmDropdownComponent,
      PmIconComponent,
      PmInputComponent,
      PmPopupComponent,
      PmRatingPipe,
      PmRowComponent,
    ]
  },
  [PmProductPopupComponent.name]: {
    declarations: [
      PmDropdownComponent,
      PmInputComponent,
      PmPopupComponent,
      PmTextComponent,
      PmMarginConverterPipe,
      PmRowComponent,
      PmColComponent,
    ],
    imports: [
      BrowserAnimationsModule
    ],
  },
  [PmRequestPasswordMailComponent.name]: {
    declarations: [
      PmLogoScreenComponent,
      PmButtonComponent,
      PmCardComponent,
      PmColComponent,
      PmInputComponent,
      PmPopupComponent,
      PmRowComponent,
      PmTextComponent
    ]
  },
  [PmResetPasswordComponent.name]: {
    declarations: [
      PmLogoScreenComponent,
      PmButtonComponent,
      PmCardComponent,
      PmColComponent,
      PmInputComponent,
      PmRowComponent,
      PmTextComponent
    ]
  },
  [PmSidebarComponent.name]: {
    declarations: [
      PmButtonComponent,
    ]
  },
  [PmTableComponent.name]: {
    declarations: [
      PmTableHeaderComponent,
      PmTableCellComponent,
      PmButtonComponent,
      PmIconComponent,
    ]
  },
  [PmTableHeaderComponent.name]: {
    declarations: [
      PmIconComponent,
    ]
  },
  [PmTableCellComponent.name]: {
    declarations: [
      PmSkeletonComponent,
      PmCheckboxComponent,
      PmTableActionButtonsComponent,
      GetTextCellPipe,
      GetStatusCellPipe,
      GetCheckboxCellPipe,
      GetActionCellPipe,
      GetRatingCellPipe
    ]
  },
  [PmTableActionButtonsComponent.name]: {
    declarations: [
      PmIconComponent,
    ]
  },
  [PmMaterialItemComponent.name]: {
    declarations: [
      PmInputComponent,
      PmDropdownComponent,
      PmButtonComponent,
      PmColComponent,
      PmRowComponent
    ],
    imports: [
      FormsModule
    ],
  },
  [PmMaterialGroupComponent.name]: {
    declarations: [
      PmMaterialItemComponent,
      PmCheckboxComponent,
      PmColComponent,
      PmRowComponent,
      PmBannerComponent,
      PmTextComponent
    ]
  },
  [PmProductDetailsDeveloperComponent.name]: {
    declarations: [
      PmCardComponent,
      PmButtonComponent,
      PmColComponent,
      PmRowComponent,
      PmTextComponent,
      PmImageComponent,
      PmFiletagCategoryPipe,
      PmFiletypeIconPipe
    ]
  },
  [PmProductVariantsComponent.name]: {
    declarations: [
      PmBannerComponent,
      PmButtonComponent,
      PmColComponent,
      PmDropdownComponent,
      PmInputComponent,
      PmRowComponent,
      PmTextComponent,
    ],
    imports: [
      FormsModule,
    ]
  },
  [PmProductFileUploadComponent.name]: {
    declarations: [
      PmUploadComponent,
      PmBannerComponent,
      PmTextComponent,
      PmInputComponent,
      PmRowComponent,
      PmColComponent,
      PmFilenameTagComponent,
      PmFiletagCategoryPipe,
      PmFiletypeIconPipe
    ],
    imports: [
      FormsModule,
    ]
  },
  [PmSortingMeasurementsComponent.name]: {
    declarations: [
      PmTableComponent,
      PmBannerComponent,
      PmTextComponent,
    ],
    imports: [
      CdkDrag,
      CdkDragHandle,
      CdkDropList,
      CdkDragPlaceholder,
    ]
  },
  [PmProducerTableComponent.name]: {
    declarations: [
      PmBackgroundCardComponent,
      PmTableComponent,
      PmPaginationComponent,
      PmPopupComponent,
      PmInputComponent
    ],
  },
  [PmProductDetailsSidebarComponent.name]: {
    declarations: [
      PmButtonComponent,
      PmColComponent,
      PmFiletagCategoryPipe,
      PmFiletypeIconPipe,
      PmImageComponent,
      PmRowComponent,
      PmTextComponent,
    ],
  },
  [PmContentWithSidebarComponent.name]: {
    declarations: [
      PmHeaderComponent,
      PmProductDetailsSidebarComponent,
      PmButtonComponent,
    ],
  },
  [PmDeveloperOverviewComponent.name]: {
    declarations: [
      PmCardComponent,
      PmHeaderComponent,
      PmInputComponent,
      PmTableComponent,
      PmPaginationComponent
    ]
  },
  [PmProducerOverviewComponent.name]: {
    declarations: [
      PmCardComponent,
      PmHeaderComponent,
      PmInputComponent,
      PmTableComponent,
      PmPaginationComponent
    ]
  },
  [PmProductDetailsInProgressComponent.name]: {
    declarations: [
      PmTextComponent
    ]
  },
  [PmDeveloperRegistrationComponent.name]: {
    declarations: [
      PmBannerComponent,
      PmCardComponent,
      PmColComponent,
      PmInputComponent,
      PmLogoScreenComponent,
      PmRowComponent,
      PmTextComponent,
      PmCheckboxComponent
    ]
  },
  [PmProducerRequestCardComponent.name]: {
    declarations: [
      PmButtonComponent,
      PmTextComponent
    ]
  },
  [PmProducerRegistrationComponent.name]: {
    declarations: [
      PmCardComponent,
      PmColComponent,
      PmDropdownComponent,
      PmInputComponent,
      PmLogoScreenComponent,
      PmRowComponent,
      PmTextComponent,
      PmCheckboxComponent
    ]
  },
  [PmInviteProducerPopupComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmTextComponent,
      PmRowComponent,
      PmColComponent,
      PmInputComponent,
      PmDropdownComponent,
      PmButtonComponent
    ]
  },
  [PmWorkstepTableComponent.name]: {
    declarations: [
      PmBackgroundCardComponent,
      PmTableComponent,
      PmButtonComponent
    ]
  },
  [PmValueChainTableComponent.name]: {
    declarations: [
      PmBackgroundCardComponent,
      PmTableComponent,
      PmPaginationComponent
    ]
  },
  [PmWorkStepPopupComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmRowComponent,
      PmTextComponent
    ]
  },
  [PmMaxCostPopupComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmIconComponent,
      PmTextComponent,
      PmInputComponent
    ]
  },
  [PmOrdersOverviewComponent.name]: {
    declarations: [
      PmCardComponent,
      PmInputComponent,
      PmDropdownComponent,
      PmTableComponent,
      PmPaginationComponent,
      PmHeaderComponent
    ]
  },
  [PmOrderValueChainCardComponent.name]: {
    declarations: [
      PmCardComponent,
      PmBadgeComponent,
      PmTextComponent,
      PmTableComponent
    ]
  },
  [PmOrderDetailsAdminComponent.name]: {
    declarations: [
      PmHeaderComponent,
      PmOrderValueChainCardComponent,
      PmRowComponent,
      PmColComponent,
      PmConfirmPopupComponent
    ]
  },
  [PmOrderProducerRequestCardComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmRowComponent,
      PmTextComponent,
      PmConfirmPopupComponent
    ]
  },
  [PmOrderedProductDetailsComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmRowComponent,
      PmTextComponent,
      PmConfirmPopupComponent,
      PmFiletypeIconPipe
    ]
  },
  [PmOrderedProductCustomerInfoComponent.name]: {
    declarations: [
      PmPopupComponent,
      PmRowComponent
    ]
  },
  [PmProductionProcessCardComponent.name]: {
    declarations: [
      PmCardComponent,
      PmTextComponent,
      PmTableComponent,
      PmConfirmPopupComponent,
      PmUploadComponent,
      PmFilenameTagComponent,
      PmFiletypeIconPipe,
      PmRowComponent
    ]
  },
  [PmDeveloperRevenueCardComponent.name]: {
    declarations: [
      PmCardComponent,
      PmTextComponent,
      PmRowComponent,
    ]
  },
  [PmTabCardComponent.name]: {
    declarations: [
      PmButtonComponent,
    ]
  },
  [PmStatisticsCardComponent.name]: {
    declarations: [
      PmCardComponent,
      PmButtonComponent,
      PmInputComponent,
      PmColComponent,
      PmRowComponent
    ]
  },
  [PmImprintComponent.name]: {
    declarations: [
      PmCardComponent,
      PmTextComponent
    ]
  },
  [PmMatrixFillPopoverComponent.name]: {
    declarations: [
      PmRadioGroupComponent,
      PmDropdownComponent,
      PmInputComponent,
      PmButtonComponent,
    ]
  },
  [PmWorkstepMatrixComponent.name]: {
    declarations: [
      PmTextComponent,
      PmCheckboxComponent,
      PmInputComponent,
      PmMatrixFillPopoverComponent,
    ]
  }
}

class DependencyLoader {
  private static mergeMeta(meta1: TStoryMeta, meta2: TStoryMeta): TStoryMeta {
    return {
      declarations: [...(meta1.declarations ?? []), ...(meta2.declarations ?? [])],
      imports: [...(meta1.imports ?? []), ...(meta2.imports ?? [])]
    }
  }

  static getComponentStoryMeta(component: IComponent, additionalDeclarations: IComponent[] = []): TStoryMeta {
    const componentMeta: TStoryMeta = component?.name ? DECLARATIONS[component.name] : BASE_META;
    const meta: TStoryMeta = {
      ...BASE_META,
      ...componentMeta
    };
    meta.declarations = [
      ...meta.declarations,
      ...additionalDeclarations
    ];

    let resultMeta: TStoryMeta = BASE_META;
    for (const declaration of meta.declarations) {
      if (resultMeta.declarations.includes(declaration)) continue;

      resultMeta = DependencyLoader.mergeMeta(resultMeta, DependencyLoader.getComponentStoryMeta(declaration));
    }

    return DependencyLoader.mergeMeta(resultMeta, meta);
  }
}

export const { getComponentStoryMeta } = DependencyLoader;
