import { defaultStatusesLocalisation, IStatusesLocalisation } from '../general.shared';

export interface IAdminDeveloperProfileViewLabelLocalisation {
  city: string;
  country: string;
  email: string;
  fullName: string;
  note: string;
  numberOfDraftedProducts: string;
  numberOfProducts: string;
  phoneNumber: string;
  pseudonym: string;
  region: string;
  street: string;
  zipCode: string;
}

export interface IAdminDeveloperProfileViewLocalisation {
  generalInformationTitle: string,
  labels: IAdminDeveloperProfileViewLabelLocalisation,
  statuses: IStatusesLocalisation,
  placeholderValue: string,
  productInformationTitle: string,
}

export const defaultAdminDeveloperProfileLabelLocalisation: IAdminDeveloperProfileViewLabelLocalisation = {
  city: '',
  country: '',
  email: '',
  fullName: '',
  note: '',
  numberOfDraftedProducts: '',
  numberOfProducts: '',
  phoneNumber: '',
  pseudonym: '',
  region: '',
  street: '',
  zipCode: '',
}

export const defaultAdminDeveloperProfileViewLocalisation: IAdminDeveloperProfileViewLocalisation = {
  generalInformationTitle: '',
  labels: defaultAdminDeveloperProfileLabelLocalisation,
  placeholderValue: '',
  productInformationTitle: '',
  statuses: defaultStatusesLocalisation
}

