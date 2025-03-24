import {
  Injectable
} from '@angular/core';
import * as localForage from 'localforage';
import {
  ILocalStorageService
} from './ilocal-storage.service';

@Injectable()
export class LocalStorageService extends ILocalStorageService {
  getItem<T>(
    key: string,
    // we need any type here for the 'localForage' library
    // eslint-disable-next-line @typescript-eslint/ban-types
    func?: (err: unknown, value: T | null) => void
  ): Promise<T | null | void> {
    if (!localForage) {
      return Promise.resolve();
    }

    return localForage.getItem<T>(key, func);
  }

  setItem<T>(
    key: string,
    value: T,
    // we need any type here for the 'localForage' library
    // eslint-disable-next-line @typescript-eslint/ban-types
    func?: (err: unknown, value: T) => void
  ): Promise<T | void> {
    if (!localForage || !value) {
      return Promise.resolve();
    }

    return localForage.setItem<T>(key, value, func);
  }

  removeItem(
    key: string,
    // we need any type here for the 'localForage' library
    // eslint-disable-next-line @typescript-eslint/ban-types
    func?: (err: unknown) => void
  ): Promise<void> {
    if (!localForage) {
      return Promise.resolve();
    }

    return localForage.removeItem(key, func);
  }
}
