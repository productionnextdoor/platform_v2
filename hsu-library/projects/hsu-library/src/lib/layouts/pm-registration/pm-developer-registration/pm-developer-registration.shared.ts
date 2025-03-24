import { IErrorTexts } from '../../../utils/password-validation';

export interface IDeveloperRegistrationFormLabelLocalisation {
  fullName: string;
  pseudonym: string;
  street: string;
  zipCode: string;
  city: string;
  region: string;
  country: string;
  mail: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  register: string;
  acceptTermsAndPrivacyPartOne: string;
  acceptTermsAndPrivacyPartTwo: string;
}

export interface IDeveloperRegistrationFormPlaceholderLocalisation {
  fullName: string;
  pseudonym: string;
  street: string;
  zipCode: string;
  city: string;
  region: string;
  country: string;
  mail: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
}

export interface IDeveloperRegistrationLocalisation {
  title: string;
  bannerText: string;
  labels: IDeveloperRegistrationFormLabelLocalisation;
  placeholder: IDeveloperRegistrationFormPlaceholderLocalisation;
  inputErrorMessages: string[];
  passwordErrorTexts: IErrorTexts;
}

export interface IDeveloperRegistrationFormErrors {
  fullName: boolean;
  pseudonym: boolean;
  street: boolean;
  zipCode: boolean;
  city: boolean;
  region: boolean;
  country: boolean;
  mail: boolean;
  phoneNumber: boolean;
  password: boolean;
  repeatedPassword: boolean;
  agbAndTerms: boolean;
  [key: string]: boolean;
}

const developerRegistrationLabelLocalisations: IDeveloperRegistrationFormLabelLocalisation = {
  fullName: '',
  pseudonym: '',
  street: '',
  zipCode: '',
  city: '',
  region: '',
  country: '',
  mail: '',
  phoneNumber: '',
  password: '',
  repeatPassword: '',
  register: '',
  acceptTermsAndPrivacyPartOne: '',
  acceptTermsAndPrivacyPartTwo: ''
}

const developerRegistrationPlaceholderLocalisations: IDeveloperRegistrationFormPlaceholderLocalisation = {
  fullName: '',
  pseudonym: '',
  street: '',
  zipCode: '',
  city: '',
  region: '',
  country: '',
  mail: '',
  phoneNumber: '',
  password: '',
  repeatPassword: '',
}

export const developerRegistrationLocalisation: IDeveloperRegistrationLocalisation = {
  title: '',
  bannerText: '',
  labels: developerRegistrationLabelLocalisations,
  placeholder: developerRegistrationPlaceholderLocalisations,
  inputErrorMessages: [],
  passwordErrorTexts: {
    passwordMismatch: '',
    requireDigit: '',
    requireLowercase: '',
    requireNonAlphanumeric: '',
    requireUppercase: '',
    requiredLength: '',
  },
}

export const defaultDeveloperRegistrationErrors: IDeveloperRegistrationFormErrors = {
  fullName: false,
  pseudonym: false,
  street: false,
  zipCode: false,
  city: false,
  region: false,
  country: false,
  mail: false,
  phoneNumber: false,
  password: false,
  repeatedPassword: false,
  agbAndTerms: false
}
