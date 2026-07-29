import {
  CommonModule,
  DatePipe,
  NgClass
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CdkDrag,
  CdkDragHandle,
  CdkDropList,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HsuLibraryComponent } from './hsu-library.component';
import {
  PmFinalProductStepPopupComponent
} from './layouts/pm-final-product-step-popup/pm-final-product-step-popup.component';
import { PmMarginConverterPipe } from './utils/pipes/pm-margin-converter.pipe';
import { PmRatingPipe } from './utils/pipes/pm-rating.pipe';
import { PmBackgroundCardComponent } from './components/pm-background-card/pm-background-card.component';
import { PmBadgeComponent } from './components/pm-badge/pm-badge.component';
import { PmBannerComponent } from './components/pm-banner/pm-banner.component';
import { PmButtonComponent } from './components/pm-button/pm-button.component';
import { PmCalendarComponent } from './components/pm-calendar/pm-calendar.component';
import { PmCardComponent } from './components/pm-card/pm-card.component';
import { PmCheckboxComponent } from './components/pm-checkbox/pm-checkbox.component';
import { PmColComponent } from './components/pm-col/pm-col.component';
import { PmContactCardComponent } from './components/pm-contact-card/pm-contact-card.component';
import { PmDropdownComponent } from './components/pm-dropdown/pm-dropdown.component';
import { PmErrorMessageComponent } from './components/pm-error-message/pm-error-message.component';
import { PmFilenameTagComponent } from './components/pm-filename-tag/pm-filename-tag.component';
import { PmIconComponent } from './components/pm-icon/pm-icon.component';
import { PmImageComponent } from './components/pm-image/pm-image.component';
import { PmInputComponent } from './components/pm-input/pm-input.component';
import { PmLabelComponent } from './components/pm-label/pm-label.component';
import { PmLogoScreenComponent } from './components/pm-logo-screen/pm-logo-screen.component';
import { PmPaginationComponent } from './components/pm-pagination/pm-pagination.component';
import { PmPopupComponent } from './components/pm-popup/pm-popup.component';
import {
  PmProducerRequestCardComponent
} from './components/pm-producer-request-card/pm-producer-request-card.component';
import { PmProductGraphComponent } from './components/pm-product-graph/pm-product-graph.component';
import { PmRadioGroupComponent } from './components/pm-radio-group/pm-radio-group.component';
import { PmRadiobuttonComponent } from './components/pm-radiobutton/pm-radiobutton.component';
import { PmRowComponent } from './components/pm-row/pm-row.component';
import { PmSkeletonComponent } from './components/pm-skeleton/pm-skeleton.component';
import { PmStepsComponent } from './components/pm-steps/pm-steps.component';
import {
  PmTableActionButtonsComponent
} from './components/pm-table/pm-table-action-buttons/pm-table-action-buttons.component';
import { PmTableCellComponent } from './components/pm-table/pm-table-cell/pm-table-cell.component';
import {
  GetActionCellPipe,
  GetCheckboxCellPipe,
  GetStatusCellPipe,
  GetTextCellPipe,
  GetRatingCellPipe
} from './components/pm-table/pm-table-cell/pm-table-cell.shared';
import { PmTableHeaderComponent } from './components/pm-table/pm-table-header/pm-table-header.component';
import { PmTableComponent } from './components/pm-table/pm-table.component';
import { PmTextComponent } from './components/pm-text/pm-text.component';
import { PmTimerComponent } from './components/pm-timer/pm-timer.component';
import { PmUploadComponent } from './components/pm-upload/pm-upload.component';
import { PmWizardComponent } from './components/pm-wizard/pm-wizard.component';

import { PmMatrixFillPopoverComponent } from './layouts/pm-matrix-fill-popover/pm-matrix-fill-popover.component';
import { PmWorkstepMatrixComponent } from './layouts/pm-workstep-matrix/pm-workstep-matrix.component';
import { PmWorkstepMatrixModalComponent } from './layouts/pm-workstep-matrix-modal/pm-workstep-matrix-modal.component';

import { PmConfirmPopupComponent } from './layouts/pm-confirm-popup/pm-confirm-popup.component';
import { PmContentWithSidebarComponent } from './layouts/pm-content-with-sidebar/pm-content-with-sidebar.component';
import { PmDeveloperOverviewComponent } from './layouts/pm-developer-overview/pm-developer-overview.component';
import { PmProductFileUploadComponent } from './layouts/pm-file-upload/pm-file-upload.component';
import { PmFiletagCategoryPipe } from './layouts/pm-file-upload/pm-filetag-category.pipe';
import { PmFiletypeIconPipe } from './layouts/pm-file-upload/pm-icontype.pipe';
import { PmGridComponent } from './layouts/pm-grid/pm-grid.component';
import { PmHeaderComponent } from './layouts/pm-header/pm-header.component';
import { PmLoginComponent } from './layouts/pm-login/pm-login.component';
import { PmMaterialGroupComponent } from './layouts/pm-material-group/pm-material-group.component';
import { PmMaterialOverviewComponent } from './layouts/pm-material-overview/pm-material-overview.component';
import { PmMaterialItemComponent } from './layouts/pm-material-item/pm-material-item.component';
import { PmMenuComponent } from './layouts/pm-menu/pm-menu.component';
import { PmProducerOverviewComponent } from './layouts/pm-producer-overview/pm-producer-overview.component';
import { PmProducerTableComponent } from './layouts/pm-producer-table/pm-producer-table.component';
import {
  PmProductDetailsDeveloperComponent
} from './layouts/pm-product-details-developer/pm-product-details-developer.component';
import {
  PmProductDetailsInProgressComponent
} from './layouts/pm-product-details-in-progress/pm-product-details-in-progress.component';
import {
  PmProductDetailsSidebarComponent
} from './layouts/pm-product-details-sidebar/pm-product-details-sidebar.component';
import { PmProductGraphCardComponent } from './layouts/pm-product-graph-card/pm-product-graph-card.component';
import { PmProductOverviewComponent } from './layouts/pm-product-overview/pm-product-overview.component';
import { PmProductPopupComponent } from './layouts/pm-product-popup/pm-product-popup.component';
import { PmProductVariantsComponent } from './layouts/pm-product-variants/pm-product-variants.component';
import {
  PmAdminDeveloperProfileEditComponent
} from './layouts/pm-profile/pm-admin-developer-profile-edit/pm-admin-developer-profile-edit.component';
import {
  PmAdminProducerProfileEditComponent
} from './layouts/pm-profile/pm-admin-producer-profile-edit/pm-admin-producer-profile-edit.component';
import {
  PmCurrentAdminProfileComponent
} from './layouts/pm-profile/pm-current-admin-profile/pm-current-admin-profile.component';
import {
  PmAdminProducerProfileViewComponent
} from './layouts/pm-profile/pm-admin-producer-profile-view/pm-admin-producer-profile-view.component';
import {
  PmCurrentDeveloperProfileComponent
} from './layouts/pm-profile/pm-current-developer-profile/pm-current-developer-profile.component';
import {
  PmCurrentProducerProfileComponent
} from './layouts/pm-profile/pm-current-producer-profile/pm-current-producer-profile.component';
import { PmRequestPasswordMailComponent } from './layouts/pm-request-password-mail/pm-request-password-mail.component';
import { PmResetPasswordComponent } from './layouts/pm-reset-password/pm-reset-password.component';
import { PmSidebarComponent } from './layouts/pm-sidebar/pm-sidebar.component';
import { PmSortingMeasurementsComponent } from './layouts/pm-sorting-measurements/pm-sorting-measurements.component';
import { PmStatePopupComponent } from './layouts/pm-state-popup/pm-state-popup.component';
import {
  PmInviteDeveloperPopupComponent
} from './layouts/pm-invite-developer-popup/pm-invite-developer-popup.component';
import {
  PmDeveloperRegistrationComponent
} from './layouts/pm-registration/pm-developer-registration/pm-developer-registration.component';
import {
  PmAdminDeveloperProfileViewComponent
} from './layouts/pm-profile/pm-admin-developer-profile-view/pm-admin-developer-profile-view.component';
import { PmInviteProducerPopupComponent } from './layouts/pm-invite-producer-popup/pm-invite-producer-popup.component';
import {
  PmProducerRegistrationComponent
} from './layouts/pm-registration/pm-producer-registration/pm-producer-registration.component';
import { PmStateLockedPopupComponent } from './layouts/pm-state-locked-popup/pm-state-locked-popup.component';
import { PmWorkStepPopupComponent } from './layouts/pm-work-step-popup/pm-work-step-popup.component';
import { PmWorkstepTableComponent } from './layouts/pm-workstep-table/pm-workstep-table.component';
import { PmValueChainTableComponent } from './layouts/pm-value-chain-table/pm-value-chain-table.component';
import { PmOrdersOverviewComponent } from './layouts/pm-orders-overview/pm-orders-overview.component';
import { PmMaxCostPopupComponent } from './layouts/pm-max-cost-popup/pm-max-cost-popup.component';
import {
  PmOrderValueChainCardComponent
} from './layouts/pm-order-details/pm-order-value-chain-card/pm-order-value-chain-card.component';
import {
  PmOrderDetailsAdminComponent
} from './layouts/pm-order-details/pm-order-details-admin/pm-order-details-admin.component';
import {
  PmOrderProducerRequestCardComponent
} from './layouts/pm-order-details/pm-order-producer-request-card/pm-order-producer-request-card.component';
import {
  PmOrderedProductDetailsComponent
} from './layouts/pm-order-details/pm-ordered-product-details/pm-ordered-product-details.component';
import {
  PmOrderedProductCustomerInfoComponent
} from './layouts/pm-order-details/pm-ordered-product-customer-info/pm-ordered-product-customer-info.component';
import {
  PmProductionProcessCardComponent
} from './layouts/pm-order-details/pm-production-process-card/pm-production-process-card.component';
import {
  PmDeveloperRevenueCardComponent
} from './layouts/pm-developer-revenue-card/pm-developer-revenue-card.component';
import { PmTabCardComponent } from './components/pm-tab-card/pm-tab-card.component';
import { PmStatisticsCardComponent } from './layouts/pm-statistics-card/pm-statistics-card.component';
import { PmImprintComponent } from './layouts/pm-imprint/pm-imprint.component';

@NgModule({
  providers: [
    PmFiletagCategoryPipe,
  ],
  declarations: [
    HsuLibraryComponent,

    // Pipes
    GetActionCellPipe,
    GetCheckboxCellPipe,
    GetStatusCellPipe,
    GetTextCellPipe,
    GetRatingCellPipe,
    PmFiletagCategoryPipe,
    PmFiletypeIconPipe,
    PmMarginConverterPipe,
    PmRatingPipe,

    // Components
    PmBackgroundCardComponent,
    PmBadgeComponent,
    PmBannerComponent,
    PmButtonComponent,
    PmCalendarComponent,
    PmCardComponent,
    PmCheckboxComponent,
    PmColComponent,
    PmContactCardComponent,
    PmDropdownComponent,
    PmErrorMessageComponent,
    PmFilenameTagComponent,
    PmGridComponent,
    PmHeaderComponent,
    PmIconComponent,
    PmImageComponent,
    PmInputComponent,
    PmLabelComponent,
    PmLogoScreenComponent,
    PmPaginationComponent,
    PmPopupComponent,
    PmProducerRequestCardComponent,
    PmProductGraphComponent,
    PmProductOverviewComponent,
    PmProductPopupComponent,
    PmRadioGroupComponent,
    PmRadiobuttonComponent,
    PmRowComponent,
    PmSkeletonComponent,
    PmStepsComponent,
    PmTableActionButtonsComponent,
    PmTableCellComponent,
    PmTableComponent,
    PmTableHeaderComponent,
    PmTextComponent,
    PmTimerComponent,
    PmWizardComponent,

    // Layouts
    PmAdminDeveloperProfileEditComponent,
    PmAdminDeveloperProfileViewComponent,
    PmAdminProducerProfileEditComponent,
    PmAdminProducerProfileViewComponent,
    PmConfirmPopupComponent,
    PmContentWithSidebarComponent,
    PmCurrentAdminProfileComponent,
    PmCurrentDeveloperProfileComponent,
    PmCurrentProducerProfileComponent,
    PmDeveloperOverviewComponent,
    PmDeveloperRegistrationComponent,
    PmDeveloperRevenueCardComponent,
    PmFinalProductStepPopupComponent,
    PmInviteDeveloperPopupComponent,
    PmInviteProducerPopupComponent,
    PmLoginComponent,
    PmMaterialGroupComponent,
    PmMaterialItemComponent,
    PmMaterialOverviewComponent,
    PmMenuComponent,
    PmProducerOverviewComponent,
    PmProducerRegistrationComponent,
    PmProducerTableComponent,
    PmProductDetailsDeveloperComponent,
    PmProductDetailsInProgressComponent,
    PmProductDetailsSidebarComponent,
    PmProductFileUploadComponent,
    PmProductGraphCardComponent,
    PmProductOverviewComponent,
    PmProductVariantsComponent,
    PmRatingPipe,
    PmRequestPasswordMailComponent,
    PmResetPasswordComponent,
    PmSidebarComponent,
    PmSortingMeasurementsComponent,
    PmStateLockedPopupComponent,
    PmStatePopupComponent,
    PmUploadComponent,
    PmValueChainTableComponent,
    PmWorkStepPopupComponent,
    PmMatrixFillPopoverComponent,
    PmWorkstepMatrixComponent,
    PmWorkstepMatrixModalComponent,
    PmWorkstepTableComponent,
    PmOrdersOverviewComponent,
    PmMaxCostPopupComponent,
    PmOrderValueChainCardComponent,
    PmOrderDetailsAdminComponent,
    PmOrderProducerRequestCardComponent,
    PmOrderedProductDetailsComponent,
    PmOrderedProductCustomerInfoComponent,
    PmProductionProcessCardComponent,
    PmTabCardComponent,
    PmStatisticsCardComponent,
    PmImprintComponent
  ],
  exports: [
    GetRatingCellPipe,
    GetRatingCellPipe,
    GetTextCellPipe,
    HsuLibraryComponent,
    PmAdminDeveloperProfileEditComponent,
    PmAdminDeveloperProfileViewComponent,
    PmAdminProducerProfileEditComponent,
    PmAdminProducerProfileViewComponent,
    PmBadgeComponent,
    PmBannerComponent,
    PmButtonComponent,
    PmColComponent,
    PmConfirmPopupComponent,
    PmContactCardComponent,
    PmContentWithSidebarComponent,
    PmCurrentAdminProfileComponent,
    PmCurrentDeveloperProfileComponent,
    PmCurrentProducerProfileComponent,
    PmDeveloperOverviewComponent,
    PmDeveloperRegistrationComponent,
    PmDeveloperRevenueCardComponent,
    PmErrorMessageComponent,
    PmFiletagCategoryPipe,
    PmFiletypeIconPipe,
    PmFinalProductStepPopupComponent,
    PmGridComponent,
    PmHeaderComponent,
    PmImageComponent,
    PmInputComponent,
    PmInviteDeveloperPopupComponent,
    PmInviteProducerPopupComponent,
    PmLoginComponent,
    PmLogoScreenComponent,
    PmMaterialGroupComponent,
    PmMaterialItemComponent,
    PmMaterialOverviewComponent,
    PmMenuComponent,
    PmPopupComponent,
    PmProducerOverviewComponent,
    PmProducerRegistrationComponent,
    PmProducerRequestCardComponent,
    PmProducerTableComponent,
    PmProductDetailsDeveloperComponent,
    PmProductDetailsInProgressComponent,
    PmProductDetailsSidebarComponent,
    PmProductFileUploadComponent,
    PmProductGraphCardComponent,
    PmProductGraphComponent,
    PmProductOverviewComponent,
    PmProductPopupComponent,
    PmProductVariantsComponent,
    PmRequestPasswordMailComponent,
    PmResetPasswordComponent,
    PmRowComponent,
    PmSidebarComponent,
    PmSortingMeasurementsComponent,
    PmStateLockedPopupComponent,
    PmStatePopupComponent,
    PmTextComponent,
    PmUploadComponent,
    PmValueChainTableComponent,
    PmWizardComponent,
    PmWorkStepPopupComponent,
    PmMatrixFillPopoverComponent,
    PmWorkstepMatrixComponent,
    PmWorkstepMatrixModalComponent,
    PmWorkstepTableComponent,
    PmMaxCostPopupComponent,
    PmOrdersOverviewComponent,
    PmOrderValueChainCardComponent,
    PmOrderDetailsAdminComponent,
    PmOrderProducerRequestCardComponent,
    PmOrderedProductDetailsComponent,
    PmOrderedProductCustomerInfoComponent,
    PmProductionProcessCardComponent,
    PmTabCardComponent,
    PmStatisticsCardComponent,
    PmImprintComponent

  ],

  imports: [
    BrowserAnimationsModule,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    CommonModule,
    DatePipe,
    DragDropModule,
    FormsModule,
    NgClass,
    RouterModule,
  ]
})
export class HsuLibraryModule {
}
