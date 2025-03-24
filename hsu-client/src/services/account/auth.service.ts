import {
  IAuthService
} from './iauth.service';
import {
  AuthenticateModel,
  AuthenticateResultModel,
  TokenAuthServiceProxy
} from '../../shared/service-proxies/service-proxies';
import {
  Injectable
} from '@angular/core';
import {
  Path
} from '../../app/app-routing.module';
import {
  INavigationService
} from '../navigation/inavigation.service';
import {
  AbpSessionService,
  LogService,
  TokenService
} from 'abp-ng2-module';
import {
  ILocalStorageService
} from '../utils/ilocal-storage.service';
import {
  DateTimeService
} from '../utils/date-time.service';
import {
  AppConsts
} from '../../shared/AppConsts';
import {
  defer,
  finalize,
  Observable
} from 'rxjs';
import {
  IUiService
} from '../utils/iui.service';

type TokenStore = {
  token: string;
  expireDate?: Date;
}

@Injectable()
export class AuthService extends IAuthService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly tokenAuthService: TokenAuthServiceProxy,
    private readonly navigationService: INavigationService,
    private readonly logService: LogService,
    private readonly tokenService: TokenService,
    private readonly localStorageService: ILocalStorageService,
    private readonly uiService: IUiService,
    private readonly session: AbpSessionService
  ) {
    super();
  }

  authenticate(email: string, password: string, rememberMe: boolean = false, redirectUrl: string = ''): void {
    const authenticationModel: AuthenticateModel = new AuthenticateModel();
    authenticationModel.userNameOrEmailAddress = email;
    authenticationModel.password = password;
    authenticationModel.returnUrl = redirectUrl;

    this.uiService.showBusyIndicator();

    this.tokenAuthService
      .authenticate(authenticationModel)
      .pipe(
        finalize(this.uiService.hideBusyIndicator)
      )
      .subscribe({
        next: (result: AuthenticateResultModel) => {
          this.processAuthenticationResult(result, rememberMe, redirectUrl);
        },
        error: (error) => {
          this.logService.error('Authentication error: ' + error);
          this.uiService.hideBusyIndicator();
        }
      });
  }

  isTokenValid(): boolean {
    return !!this.tokenService.getToken();
  }

  getCurrentUserId(): number {
    return this.session.userId ?? 0
  }

  logout(targetUrl?: string): void {
    this.uiService.showBusyIndicator();
    this.tokenAuthService.logOut()
      .pipe(
        finalize(this.uiService.hideBusyIndicator)
      )
      .subscribe(() => {
        this.tokenService.clearToken();
        this.tokenService.clearRefreshToken();

        if (targetUrl) {
          location.href = targetUrl;
          return;
        }

        this.navigationService.navigate(Path.LOGIN);
      });
  }

  /**
   * this is a reimplementation of the /client/src/account/login/login.service.ts service
   * for now we ignore stuff like 'shouldResetPassword' and twoFactorAuth if needed have a look over there
   * redirectUrl - will be used in the future, suppressed for now
   * @param authenticateResult
   * @param rememberMe
   * @param redirectUrl
   * @private
   */
  // eslint-disable-next-line complexity, @typescript-eslint/no-unused-vars
  private processAuthenticationResult(authenticateResult: AuthenticateResultModel, rememberMe: boolean, redirectUrl: string): void {
    if (!authenticateResult.accessToken) {
      this.logService.error('empty access token on login');
      this.navigationService.navigate(Path.LOGIN);
      return;
    }

    const tokenExpireDate: Date | undefined = rememberMe
      ? DateTimeService.getCurrentDateAndAddSeconds(authenticateResult.expireInSeconds)
      : undefined;
    this.setAccessToken(authenticateResult.accessToken, tokenExpireDate);

    if (authenticateResult.refreshToken && rememberMe)
      this.setRefreshToken(authenticateResult.refreshToken, authenticateResult.refreshTokenExpireInSeconds);

    if (authenticateResult.encryptedAccessToken)
      this.setEncryptedAuthToken(authenticateResult.encryptedAccessToken, tokenExpireDate)
        .subscribe({
          error: err => {
            this.logService.error('Couldn\'t store Encrypted Authentication Token: ' + err)
          }
        });

    if (authenticateResult.twoFactorRememberClientToken)
      this.setTwoFactorRememberClientToken(authenticateResult.twoFactorRememberClientToken)
        .subscribe({
          error: err => {
            this.logService.error('Couldn\'t store two factor remember client Token: ' + err)
          }
        });

    location.href = redirectUrl
  }

  private setAccessToken(accessToken: string, tokenExpireDate?: Date): void {
    this.setToken(accessToken, tokenExpireDate);
  }

  private setRefreshToken(refreshToken: string, refreshTokenExpireInSeconds: number,): void {
    // not sure if setting an expire date when rememberMe is set is correct. But this is how it's
    // implemented in the asp client so we'll keep it for now (see: /client/src/account/login/login.service.ts service)
    this.tokenService.setRefreshToken(refreshToken, DateTimeService.getCurrentDateAndAddSeconds(refreshTokenExpireInSeconds));
  }

  private setEncryptedAuthToken(encryptedAccessToken: string, tokenExpireDate?: Date): Observable<TokenStore | void> {
    return defer(() => this.setTokenObjectIfNotEmpty(
      AppConsts.authorization.encryptedAuthTokenName,
      encryptedAccessToken,
      tokenExpireDate
    ));
  }

  private setTwoFactorRememberClientToken(twoFactorRememberClientToken: string): Observable<TokenStore | void> {
    return defer(() => this.setTokenObjectIfNotEmpty(
      AppConsts.authorization.twoFactorRememberClientToken,
      twoFactorRememberClientToken,
      DateTimeService.getCurrentDateAndAddSeconds(DateTimeService.yearsInSeconds(1))
    ));
  }

  private setToken(token: string, expireDate?: Date): void {
    this.tokenService.setToken(token, expireDate);
  }

  private setTokenObjectIfNotEmpty(key: string, token: string, expireDate?: Date): Observable<TokenStore | void> {
    return defer(() => this.localStorageService.setItem<TokenStore>(
      key,
      {
        token: token,
        expireDate: expireDate
      }
    ));
  }
}
