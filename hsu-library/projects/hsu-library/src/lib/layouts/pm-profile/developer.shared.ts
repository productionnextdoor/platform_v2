import { EUserStatus } from './general.shared';

export interface IDeveloper {
  city?: string;
  country?: string;
  email?: string;
  fullName?: string;
  isActive?: boolean;
  note?: string;
  numberOfDraftedProducts?: number;
  numberOfProducts?: number;
  phoneNumber?: string;
  pseudonym?: string;
  region?: string;
  street?: string;
  userId?: number;
  zipCode?: string;
  status?: EUserStatus;
  agbAndTerms?: boolean;
}

export interface IRegistrationDeveloper extends IDeveloper{
  password: string;
  repeatedPassword: string;
  verificationCode: string;
}
