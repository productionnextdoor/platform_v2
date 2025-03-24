export interface IDeveloperProfileFormLabelLocalisation {
  cancel: string;
  city: string;
  country: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  pseudonym: string;
  region: string;
  save: string;
  state: string;
  street: string;
  zipCode: string;
}

export interface IDeveloperProfileLocalisation {
  isActiveState: string;
  isInactiveState: string;
  popupSubtitle: string;
  popupTitle: string;
  labels: IDeveloperProfileFormLabelLocalisation;
  inputErrorMessages: string[];
}

export interface IDeveloperProfileFormErrors {
  city: boolean;
  country: boolean;
  email: boolean;
  fullName: boolean;
  phoneNumber: boolean;
  region: boolean;
  street: boolean;
  zipCode: boolean;
}

const developerProfileLabelLocalisations: IDeveloperProfileFormLabelLocalisation = {
  cancel: '',
  city: '',
  country: '',
  fullName: '',
  email: '',
  phoneNumber: '',
  pseudonym: '',
  region: '',
  save: '',
  state: '',
  street: '',
  zipCode: '',
}

export const developerProfileLocalisation: IDeveloperProfileLocalisation = {
  isActiveState: '',
  isInactiveState: '',
  popupSubtitle: '',
  popupTitle: '',
  labels: developerProfileLabelLocalisations,
  inputErrorMessages: []
}

export const defaultDeveloperProfileErrors: IDeveloperProfileFormErrors = {
  city: false,
  country: false,
  email: false,
  fullName: false,
  phoneNumber: false,
  region: false,
  street: false,
  zipCode: false,
}
