import { defaultStatusesLocalisation, IStatusesLocalisation } from '../general.shared';

export interface IAdminProducerProfileEditLabelLocalisation {
  cancel: string;
  city: string;
  companyName: string;
  contactPersonFullName: string;
  email: string;
  numberOfEmployees: string;
  phoneNumber: string;
  rate: string;
  save: string;
  state: string;
  street: string;
  tradeType: string;
  zipCode: string;
  note: string;
}

export interface IAdminProducerProfileEditLocalisation {
  parameterTitle: string;
  popupSubtitle: string;
  popupTitle: string;
  rateUnit: string;
  ratingTitleSeparation: string;
  ratingValueSeparator: string;
  notePlaceholder: string;
  undefinedRating: string;
  labels: IAdminProducerProfileEditLabelLocalisation;
  statuses: IStatusesLocalisation;
  inputErrorMessages: string[];
}

export interface IAdminProducerProfileEditErrors {
  city: boolean,
  companyName: boolean,
  contactPersonFullName: boolean,
  email: boolean,
  phoneNumber: boolean,
  rate: boolean
  street: boolean,
  tradeType: boolean,
  zipCode: boolean,
}

const adminProducerProfileEditLabelLocalisation: IAdminProducerProfileEditLabelLocalisation = {
  cancel: '',
  city: '',
  companyName: '',
  contactPersonFullName: '',
  email: '',
  numberOfEmployees: '',
  phoneNumber: '',
  rate: '',
  save: '',
  state: '',
  street: '',
  tradeType: '',
  zipCode: '',
  note: '',
}

export const adminProducerProfileEditLocalisation: IAdminProducerProfileEditLocalisation = {
  parameterTitle: '',
  popupSubtitle: '',
  popupTitle: '',
  rateUnit: '',
  ratingTitleSeparation: '',
  ratingValueSeparator: '',
  notePlaceholder: '',
  undefinedRating: '',
  labels: adminProducerProfileEditLabelLocalisation,
  statuses: defaultStatusesLocalisation,
  inputErrorMessages: [],
}

export const defaultAdminProducerProfileEditErrors: IAdminProducerProfileEditErrors = {
  city: false,
  companyName: false,
  contactPersonFullName: false,
  email: false,
  phoneNumber: false,
  rate: false,
  street: false,
  tradeType: false,
  zipCode: false,
}
