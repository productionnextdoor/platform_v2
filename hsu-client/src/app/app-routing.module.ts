import {
  Data,
  RouterModule,
  Routes
} from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import {
  NgModule
} from '@angular/core';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import {
  AccessGuard,
  RedirectGuard
} from '../services/navigation/guard.service';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminDeveloperProfileComponent } from './profile/admin-developer-profile/admin-developer-profile.component';
import { AdminProducerProfileComponent } from './profile/admin-producer-profile/admin-producer-profile.component';
import { DeveloperOverviewComponent } from './developer-overview/developer-overview.component';
import { ProducerOverviewComponent } from './producer-overview/producer-overview.component';
import { RegistrationComponent } from './registration/registration.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PERMISSIONS } from '../services/permissions/permissions';
import { StatisticsComponent } from './statistics/statistics.component';
import { PrivacyPolicyComponent } from './imprint/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './imprint/terms-and-conditions/terms-and-conditions.component';

export enum Path {
  DEFAULT = '',
  LOGIN = 'account/login',
  FORGOT_PASSWORD = 'account/forgot-password',
  RESET_PASSWORD = 'account/reset-password',
  PRODUCTS = 'products',
  PRODUCT_DETAILS = 'product-details',
  ADMIN_DEVELOPER_PROFILE = 'admin/developer-details',
  ADMIN_PRODUCER_PROFILE = 'admin/producer-details',
  DEVELOPER_OVERVIEW = 'developer-overview',
  PRODUCER_OVERVIEW = 'producer-overview',
  REGISTRATION = 'registration',
  ORDERS = 'orders',
  ORDER_DETAILS = 'order-details',
  STATISTICS = 'statistics',
  TERMS_AND_CONDITIONS = 'terms-and-conditions',
  PRIVACY_POLICY = 'privacy-policy',
}

export interface RouteData extends Data {
  fullScreen: boolean,
  permissions: string[],
  title: string,
  breadcrumbLinkText?: string,
  breadcrumbHoverTitle?: string;
}

const routes: Routes = [
  {
    path: Path.DEFAULT,
    redirectTo: Path.LOGIN,
    pathMatch: 'full'
  },
  {
    path: Path.LOGIN,
    component: LoginComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: true,
      permissions: [],
      title: 'Helmut Schmidt Portal '
    } as RouteData,
    pathMatch: 'full',
    canActivate: [RedirectGuard]
  },
  {
    path: Path.FORGOT_PASSWORD,
    component: ForgotPasswordComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: true,
      permissions: [],
      title: 'Helmut Schmidt Portal '
    } as RouteData,
    pathMatch: 'full',
    canActivate: [RedirectGuard]
  },
  {
    path: Path.RESET_PASSWORD,
    component: ResetPasswordComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: true,
      permissions: [],
      title: 'Helmut Schmidt Portal '
    } as RouteData,
    pathMatch: 'full',
    canActivate: [RedirectGuard]
  },
  {
    path: Path.PRODUCTS,
    component: ProductOverviewComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.products.overview.admin,
        PERMISSIONS.products.overview.developer,
        PERMISSIONS.products.overview.producer,
      ],
      title: 'Menu.Products',
      breadcrumbLinkText: 'Routes.Breadcrumb.ProductOverviewLinkText',
      breadcrumbHoverTitle: 'Routes.Breadcrumb.ProductOverviewLinkHoverTitle'
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: `${Path.PRODUCT_DETAILS}/:productId`,
    component: ProductDetailsComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.products.detailsOverview.getAdmin,
        PERMISSIONS.products.detailsOverview.getDeveloper,
        PERMISSIONS.products.detailsOverview.getProducers,
      ],
      title: 'Menu.ProductDetails',
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: `${Path.ADMIN_DEVELOPER_PROFILE}/:developerId`,
    component: AdminDeveloperProfileComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.users.profiles.DeveloperProfile.get
      ],
      title: 'Admin.DeveloperDetails',
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: `${Path.ADMIN_PRODUCER_PROFILE}/:producerId`,
    component: AdminProducerProfileComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.users.profiles.ProducerProfile.get
      ],
      title: 'Admin.ProducerDetails',
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: Path.DEVELOPER_OVERVIEW,
    component: DeveloperOverviewComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.users.getDevelopers
      ],
      title: 'Menu.Developer',
      breadcrumbLinkText: 'Routes.Breadcrumb.DeveloperOverviewLinkText',
      breadcrumbHoverTitle: 'Routes.Breadcrumb.DeveloperOverviewLinkHoverTitle'
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: Path.PRODUCER_OVERVIEW,
    component: ProducerOverviewComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.users.getProducers
      ],
      title: 'Menu.Producer',
      breadcrumbLinkText: 'Routes.Breadcrumb.ProducerOverviewLinkText',
      breadcrumbHoverTitle: 'Routes.Breadcrumb.ProducerOverviewLinkHoverTitle'
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: Path.REGISTRATION,
    component: RegistrationComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: true,
      permissions: [],
      title: 'Registration',
    } as RouteData,
    pathMatch: 'full',
    canActivate: [RedirectGuard]
  },
  {
    path: Path.ORDERS,
    component: OrderOverviewComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.orderManagement.overview.admin,
        PERMISSIONS.orderManagement.overview.producer,
      ],
      title: 'Menu.OrderOverview',
      breadcrumbLinkText: 'Routes.Breadcrumb.OrderOverviewLinkText',
      breadcrumbHoverTitle: 'Routes.Breadcrumb.OrderOverviewLinkHoverTitle'
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: `${Path.ORDER_DETAILS}/:orderId`,
    component: OrderDetailsComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.orderManagement.details.admin,
        PERMISSIONS.orderManagement.details.producer,
      ],
      title: 'Menu.OrderDetail',
      breadcrumbLinkText: 'Routes.Breadcrumb.OrderDetailsLinkText',
      breadcrumbHoverTitle: 'Routes.Breadcrumb.OrderODetailsLinkHoverTitle'
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: Path.STATISTICS,
    component: StatisticsComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [
        PERMISSIONS.importExport.statistics,
      ],
      title: 'Menu.Statistics',
      breadcrumbLinkText: 'Routes.Breadcrumb.Statistics.Texts',
      breadcrumbHoverTitle: 'Routes.Breadcrumb.Statistics.Title'
    } as RouteData,
    canActivate: [AccessGuard]
  },
  {
    path: Path.PRIVACY_POLICY,
    component: PrivacyPolicyComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [],
      title: 'Menu.PrivacyPolicy',
    } as RouteData
  },
  {
    path: Path.TERMS_AND_CONDITIONS,
    component: TermsAndConditionsComponent,
    // eslint-disable-next-line id-denylist -- this is needed for angular
    data: {
      fullScreen: false,
      permissions: [],
      title: 'Menu.TermsAndConditions',
    } as RouteData
  },
  {
    path: '**',
    redirectTo: Path.LOGIN,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

