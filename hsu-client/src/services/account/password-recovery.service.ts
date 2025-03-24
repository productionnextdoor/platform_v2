import { Injectable } from '@angular/core';
import {
  AccountServiceProxy,
  GetPasswordComplexitySettingOutput,
  ProfileServiceProxy,
  ResetPasswordInput,
  ResetPasswordOutput,
  SendPasswordResetCodeInput
} from '../../shared/service-proxies/service-proxies';
import {
  map,
  Observable
} from 'rxjs';
import { IPasswordRecoveryService } from './ipassword-recovery.service';
import { IPasswordComplexity } from 'hsu-library';

@Injectable()
export class PasswordRecoveryService implements IPasswordRecoveryService {

  constructor(
    private readonly accountService: AccountServiceProxy,
    private readonly profileService: ProfileServiceProxy,
  ) {
  }

  sendPasswordResetCode(email: string): Observable<void> {
    const resetPasswordInput: SendPasswordResetCodeInput = new SendPasswordResetCodeInput({
      emailAddress: email
    })
    return this.accountService.sendPasswordResetCode(resetPasswordInput);
  }

  resetPassword(resetModel: ResetPasswordInput): Observable<ResetPasswordOutput> {
    return this.accountService.resetPassword(resetModel);
  }

  GetPasswordComplexitySetting(): Observable<IPasswordComplexity> {
    return this.profileService.getPasswordComplexitySetting()
      .pipe(
        map(this.passwordComplexitySettingsMapping.bind(this))
      );
  }

  private passwordComplexitySettingsMapping(result: GetPasswordComplexitySettingOutput): IPasswordComplexity {
    return {
      requireDigit: result.setting.requireDigit,
      requireLowercase: result.setting.requireLowercase,
      requireNonAlphanumeric: result.setting.requireNonAlphanumeric,
      requireUppercase: result.setting.requireUppercase,
      requiredLength: result.setting.requiredLength
    }
  }
}
