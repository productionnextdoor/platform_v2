import {
  LocationStrategy, NgForOf, PathLocationStrategy
} from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { LoginComponent } from './account/login/login.component';
import { LocalizePipe } from '../shared/pipes/localize.pipe';
import { ProductDeveloperWizardComponent } from './product-developer-wizard/product-developer-wizard.component';
import { EditCurrentProfileComponent } from './profile/edit-current-profile/edit-current-profile.component';
import { AdminDeveloperProfileComponent } from './profile/admin-developer-profile/admin-developer-profile.component';
import { AdminProducerProfileComponent } from './profile/admin-producer-profile/admin-producer-profile.component';
import { AdminProductPopupComponent } from './admin-product-popup/admin-product-popup.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module';
import {
  APP_INITIALIZER, LOCALE_ID, NgModule
} from '@angular/core';
import {
  AbpHttpInterceptor, PermissionCheckerService
} from 'abp-ng2-module';
import { HsuLibraryModule } from 'hsu-library';
import { AppInitializer } from '../app-initializer';
import { AuthService } from '../services/account/auth.service';
import { IAuthService } from '../services/account/iauth.service';
import { AppLocalizationService } from '../services/localization/app-localization.service';
import { GuardService } from '../services/navigation/guard.service';
import { IGuardService } from '../services/navigation/iguard.service';
import { INavigationService } from '../services/navigation/inavigation.service';
import { NavigationService } from '../services/navigation/navigation.service';
import { AdminProductTableService } from '../services/products/product-table/admin-product-table.service';
import { DeveloperProductTableService } from '../services/products/product-table/developer-product-table.service';
import { IProductApiService } from '../services/products/iproduct-api.service';
import { IProductTableService } from '../services/products/product-table/iproduct-table.service';
import { ProductApiService } from '../services/products/product-api.service';
import { ILocalStorageService } from '../services/utils/ilocal-storage.service';
import { IUiService } from '../services/utils/iui.service';
import { LocalStorageService } from '../services/utils/local-storage.service';
import { UiService } from '../services/utils/ui.service';
import { AppConsts } from '../shared/AppConsts';
import { API_BASE_URL } from '../shared/service-proxies/service-proxies';
import {
  ProductCreateOrEditGeneralComponent
} from './product-developer-wizard/product-step-general/product-create-or-edit-general.component';
import { UserService } from '../services/user/user.service';
import { IUserService } from '../services/user/iuser.services';
import { PERMISSIONS } from '../services/permissions/permissions';
import { PermissionsManagerService } from '../services/permissions/permissions-manager.service';
import { DeveloperService } from '../services/user/profile/developer.service';
import { IDeveloperService } from '../services/user/profile/ideveloper.service';
import { DropdownService } from '../services/user/profile/dropdown.service';
import { IDropdownService } from '../services/user/profile/idropdown.service';
import { ProducerService } from '../services/user/profile/producer.service';
import { IProducerService } from '../services/user/profile/iproducer.service';
import { IPermissionManagerService } from '../services/permissions/ipermission-manager.service';
import { ProductTableBaseService } from '../services/products/product-table/product-table-base.service';
import {
  ProductDeveloperWizardVariantsComponent
} from './product-developer-wizard/product-developer-wizard-variants/product-developer-wizard-variants.component';
import {
  ProductMaterialGroupsStepComponent
} from './product-developer-wizard/product-material-groups-step/product-material-groups-step.component';
import {
  ProductFileUploadComponent
} from './product-developer-wizard/product-step-files/product-file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ProductFileService } from '../services/products/product-file.service';
import { IProductFileService } from '../services/products/iproduct-file.service';
import {
  ProductSortingMeasurementsComponent
} from './product-developer-wizard/product-sorting-measurements/product-sorting-measurements.component';
import { MeasurementTableService } from '../services/products/product-creation/measurement-table.service';
import { IMeasurementTableService } from '../services/products/product-creation/imeasurement-table.service';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { PasswordRecoveryService } from '../services/account/password-recovery.service';
import { IPasswordRecoveryService } from '../services/account/ipassword-recovery.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsAdminComponent } from './product-details/product-details-admin/product-details-admin.component';
import {
  ProductDetailsProducerComponent
} from './product-details/product-details-producer/product-details-producer.component';
import { DeveloperOverviewComponent } from './developer-overview/developer-overview.component';
import { DeveloperTableService } from '../services/developer/developer-table.service';
import { IDeveloperTableService } from '../services/developer/ideveloper-table.service';
import { ProductDetailsService } from '../services/products/product-details/product-details.service';
import { IProductDetailsService } from '../services/products/product-details/iproduct-details.service';
import { DeveloperApiService } from '../services/developer/developer-api.service';
import { IDeveloperApiService } from '../services/developer/ideveloper-api.service';
import { TableBaseService } from '../services/table/table-base.service';
import { ITableBaseService } from '../services/table/itable-base.service';
import { ProducerProductTableService } from '../services/products/product-table/producer-product-table.service';
import {
  ProductDetailsDeveloperComponent
} from './product-details/product-details-developer/product-details-developer.component';
import { DetailsDisplayService } from '../services/products/product-details/details-display/details-display.service';
import { IDetailsDisplayService } from '../services/products/product-details/details-display/idetails-display.service';
import { ProducerOverviewComponent } from './producer-overview/producer-overview.component';
import { ProducerOverviewTableService } from '../services/producer/producer-overview-table.service';
import { IProducerOverviewTableService } from '../services/producer/iproducer-overview-table.service';
import { ProducerApiService } from '../services/producer/producer-api.service';
import { IProducerApiService } from '../services/producer/iproducer-api.service';
import { ProductGraphComponent } from './value-chain-planning/product-graph/product-graph.component';
import { ProductGraphService } from '../services/value-chain-planning/product-graph/product-graph.service';
import { IProductGraphService } from '../services/value-chain-planning/product-graph/iproduct-graph.service';
import { AdminService } from '../services/user/profile/admin.service';
import { IAdminService } from '../services/user/profile/iadmin.service';
import { DeveloperRegistrationComponent } from './registration/developer-registration/developer-registration.component';
import { DeveloperRegistrationService } from '../services/user/registration/developer-registration.service';
import { IDeveloperRegistrationService } from '../services/user/registration/ideveloper-registration.service';
import { RegistrationComponent } from './registration/registration.component';
import { ProducerRegistrationComponent } from './registration/producer-registration/producer-registration.component';
import { ProducerRegistrationService } from '../services/user/registration/producer-registration.service';
import { IProducerRegistrationService } from '../services/user/registration/iproducer-registration.service';
import { IValueChainPlanningApiService } from '../services/value-chain-planning/ivalue-chain-planning-api.service';
import { ValueChainPlanningApiService } from '../services/value-chain-planning/value-chain-planning-api.service';
import { WorkstepMatrixComponent } from './value-chain-planning/workstep-matrix/workstep-matrix.component';
import { IWorkstepMatrixService } from '../services/value-chain-planning/workstep-matrix/iworkstep-matrix.service';
import { WorkstepMatrixService } from '../services/value-chain-planning/workstep-matrix/workstep-matrix.service';
import { WorkStepTableComponent } from './value-chain-planning/work-step-table/work-step-table.component';
import { ValueChainTableComponent } from './value-chain-planning/value-chain-table/value-chain-table.component';
import {
  ProductProducerTableComponent
} from './value-chain-planning/product-producer-table/product-producer-table.component';
import { ImpersonationService } from '../shared/helpers/Impersonation.service';
import { ProductionPlanService } from '../services/productionPlans/production-plan.service';
import { IProductionPlanService } from '../services/productionPlans/iproduction-plan.service';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { OrderApiService } from '../services/orders/order-api.service';
import { IOrderApiService } from '../services/orders/iorder-api.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderDetailsAdminComponent } from './order-details/order-details-admin/order-details-admin.component';
import { OrderValueChainTableService } from '../services/orders/order-value-chain-table/order-value-chain-table.service';
import { IOrderValueChainTableService } from '../services/orders/order-value-chain-table/iorder-value-chain-table.service';
import { IOrderTableService } from '../services/orders/order-table/iorders-table.service';
import { OrdersTableAdminService } from '../services/orders/order-table/orders-table-admin.service';
import { OrdersTableProducerService } from '../services/orders/order-table/orders-table-producer.service';
import { OrderTableService } from '../services/orders/order-table/orders-table.service';
import { OrderDetailsProducerComponent } from './order-details/order-details-producer/order-details-producer.component';
import { ProductionStatusService } from '../services/orders/production-status.service';
import { IProductionStatusService } from '../services/orders/iproduction-status.service';
import { OrderDetailsPageService } from '../services/orders/order-details-page.service';
import { IOrderDetailsPageService } from '../services/orders/iorder-details-page.service';
import { OrderFileService } from '../services/orders/order-file.service';
import { IOrderFileService } from '../services/orders/iorder-file.service';
import { ProductOrderSidebarComponent } from './order-details/order-details-producer/product-order-sidebar/product-order-sidebar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsService } from '../services/statistics/statistics.service';
import { IStatisticsService } from 'src/services/statistics/istatistics.service';
import { MaterialOverviewComponent } from './material-overview/material-overview.component';
import { MaterialApiService } from '../services/materials/material-api.service';
import { IMaterialApiService } from '../services/materials/imaterial-api.service';
import { PrivacyPolicyComponent } from './imprint/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './imprint/terms-and-conditions/terms-and-conditions.component';

function productTableServiceFactory(permissionsManagerService: PermissionsManagerService, localizationService: AppLocalizationService, tableBaseService: ITableBaseService): ProductTableBaseService {
  if (permissionsManagerService.isGranted(PERMISSIONS.products.overview.admin)) {
    return new AdminProductTableService(localizationService, tableBaseService);
  }

  if (permissionsManagerService.isGranted(PERMISSIONS.products.overview.developer)) {
    return new DeveloperProductTableService(localizationService, tableBaseService);
  }

  if (permissionsManagerService.isGranted(PERMISSIONS.products.overview.producer)) {
    return new ProducerProductTableService(localizationService, tableBaseService);
  }

  return new DeveloperProductTableService(localizationService, tableBaseService);
}

function orderTableServiceFactory(
  permissionsManagerService: PermissionsManagerService,
  localizationService: AppLocalizationService,
  orderApiService:IOrderApiService,
  tableBaseService: ITableBaseService,
  productionStatusesService:IProductionStatusService
): OrderTableService {
  if (permissionsManagerService.isGranted(PERMISSIONS.orderManagement.overview.admin)) {
    return new OrdersTableAdminService(localizationService, tableBaseService, orderApiService, productionStatusesService);
  }

  if (permissionsManagerService.isGranted(PERMISSIONS.orderManagement.overview.producer)) {
    return new OrdersTableProducerService(localizationService, tableBaseService, orderApiService, productionStatusesService);
  }

  return new OrdersTableProducerService(localizationService, tableBaseService, orderApiService, productionStatusesService);
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AdminDeveloperProfileComponent,
    AdminProducerProfileComponent,
    AdminProductPopupComponent,
    AppComponent,
    DeveloperOverviewComponent,
    DeveloperRegistrationComponent,
    LocalizePipe,
    LoginComponent,
    ProductCreateOrEditGeneralComponent,
    ProductDeveloperWizardComponent,
    ProductDeveloperWizardVariantsComponent,
    ProductFileUploadComponent,
    ProductMaterialGroupsStepComponent,
    ProductOverviewComponent,
    ProductSortingMeasurementsComponent,
    ProductFileUploadComponent,
    ForgotPasswordComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ProductDetailsComponent,
    EditCurrentProfileComponent,
    ProductDetailsAdminComponent,
    ProductDetailsProducerComponent,
    ProductDetailsDeveloperComponent,
    ProducerOverviewComponent,
    ProducerRegistrationComponent,
    ProductGraphComponent,
    WorkstepMatrixComponent,
    WorkStepTableComponent,
    ValueChainTableComponent,
    ProductProducerTableComponent,
    OrderOverviewComponent,
    OrderDetailsComponent,
    OrderDetailsAdminComponent,
    OrderDetailsProducerComponent,
    ProductOrderSidebarComponent,
    StatisticsComponent,
    MaterialOverviewComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HsuLibraryModule,
    ServiceProxyModule,
    HttpClientModule,
    FileUploadModule,
    HsuLibraryModule,
    NgForOf,
    HsuLibraryModule,
    HsuLibraryModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true
    },
    {
      provide: API_BASE_URL, useFactory: () => AppConsts.remoteServiceBaseUrl
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializer) => appInitializer.init(),
      deps: [AppInitializer],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useFactory: () => abp.localization.currentLanguage.name ?? 'de',
    },
    {
      provide: LocationStrategy, useClass: PathLocationStrategy
    },
    AdminProductTableService,
    AppLocalizationService,
    AuthService,
    {
      provide: IAuthService,
      useExisting: AuthService
    },
    DeveloperProductTableService,
    {
      provide: IProductTableService,
      useFactory: productTableServiceFactory,
      deps: [PermissionCheckerService, AppLocalizationService, ITableBaseService]
    },
    GuardService,
    {
      provide: IGuardService,
      useExisting: GuardService
    },
    NavigationService,
    {
      provide: INavigationService,
      useExisting: NavigationService
    },
    LocalizePipe,
    LocalStorageService,
    {
      provide: ILocalStorageService,
      useExisting: LocalStorageService
    },
    UiService,
    {
      provide: IUiService,
      useExisting: UiService
    },
    PermissionsManagerService,
    {
      provide: IPermissionManagerService,
      useExisting: PermissionsManagerService
    },
    ProductApiService,
    {
      provide: IProductApiService,
      useExisting: ProductApiService
    },
    AdminService, {
      provide: IAdminService,
      useExisting: AdminService
    },
    ProducerService, {
      provide: IProducerService,
      useExisting: ProducerService
    },
    DeveloperService, {
      provide: IDeveloperService,
      useExisting: DeveloperService
    },
    UserService,
    {
      provide: IUserService,
      useExisting: UserService
    },
    ProductFileService,
    {
      provide: IProductFileService,
      useExisting: ProductFileService
    },
    PasswordRecoveryService,
    {
      provide: IPasswordRecoveryService,
      useExisting: PasswordRecoveryService
    },
    MeasurementTableService,
    {
      provide: IMeasurementTableService,
      useExisting: MeasurementTableService
    },
    ProductDetailsService,
    {
      provide: IProductDetailsService,
      useExisting: ProductDetailsService
    },
    DetailsDisplayService,
    {
      provide: IDetailsDisplayService,
      useExisting: DetailsDisplayService
    },
    DeveloperApiService,
    {
      provide: IDeveloperApiService,
      useExisting: DeveloperApiService
    },
    DeveloperTableService,
    {
      provide: IDeveloperTableService,
      useExisting: DeveloperTableService
    },
    DropdownService,
    {
      provide: IDropdownService,
      useExisting: DropdownService
    },
    TableBaseService,
    {
      provide: ITableBaseService,
      useExisting: TableBaseService
    },
    ProducerApiService,
    {
      provide: IProducerApiService,
      useExisting: ProducerApiService
    },
    ProducerOverviewTableService,
    {
      provide: IProducerOverviewTableService,
      useExisting: ProducerOverviewTableService
    },
    ProductGraphService,
    {
      provide: IProductGraphService,
      useExisting: ProductGraphService
    },
    DeveloperRegistrationService,
    {
      provide: IDeveloperRegistrationService,
      useExisting: DeveloperRegistrationService
    },
    ProducerRegistrationService,
    {
      provide: IProducerRegistrationService,
      useExisting: ProducerRegistrationService
    },
    WorkstepMatrixService,
    {
      provide: IWorkstepMatrixService,
      useExisting: WorkstepMatrixService
    },
    ValueChainPlanningApiService,
    {
      provide: IValueChainPlanningApiService,
      useExisting: ValueChainPlanningApiService
    },
    ImpersonationService,
    ProductionPlanService,
    {
      provide: IProductionPlanService,
      useExisting: ProductionPlanService
    },
    {
      provide: IOrderTableService,
      useFactory: orderTableServiceFactory,
      deps: [PermissionCheckerService, AppLocalizationService, IOrderApiService, ITableBaseService, IProductionStatusService]
    },
    OrderApiService,
    {
      provide: IOrderApiService,
      useExisting: OrderApiService
    },
    OrderValueChainTableService,
    {
      provide: IOrderValueChainTableService,
      useExisting: OrderValueChainTableService
    },
    ProductionStatusService,
    {
      provide: IProductionStatusService,
      useExisting: ProductionStatusService
    },
    OrderDetailsPageService,
    {
      provide: IOrderDetailsPageService,
      useExisting: OrderDetailsPageService
    },
    OrderFileService,
    {
      provide: IOrderFileService,
      useExisting: OrderFileService
    },
    StatisticsService,
    {
      provide: IStatisticsService,
      useExisting: StatisticsService
    },
    MaterialApiService,
    {
      provide: IMaterialApiService,
      useExisting: MaterialApiService
    },
  ]
})
export class AppModule {
}
