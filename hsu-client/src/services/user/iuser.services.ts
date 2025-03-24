import { PmDropdownOption } from 'hsu-library';
import { Observable } from 'rxjs';

export abstract class IUserService {
  abstract getDevelopersAsDropdownOptions (): Observable<PmDropdownOption<number>[]>;

  abstract deleteUserProfile(producerId: number): Observable<void>;
}
