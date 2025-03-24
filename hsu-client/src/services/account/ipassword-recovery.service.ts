import {
  ResetPasswordInput,
  ResetPasswordOutput,
} from '../../shared/service-proxies/service-proxies';
import { IPasswordComplexity } from 'hsu-library';
import { Observable } from 'rxjs';

export abstract class IPasswordRecoveryService {
  abstract sendPasswordResetCode(email: string): Observable<void>

  abstract resetPassword(resetModel: ResetPasswordInput): Observable<ResetPasswordOutput>

  abstract GetPasswordComplexitySetting(): Observable<IPasswordComplexity>
}
