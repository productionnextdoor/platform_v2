import { defaultStatusesLocalisation, IStatusesLocalisation } from '../general.shared';

export interface IProducerProfileFormLabelLocalisation {
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
}

export interface IProducerProfileLocalisation {
  inputErrorMessages: string[];
  labels: IProducerProfileFormLabelLocalisation;
  parameterTitle: string;
  popupSubtitle: string;
  popupTitle: string;
  rateUnit: string;
  statuses: IStatusesLocalisation,
  ratingTitleSeparation: string;
}

export interface IProducerProfileFormErrors {
  city: boolean,
  companyName: boolean,
  contactPersonFullName: boolean,
  email: boolean,
  numberOfEmployees: boolean,
  phoneNumber: boolean,
  rate: boolean,
  street: boolean,
  zipCode: boolean,
}

const producerProfileLabelLocalisations: IProducerProfileFormLabelLocalisation = {
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
}

export const producerProfileLocalisation: IProducerProfileLocalisation = {
  parameterTitle: '',
  popupSubtitle: '',
  popupTitle: '',
  rateUnit: '',
  ratingTitleSeparation: '',
  labels: producerProfileLabelLocalisations,
  statuses: defaultStatusesLocalisation,
  inputErrorMessages: []
}

export const defaultProducerProfileErrors: IProducerProfileFormErrors = {
  city: false,
  companyName: false,
  contactPersonFullName: false,
  email: false,
  numberOfEmployees: false,
  phoneNumber: false,
  rate: false,
  street: false,
  zipCode: false,
}
