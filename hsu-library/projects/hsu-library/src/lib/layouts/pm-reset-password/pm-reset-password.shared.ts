// type of the texts that will be displayed in the reset-password form
import { IErrorTexts } from '../../utils/password-validation';

export interface IResetPasswordLocalisations {
  title: string,
  text: string,
  passwordLabel: string,
  repeatPasswordLabel: string,
  confirmButtonText: string,
  backButtonText: string,
  errorTexts: IErrorTexts
}

export const resetPasswordLocalisations: IResetPasswordLocalisations = {
  title: '',
  text: '',
  passwordLabel: '',
  repeatPasswordLabel: '',
  confirmButtonText: '',
  backButtonText: '',
  errorTexts: {
    passwordMismatch: '',
    requireDigit: '',
    requireLowercase: '',
    requireNonAlphanumeric: '',
    requireUppercase: '',
    requiredLength: '',
  },
}



