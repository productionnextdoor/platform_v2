import { Icon } from '../pm-icon/pm-icon.shared';
import { IImprintLink } from '../../shared/imprint.shared';

export interface IContactCardContacts {
  emailAddress: string;
  phoneNumber: string;
}

export interface IContactCardLocalisation {
  title: string;
  text: string;
}

export interface IContactCardEvent<T> {
  item: IContactCardLink<T>;
}

export interface IContactCardLink<T> extends IImprintLink<T> {
  icon: Icon;
}

export interface IContactCardContact {
  text: string;
  href: string;
  icon: Icon;
}

export const contactCardContacts: IContactCardContacts = {
  emailAddress: '',
  phoneNumber: ''
}

export const contactCardLocalisation: IContactCardLocalisation = {
  title: '',
  text: ''
}
