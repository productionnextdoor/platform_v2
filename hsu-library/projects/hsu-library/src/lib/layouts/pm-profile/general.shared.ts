export interface ISectionData {
  key: string,
  value?: string | number
}

export enum EUserStatus {
  Active = 'active',
  InActive = 'inactive',
  Invited = 'invited'
}

export interface IStatusesLocalisation {
  active: string;
  inactive: string;
  invited: string;
}

export const defaultStatusesLocalisation: IStatusesLocalisation = {
  active: '',
  inactive: '',
  invited: ''
}
