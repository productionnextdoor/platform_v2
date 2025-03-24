// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CONSTRUCTOR_PARAM = any //this is enforced by TS

export type Constructor<T> = new(...args: CONSTRUCTOR_PARAM[]) => T;
