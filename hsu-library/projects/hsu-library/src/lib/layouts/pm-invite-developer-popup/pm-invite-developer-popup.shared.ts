export interface IInviteDeveloperPopupLocalisations {
  title: string;
  description: string;
  subTitle: string;
  inputNameLabel: string;
  inputNamePlaceholder: string;
  inputMailLabel: string;
  inputMailPlaceholder: string;
  cancelLabel: string;
  inviteLabel: string;
  emailNotValidError: string;
}

export const inviteDeveloperPopupLocalisations: IInviteDeveloperPopupLocalisations = {
  title: '',
  description: '',
  subTitle: '',
  inputNameLabel: '',
  inputNamePlaceholder: '',
  inputMailLabel: '',
  inputMailPlaceholder: '',
  cancelLabel: '',
  inviteLabel: '',
  emailNotValidError: ''
}

export interface IDeveloperBaseData {
  developerName: string;
  email: string;
}

export class DeveloperBaseData implements IDeveloperBaseData {
  developerName: string = '';
  email: string = '';
}
