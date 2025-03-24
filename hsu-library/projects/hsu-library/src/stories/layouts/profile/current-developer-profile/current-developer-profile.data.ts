import {
  IDeveloperProfileLocalisation
} from '../../../../lib/layouts/pm-profile/pm-current-developer-profile/pm-current-developer-profile.shared';
import {
  IDeveloper,
} from '../../../../lib/layouts/pm-profile/developer.shared';

export interface IDeveloperProfileData {
  localisations: IDeveloperProfileLocalisation;
  developer: IDeveloper
}

export const currentDeveloperProfileData: IDeveloperProfileData = {
  localisations: {
    popupTitle: 'Mein Profil',
    popupSubtitle: 'Allgemeine Angaben',
    labels: {
      fullName: 'Name',
      country: 'Land',
      pseudonym: 'Name (Pseudonym)',
      email: 'E-Mail-Adresse',
      street: 'Straße und Haus-Nr.',
      phoneNumber: 'Telefon-Nr.',
      zipCode: 'PLZ',
      city: 'Ort',
      state: 'Status',
      region: 'Region/Bundesland',
      save: 'Speichern',
      cancel: 'Abbrechen',
    },
    isActiveState: 'Aktiv',
    isInactiveState: 'Inaktiv',
    inputErrorMessages: ['Erforderliches Feld']
  },
  developer: {
    fullName: 'Felix Kuester',
    pseudonym:  'Kuester Design',
    street:  'Fasanenstraße 58',
    zipCode:  '22043',
    city:  'Hamburg',
    region:  'Saarland',
    country:  'Deutschland',
    email:  'felix.kuester@web.de',
    phoneNumber:  '+49 040 258 94 56',
    isActive:  true,
  }
};
