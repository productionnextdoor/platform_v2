import { Injectable } from '@angular/core';
import {
  AccountServiceProxy,
  ImpersonateOutput,
  ImpersonateUserInput
} from '../service-proxies/service-proxies';
import { AuthService } from '../../services/account/auth.service';
import { AppConsts } from '../AppConsts';
import { AbpSessionService } from 'abp-ng2-module';
import { map } from 'rxjs';

/**
 * ImpersonationService
 *
 * Helper service to handle user impersonation.
 *
 * This class is based on the original ImpersonationService from the ABP framework.
 * client/src/app/admin/users/impersonation.service.ts
 *
 * We only need the impersonateUser and backToImpersonator methods
 * from the original service so the others were skipped.
 */

@Injectable()
export class ImpersonationService {
  constructor(
        private _accountService: AccountServiceProxy,
        private _authService: AuthService,
        private _abpSessionService: AbpSessionService
  ) {}

  isCurrentAuthUserImpersonated(): boolean {
    return (this._abpSessionService.impersonatorUserId ?? 0) > 0;
  }

  impersonateUser(userId: number, tenantId?: number): void {
    const input: ImpersonateUserInput = new ImpersonateUserInput();
    input.userId = userId;
    input.tenantId = tenantId;

    this._accountService.impersonateUser(input)
      .pipe(
        map((result: ImpersonateOutput) => this._getBaseUrl(result)),
        map((targetUrl: string) => this._applyTenantIdUrlParameter(targetUrl, input.tenantId))
      )
      .subscribe((targetUrl: string) => {
        this._authService.logout(targetUrl);
      });
  }


  backToImpersonator(): void {
    this._accountService.backToImpersonator()
      .pipe(
        map((result: ImpersonateOutput) => this._getBaseUrl(result)),
        map((targetUrl: string) => this._applyTenantIdUrlParameter(targetUrl, abp.session.impersonatorTenantId))
      )
      .subscribe((targetUrl: string) => {
        this._authService.logout(targetUrl);
      });
  }

  _getAppRootUrl(_result: ImpersonateOutput): string{
    return AppConsts.appBaseUrl + '/index.html';
  }

  _getBaseUrl(result: ImpersonateOutput): string {
    return this._getAppRootUrl(result)
      + '?impersonationToken=' + result.impersonationToken;
  }

  _applyTenantIdUrlParameter(targetUrl: string, tenantId?: number): string {
    return !tenantId
      ? targetUrl
      : targetUrl + '&tenantId=' + tenantId;
  }
}
