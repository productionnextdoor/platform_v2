import {
  IErrorTexts,
  IProducerBaseData,
  IProducerRegistrationLocalisation,
  IRegistrationProducer,
  PmDropdownOption
} from 'hsu-library';
import { Observable } from 'rxjs';

export abstract class IProducerRegistrationService {
  abstract getLocalisationStrings(): IProducerRegistrationLocalisation;
  abstract getPasswordErrorTexts(): IErrorTexts;
  abstract inviteProducer(producerBaseData: IProducerBaseData): Observable<void>;
  abstract getTradeTypes(): Observable<PmDropdownOption<number>[]>;
  abstract getRegisteredProducerData(verificationCode: string): Observable<IRegistrationProducer>;
  abstract registerProducer(producer: IRegistrationProducer): Observable<void>;
}
