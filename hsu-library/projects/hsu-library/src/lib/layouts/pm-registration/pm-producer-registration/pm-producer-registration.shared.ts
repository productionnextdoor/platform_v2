import { IErrorTexts } from '../../../utils/password-validation';

export interface IProducerRegistrationFormLabelLocalisation {
  companyName: string;
  tradeType: string;
  employees: string;
  state: string;
  hourlyWage: string;
  contactPerson: string;
  street: string;
  zipCode: string;
  city: string;
  mail: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  register: string;
  acceptTermsAndPrivacyPartOne: string;
  acceptTermsAndPrivacyPartTwo: string;
}

export interface IProducerRegistrationFormPlaceholderLocalisation {
  companyName: string;
  tradeType: string;
  employees: string;
  state: string;
  hourlyWage: string;
  contactPerson: string;
  street: string;
  zipCode: string;
  city: string;
  mail: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
}

export interface IProducerRegistrationLocalisation {
  title: string;
  labels: IProducerRegistrationFormLabelLocalisation;
  placeholder: IProducerRegistrationFormPlaceholderLocalisation;
  isActive: string;
  isInactive: string;
  hourlyWageUnit: string;
  inputErrorMessages: string[];
  passwordErrorTexts: IErrorTexts;
}

export interface IProducerRegistrationFormErrors {
  companyName: boolean;
  employees: boolean;
  hourlyWage: boolean;
  contactPerson: boolean;
  street: boolean;
  zipCode: boolean;
  city: boolean;
  mail: boolean;
  phoneNumber: boolean;
  password: boolean;
  repeatedPassword: boolean;
  agbAndTerms: boolean;
}

const producerRegistrationLabelLocalisations: IProducerRegistrationFormLabelLocalisation = {
  companyName: '',
  tradeType: '',
  employees: '',
  state: '',
  hourlyWage: '',
  contactPerson: '',
  street: '',
  zipCode: '',
  city: '',
  mail: '',
  phoneNumber: '',
  password: '',
  repeatPassword: '',
  register: '',
  acceptTermsAndPrivacyPartOne: '',
  acceptTermsAndPrivacyPartTwo: '',
}

const producerRegistrationPlaceholderLocalisations: IProducerRegistrationFormPlaceholderLocalisation = {
  companyName: '',
  tradeType: '',
  employees: '',
  state: '',
  hourlyWage: '',
  contactPerson: '',
  street: '',
  zipCode: '',
  city: '',
  mail: '',
  phoneNumber: '',
  password: '',
  repeatPassword: '',
}

export const producerRegistrationLocalisation: IProducerRegistrationLocalisation = {
  title: '',
  labels: producerRegistrationLabelLocalisations,
  placeholder: producerRegistrationPlaceholderLocalisations,
  isActive: '',
  isInactive: '',
  hourlyWageUnit: '',
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

export const defaultProducerRegistrationErrors: IProducerRegistrationFormErrors = {
  companyName: false,
  employees: false,
  hourlyWage: false,
  contactPerson: false,
  street: false,
  zipCode: false,
  city: false,
  mail: false,
  phoneNumber: false,
  password: false,
  repeatedPassword: false,
  agbAndTerms: false
}
