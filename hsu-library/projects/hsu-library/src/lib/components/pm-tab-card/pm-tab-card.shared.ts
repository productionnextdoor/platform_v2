import { ButtonType } from '../pm-button/pm-button.component';

export interface ITab<T> {
  text: string;
  value: T;
  active: boolean;
}

export interface ITabButton {
  text: string;
  value: string;
  type: ButtonType;
  disabled: boolean;
}
