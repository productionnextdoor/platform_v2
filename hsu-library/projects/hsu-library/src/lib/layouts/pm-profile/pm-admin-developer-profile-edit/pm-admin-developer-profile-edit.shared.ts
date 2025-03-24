import { defaultStatusesLocalisation, IStatusesLocalisation } from '../general.shared';

export interface IAdminDeveloperProfileEditLabelLocalisation {
  cancel: string;
  city: string;
  country: string;
  email: string;
  fullName: string;
  note: string,
  phoneNumber: string,
  pseudonym: string;
  region: string,
  save: string;
  state: string;
  street: string;
  zipCode: string;
}

export interface IAdminDeveloperProfileEditLocalisation {
  formIntroduction: string;
  formTitle: string;
  inputErrorMessages: string[];
  labels: IAdminDeveloperProfileEditLabelLocalisation;
  notePlaceholder: string;
  popupTitle: string;
  statuses: IStatusesLocalisation;
}

export interface IAdminDeveloperProfileEditErrors {
  city: boolean;
  country: boolean,
  email: boolean,
  fullName: boolean,
  phoneNumber: boolean,
  pseudonym: boolean,
  region: boolean,
  street: boolean,
  zipCode: boolean,
}

const adminDeveloperProfileEditLabelLocalisation: IAdminDeveloperProfileEditLabelLocalisation = {
  cancel: '',
  city: '',
  country: '',
  email: '',
  fullName: '',
  note: '',
  phoneNumber: '',
  pseudonym: '',
  region: '',
  save: '',
  state: '',
  street: '',
  zipCode: '',
}

export const adminDeveloperProfileEditLocalisation: IAdminDeveloperProfileEditLocalisation = {
  formIntroduction: '',
  formTitle: '',
  inputErrorMessages: [],
  labels: adminDeveloperProfileEditLabelLocalisation,
  notePlaceholder: '',
  popupTitle: '',
  statuses: defaultStatusesLocalisation,
}

export const defaultAdminDeveloperProfileEditErrors: IAdminDeveloperProfileEditErrors = {
  city: false,
  country: false,
  email: false,
  fullName: false,
  phoneNumber: false,
  pseudonym: false,
  region: false,
  street: false,
  zipCode: false,
}


