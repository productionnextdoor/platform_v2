import {
  NgModule
} from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  AbpHttpConfigurationService,
  AbpHttpInterceptor
} from 'abp-ng2-module';
import {
  ZeroTemplateHttpConfigurationService
} from './zero-template-http-configuration.service';

@NgModule({
  providers: [
    ApiServiceProxies.ProductServiceProxy,
    ApiServiceProxies.ProductDetailsServiceProxy,
    ApiServiceProxies.LanguageServiceProxy,
    ApiServiceProxies.TokenAuthServiceProxy,
    ApiServiceProxies.UserExtendedServiceProxy,
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.ProfileServiceProxy,
    ApiServiceProxies.SessionServiceProxy,
    ApiServiceProxies.ProductGraphServiceProxy,
    ApiServiceProxies.UserRegistrationServiceProxy,
    ApiServiceProxies.ProductionStateServiceProxy,
    ApiServiceProxies.ProductionStepServiceProxy,
    ApiServiceProxies.UserRevenueServiceProxy,
    ApiServiceProxies.UserTradeServiceProxy,
    ApiServiceProxies.ValueChainPlannerServiceProxy,
    ApiServiceProxies.ProductExportServiceProxy,
    ApiServiceProxies.ProductionPlanServiceProxy,
    ApiServiceProxies.OrderServiceProxy,
    ApiServiceProxies.OrderDetailsServiceProxy,
    ApiServiceProxies.StatisticsServiceProxy,
    ApiServiceProxies.MaterialServiceProxy,
    ApiServiceProxies.SpecificationServiceProxy,
    ApiServiceProxies.SpecificationGroupServiceProxy,
    {
      provide: AbpHttpConfigurationService,
      useClass: ZeroTemplateHttpConfigurationService
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true
    },
  ]
})
export class ServiceProxyModule {
}
