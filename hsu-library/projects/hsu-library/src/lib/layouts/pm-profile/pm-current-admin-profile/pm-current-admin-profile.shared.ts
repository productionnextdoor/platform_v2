export interface IAdminProfileFormLabelLocalisation {
  fullName: string;
  mail: string;
  cancel: string;
  save: string;
}

export interface IAdminProfileLocalisation {
  inputErrorMessages: string[];
  labels: IAdminProfileFormLabelLocalisation;
  popupSubtitle: string;
  popupTitle: string;
}

export interface IAdminProfileFormErrors {
  email: boolean;
  fullName: boolean;
  [key: string]: boolean;
}

const adminProfileLabelLocalisations: IAdminProfileFormLabelLocalisation = {
  fullName: '',
  mail: '',
  cancel: '',
  save: '',
}

export const adminProfileLocalisation: IAdminProfileLocalisation = {
  inputErrorMessages: [],
  labels: adminProfileLabelLocalisations,
  popupSubtitle: '',
  popupTitle: '',
}

export const defaultAdminProfileErrors: IAdminProfileFormErrors = {
  email: false,
  fullName: false,
}
