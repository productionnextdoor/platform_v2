import {
  IAdminProfileLocalisation
} from '../../../../lib/layouts/pm-profile/pm-current-admin-profile/pm-current-admin-profile.shared';
import {IAdmin} from '../../../../lib/layouts/pm-profile/admin.shared';

export interface IAdminProfileData {
  localisations: IAdminProfileLocalisation;
  admin: IAdmin
}

export const currentAdminProfileData: IAdminProfileData = {
  localisations: {
    popupTitle: 'Mein Profil',
    popupSubtitle: 'Allgemeine Angaben',
    labels: {
      fullName: 'Vor- und Nachname',
      mail: 'E-Mail-Adresse',
      save: 'Speichern',
      cancel: 'Abbrechen',
    },
    inputErrorMessages: ['Erforderliches Feld']
  },
  admin: {
    fullName: 'Felix Kuester',
    emailAddress:  'felix.kuester@web.de',
  }
};
