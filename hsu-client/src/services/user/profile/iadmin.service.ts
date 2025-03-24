import { IAdmin } from 'hsu-library';
import { Observable } from 'rxjs';

export abstract class IAdminService {
  abstract getCurrentAdmin(): Observable<IAdmin>;

  abstract updateCurrentAdmin(developer: IAdmin): Observable<IAdmin>
}
