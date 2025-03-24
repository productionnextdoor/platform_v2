export interface IRuleSet{
  rule: boolean,
  regex?: RegExp,
  errorMessage: string,
}

export interface IRequestPasswordMailLocalisations {
  form: {
    title: string;
    text: string;
    emailLabel: string;
    confirmButtonText: string;
    backButtonText: string;
    emailNotValidError: string
  },
  successPopUp: {
    title: string;
    text: string;
    confirmButtonText: string;
  },
}

export const requestPasswordMailLocalisations: IRequestPasswordMailLocalisations = {
  form: {
    title: '',
    text: '',
    emailLabel: '',
    confirmButtonText: '',
    backButtonText: '',
    emailNotValidError: ''
  },
  successPopUp: {
    title: '',
    text: '',
    confirmButtonText: '',
  },
}


