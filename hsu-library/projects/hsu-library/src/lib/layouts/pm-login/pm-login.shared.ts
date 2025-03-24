// type of the texts that will be displayed in the login form
export interface ILoginPageTexts {
  title: string;
  emailAddress: string;
  emailName: string;
  password: string;
  passwordName: string;
  submitTitle: string;
  forgotPassword: string;
  rememberMe: string;
  inputErrorMessages: string[];
}

export const loginPageLocalisations: ILoginPageTexts = {
  title: '',
  emailAddress: '',
  emailName: '',
  password: '',
  passwordName: '',
  submitTitle: '',
  forgotPassword: '',
  rememberMe: '',
  inputErrorMessages: []
}

// type of the data that will be emitted from the login form
export interface ILoginEvent {
  email: string;
  password: string;
  rememberMe: boolean;
}
