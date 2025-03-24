import {
  requireDigitRegex,
  requireLowercase,
  requireNonAlphanumeric,
  requireUppercase
} from './validation-regex';

export class PmPasswordValidation {
  public static ValidatePasswordComplexity(
    passwordComplexitySetting:IPasswordComplexity,
    errorTexts:IErrorTexts,
    password:string
  ):string[] {
    const errorMessages: string[] = [];
    [
      {
        rule: passwordComplexitySetting.requireDigit,
        regex: requireDigitRegex,
        errorMessage: errorTexts.requireDigit,
      },
      {
        rule: passwordComplexitySetting.requireLowercase,
        regex: requireLowercase,
        errorMessage: errorTexts.requireLowercase,
      },
      {
        rule: passwordComplexitySetting.requireNonAlphanumeric,
        regex: requireNonAlphanumeric,
        errorMessage: errorTexts.requireNonAlphanumeric,
      },
      {
        rule: passwordComplexitySetting.requireUppercase,
        regex: requireUppercase,
        errorMessage: errorTexts.requireUppercase,
      },
      {
        rule: password.length < passwordComplexitySetting.requiredLength,
        errorMessage: errorTexts.requiredLength,
      },
    ].forEach(({rule, regex, errorMessage}) => {
      if (rule && (!regex?.test(password))) {
        errorMessages.push(errorMessage);
      }
    });

    return errorMessages;
  }
}

export interface IErrorTexts {
  passwordMismatch: string,
  requireDigit: string,
  requireLowercase: string,
  requireNonAlphanumeric: string,
  requireUppercase: string,
  requiredLength: string
}



export interface IPasswordComplexity {
  requireDigit: boolean,
  requireLowercase: boolean,
  requireNonAlphanumeric: boolean,
  requireUppercase: boolean,
  requiredLength: number
}

export const passwordComplexitySetting: IPasswordComplexity = {
  requireDigit: false,
  requireLowercase: false,
  requireNonAlphanumeric: false,
  requireUppercase: false,
  requiredLength: 6
}
