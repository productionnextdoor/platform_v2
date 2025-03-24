import { IDeveloper } from 'hsu-library';
import { Observable } from 'rxjs';

export abstract class IDeveloperService {
  abstract getCurrentDeveloper(): Observable<IDeveloper>;

  abstract getDeveloperById(developerId: number): Observable<IDeveloper>;

  abstract updateDeveloper(developer: IDeveloper): Observable<IDeveloper>;

  abstract updateCurrentDeveloper(developer: IDeveloper): Observable<IDeveloper>
}
