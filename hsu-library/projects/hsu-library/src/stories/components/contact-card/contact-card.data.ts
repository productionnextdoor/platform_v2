import {
  IContactCardLocalisation,
  IContactCardContacts,
  IContactCardLink,
} from '../../../lib/components/pm-contact-card/pm-contact-card.shared';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';

interface IContactCardData {
  contacts: IContactCardContacts;
  localisationStrings: IContactCardLocalisation;
  contactCardLinks: IContactCardLink<string>[];
}

export const ContactCardData: IContactCardData = {
  contacts: {
    emailAddress: 'info@productionnextdoor.de',
    phoneNumber: '+49 40 6541 3845'
  },
  localisationStrings: {
    title: 'Fragen & Kontakt',
    text: 'Solltest du Fragen haben oder Hilfe benötigen, kontaktiere bitte einen Administrator!'
  },
  contactCardLinks: [
    {
      linkId: 1,
      title: 'Datenschutzerklärung',
      path: 'privacy-policy',
      icon: Icon.ORDER_OVERVIEW
    },
    {
      linkId: 2,
      title: 'Allgemeine Geschäftsbedingungen',
      path: 'terms-and-conditions',
      icon: Icon.ORDER_OVERVIEW
    },
  ]
};
