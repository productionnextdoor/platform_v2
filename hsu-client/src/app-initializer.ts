import {
  Injectable, Injector
} from '@angular/core';
import {
  PlatformLocation,
  registerLocaleData
} from '@angular/common';
import {
  HttpClient
} from '@angular/common/http';
import {
  filter as _filter,
  merge as _merge
} from 'lodash-es';
import {
  AppConsts
} from './shared/AppConsts';
import {
  environment
} from './environments/environment';
import {
  IUiService
} from './services/utils/iui.service';
import {
  XmlHttpRequestHelper
} from './shared/helpers/XmlHttpRequestHelper';
import {
  GetCurrentLoginInformationsOutput,
  SessionServiceProxy
} from './shared/service-proxies/service-proxies';
import { IQueryParameters, UrlHelper } from './shared/helpers/UrlHelper';

@Injectable({
  providedIn: 'root',
})
export class AppInitializer {
  constructor(
    private _injector: Injector,
    private _platformLocation: PlatformLocation,
    private _httpClient: HttpClient,
    private _uiService: IUiService,
  ) {
  }

  //Copied from apb client, initialize the app consts and user configurations(localization,permissions, etc);
  //https://aspnetboilerplate.com/Pages/Documents/Zero/Startup-Template-Angular
  init(): () => Promise<boolean> {
    return () => {
      this._uiService.showBusyIndicator();
      return new Promise<boolean>((resolve, reject) => {
        AppConsts.appBaseHref = this.getBaseHref();
        const appBaseUrl: string = this.getDocumentOrigin() + AppConsts.appBaseHref;
        this.getApplicationConfig(appBaseUrl, async () => {
          const queryStringObj: IQueryParameters = UrlHelper.getQueryParameters();
          if (queryStringObj['impersonationToken']) {
            await this.impersonatedAuthenticate(queryStringObj['impersonationToken'],
              queryStringObj['tenantId'] ? parseInt(queryStringObj['tenantId']) : undefined);
          }

          this.getUserConfiguration(() => {
            abp.event.trigger('abp.dynamicScriptsInitialized');
            this.handleLoginInformation(resolve, reject);
          });
        });
      });
    };
  }

  private impersonatedAuthenticate(impersonationToken: string, tenantId?: number): Promise<void> {
    abp.multiTenancy.setTenantIdCookie(tenantId);

    return new Promise<void>((resolve) => {
      XmlHttpRequestHelper.ajax(
        'POST',
        AppConsts.remoteServiceBaseUrl +
        '/api/TokenAuth/ImpersonatedAuthenticate?impersonationToken=' +
        impersonationToken,
        [],
        null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (response: { result: any }) => {
          const {result} = response;
          abp.auth.setToken(result.accessToken);
          location.search = '';
          resolve();
        },
      );
    });
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any --  Promise return type,
  private handleLoginInformation(resolve: (value: boolean | PromiseLike<boolean>) => void, reject: (reason?: any) => void): void {
    //Constructor injection is not possible here, because then the remoteServiceBaseUrl const won't be initialized properly
    //https://github.com/aspnetboilerplate/module-zero-core-template/blob/c01b1ddada6747980b5b76fd9de3fbc595f31636/angular/src/app-initializer.ts#L32
    this._injector.get(SessionServiceProxy).getCurrentLoginInformations().subscribe({
      next: (result: GetCurrentLoginInformationsOutput) => {
        if (!result.user.id) abp.auth.clearToken();
        this._uiService.hideBusyIndicator();
        if (this.shouldLoadLocale()) {
          import(`/node_modules/@angular/common/locales/${this.convertAbpLocaleToAngularLocale(abp.localization.currentLanguage.name)}.mjs`).then(
            (module) => {
              registerLocaleData(module.default);
              resolve(true);
            },
            reject
          );
        } else {
          resolve(true);
        }
      },
      error: (error) => {
        abp.auth.clearToken();
        reject(error);
      }
    });
  }
  private getBaseHref(): string {
    const baseUrl: string = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }
    return '/';
  }

  private getDocumentOrigin(): string {
    if (!document.location.origin) {
      const port: string = document.location.port ? ':' + document.location.port : '';
      return (
        document.location.protocol + '//' + document.location.hostname + port
      );
    }
    return document.location.origin;
  }

  private shouldLoadLocale(): boolean {
    return <boolean>(
      abp.localization.currentLanguage.name &&
      abp.localization.currentLanguage.name !== 'en-US'
    );
  }

  private convertAbpLocaleToAngularLocale(locale: string): string {
    if (!AppConsts.localeMappings) {
      return locale;
    }
    const localeMappings: { 'from': string, 'to': string }[] = _filter(AppConsts.localeMappings, {
      from: locale
    });
    if (localeMappings && localeMappings.length) {
      return localeMappings[0]['to'];
    }
    return locale;
  }

  private getCurrentClockProvider(
    currentProviderName: string
  ): abp.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return abp.timing.unspecifiedClockProvider;
    }
    if (currentProviderName === 'utcClockProvider') {
      return abp.timing.utcClockProvider;
    }
    return abp.timing.localClockProvider;
  }

  /*Asp.net uses localisation providers to determine the proper culture.
  There are 6 providers that Asp.net Zero has with this priority
  1.QueryString
  2.UserSettings in database
  3.Header settings
  4.Cookie setting
  5.Browser setting
  6.Default culture provider
  So the only way to insure we get the language we want and have the ability to easily test this, until we create a
  proper language switcher, is to set the cookie and then force the cookie value to a QueryString. This way cookie
  will have the highest priority and is easily changed via browser dev tools.  */
  private getUserConfiguration(callbackFunction: () => void): void {
    const cookieLangValue: string = abp.utils.getCookieValue(
      'Abp.Localization.CultureName'
    );
    if (!cookieLangValue) {
      abp.utils.setCookieValue(
        'Abp.Localization.CultureName',
        AppConsts.localization.defaultLanguage,
        // eslint-disable-next-line no-magic-numbers
        new Date(new Date().getTime() + 365 * 86400000), //1 year
        abp.appPath
      );
    }
    const token: string = abp.auth.getToken();
    const requestHeaders: { 'Abp.TenantId': string, '.AspNetCore.Culture': string, 'Authorization'?: string } = {
      'Abp.TenantId': `${abp.multiTenancy.getTenantIdCookie()}`,
      '.AspNetCore.Culture': `c=${cookieLangValue}|uic=${cookieLangValue}`,
    };
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
    this._httpClient
      //the GetAll method comes from the apb library and is not in swagger,so we don't have the Dto in proxy-services. The Dto itself constructed from
      //large amount of complex objects, and it doesn't really make sense to create this structure in the frontend since it's only used here.
      //eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .get<any>(
        `${AppConsts.remoteServiceBaseUrl}/AbpUserConfiguration/GetAll?culture=${cookieLangValue}&cultureUi${cookieLangValue}`,
        {
          headers: requestHeaders,
        })
      .subscribe((response) => {
        const {result} = response;
        _merge(abp, result);
        abp.clock.provider = this.getCurrentClockProvider(
          result.clock.provider
        );
        callbackFunction();
      });
  }

  private getApplicationConfig(appRootUrl: string, callbackFunction: () => void) {

    const type: string = 'GET';
    const url: string = appRootUrl + 'assets/' + environment.appConfig;
    const customHeaders: { 'Abp.TenantId': string }[] = [
      {
        'Abp.TenantId': `${abp.multiTenancy.getTenantIdCookie()}`,
      }
    ];
    // This helper allows us to circumvent http-interceptor. It's needed to request the appconfig.json file
    // since the http-interceptor add authorisation header that conflicts with the htpasswd on the server
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    XmlHttpRequestHelper.ajax(type, url, customHeaders, null, (result: any) => {

      AppConsts.appBaseUrl = result.appBaseUrl;
      AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
      AppConsts.localeMappings = result.localeMappings;
      callbackFunction();

    });
  }
}
