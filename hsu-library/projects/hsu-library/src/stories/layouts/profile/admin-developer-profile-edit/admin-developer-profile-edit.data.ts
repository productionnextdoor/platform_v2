import {
  IAdminDeveloperProfileEditLabelLocalisation,
  IAdminDeveloperProfileEditLocalisation,
} from '../../../../lib/layouts/pm-profile/pm-admin-developer-profile-edit/pm-admin-developer-profile-edit.shared';
import {
  IDeveloper
} from '../../../../lib/layouts/pm-profile/developer.shared';
import { PmDropdownOption } from '../../../../lib/components/pm-dropdown/pm-dropdown.shared';
import { EUserStatus, IStatusesLocalisation } from '../../../../lib/layouts/pm-profile/general.shared';

export interface IAdminDeveloperProfileEditData {
  developer: IDeveloper
  localisations: IAdminDeveloperProfileEditLocalisation;
  stateDropdownOptions: PmDropdownOption<EUserStatus>[]
}

const labelLocalisations: IAdminDeveloperProfileEditLabelLocalisation = {
  cancel: 'Abbrechen',
  city: 'Ort',
  country: 'Land',
  email: 'E-Mail-Adresse',
  fullName: 'Name',
  note: 'Notiz',
  phoneNumber: 'Telefon-Nr.',
  pseudonym: 'Name (Pseudonym)',
  region: 'Region/Bundesland',
  save: 'Speichern',
  state: 'Status',
  street: 'Straße und Haus-Nr.',
  zipCode: 'PLZ',
}

const statusesLocalisations: IStatusesLocalisation = {
  active: 'Aktiv',
  inactive: 'Inaktiv',
  invited: 'Eingeladen',
}

const adminDeveloperProfileEditLocalisations: IAdminDeveloperProfileEditLocalisation = {
  formIntroduction: 'Die Angaben zum Entwickler können jederzeit angepasst werden.',
  formTitle: 'Allgemeine Angaben',
  inputErrorMessages: ['Erforderliches Feld'],
  labels: labelLocalisations,
  notePlaceholder: 'Hier kannst du eine Notiz hinzufügen. Die Notiz ist für den Entwickler nicht sichtbar',
  popupTitle: 'Entwickler bearbeiten',
  statuses: statusesLocalisations,
}

const developer: IDeveloper = {
  city: 'Saarbrücken',
  country: 'Deutschland',
  email: 'E-Mail-Adresse',
  fullName: 'Felix Kuester',
  isActive: true,
  note: 'Der Entwickler ist auf Kommoden spezialisiert.',
  phoneNumber: '+49 040 258 94 56',
  pseudonym: 'Kuester Design',
  region: 'Region/Bundesland',
  street: 'Fasanenstraße 58',
  zipCode: '66117',
}

const stateDropdownOptions: PmDropdownOption<EUserStatus>[] = [
  {
    key: EUserStatus.Active,
    value: statusesLocalisations[EUserStatus.Active],
  },
  {
    key: EUserStatus.InActive,
    value: statusesLocalisations[EUserStatus.InActive],
  },
];

export const adminDeveloperProfileEditProfileData: IAdminDeveloperProfileEditData = {
  localisations: adminDeveloperProfileEditLocalisations,
  developer: developer,
  stateDropdownOptions: stateDropdownOptions,
};
