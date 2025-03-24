import {
  IDeveloperRegistrationLocalisation,
  IRegistrationDeveloper,
  IDeveloperBaseData,
  IErrorTexts
} from 'hsu-library';
import { Observable } from 'rxjs';

export abstract class IDeveloperRegistrationService {
  abstract getLocalisationStrings(): IDeveloperRegistrationLocalisation;
  abstract getPasswordErrorTexts(): IErrorTexts;
  abstract inviteDeveloper(developerBaseData: IDeveloperBaseData): Observable<void>;
  abstract getRegisteredDeveloperData(verificationCode: string): Observable<IRegistrationDeveloper>;
  abstract registerDeveloper(developer: IRegistrationDeveloper): Observable<void>;
}
