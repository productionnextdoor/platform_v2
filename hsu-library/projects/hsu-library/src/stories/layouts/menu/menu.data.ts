import { IMenuItem } from '../../../lib/layouts/pm-menu/pm-menu.shared';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';
import {
  IContactCardLink,
  IContactCardLocalisation
} from '../../../lib/components/pm-contact-card/pm-contact-card.shared';
import { IContactCardContacts } from '../../../lib/components/pm-contact-card/pm-contact-card.shared';

export interface IMenuData {
  activeItemId: number;
  menuItems: IMenuItem<string>[];
  contactCardContacts: IContactCardContacts;
  contactCardLocalisation: IContactCardLocalisation;
  contactCardLinks: IContactCardLink<string>[];
}

export const menuData: IMenuData = {
  activeItemId: 0,
  menuItems: [
    {
      menuId: 1,
      logo: Icon.DASHBOARD,
      text: 'Dashboard',
      path: 'account/Dashboard',
      subPaths: [],
      accessPermissions: []
    },
    {
      menuId: 2,
      logo: Icon.PRODUCT_OVERVIEW,
      text: 'Produktübersicht',
      path: 'products',
      subPaths: [],
      accessPermissions: []
    },
    {
      menuId: 3,
      logo: Icon.PRODUCERS,
      text: 'Entwickler',
      path: 'developers',
      subPaths: [],
      accessPermissions: []
    }
  ],
  contactCardContacts: {
    emailAddress: 'info@productionnextdoor.de',
    phoneNumber: '+49 40 6541 3845'
  },
  contactCardLocalisation: {
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
}
