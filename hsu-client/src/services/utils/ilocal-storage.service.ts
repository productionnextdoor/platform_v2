export abstract class ILocalStorageService {
  abstract getItem<T>(
    key: string,
    // we need any type here for the 'localForage' library
    // eslint-disable-next-line @typescript-eslint/ban-types
    func?: (err: unknown, value: T | null) => void
  ): Promise<T | null | void>;

  abstract setItem<T>(
    key: string,
    value: T,
    // we need any type here for the 'localForage' library
    // eslint-disable-next-line @typescript-eslint/ban-types
    func?: (err: unknown, value: T) => void
  ): Promise<T | void>;

  abstract removeItem(
    key: string,
    // we need any type here for the 'localForage' library
    // eslint-disable-next-line @typescript-eslint/ban-types
    func?: (err: unknown) => void
  ): Promise<void>;
}
