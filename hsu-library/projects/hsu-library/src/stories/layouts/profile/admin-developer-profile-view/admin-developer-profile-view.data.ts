import {
  IAdminDeveloperProfileViewLabelLocalisation,
  IAdminDeveloperProfileViewLocalisation
} from '../../../../lib/layouts/pm-profile/pm-admin-developer-profile-view/pm-admin-developer-profile-view.shared';
import { IDeveloper } from '../../../../lib/layouts/pm-profile/developer.shared';
import { IBreadCrumbLink, IBreadcrumbs } from '../../../../lib/layouts/pm-header/pm-header.shared';
import { EUserStatus, IStatusesLocalisation } from '../../../../lib/layouts/pm-profile/general.shared';

const labelLocalisations: IAdminDeveloperProfileViewLabelLocalisation = {
  city: 'Ort:',
  country: 'Land:',
  email: 'E-Mail-Adresse:',
  fullName: 'Name:',
  note: 'Notiz:',
  numberOfDraftedProducts: 'Produktentwürfe gesamt:',
  numberOfProducts: 'Produkte im Shop:',
  phoneNumber: 'Telefon-Nr.:',
  pseudonym: 'Name (Pseudonym):',
  region: 'Bundesland/Region:',
  street: 'Straße und Haus Nr.:',
  zipCode: 'PLZ:',
};

const statusesLocalisations: IStatusesLocalisation = {
  active: 'Aktiv',
  inactive: 'Inaktiv',
  invited: 'Invited'
}

const localisations: IAdminDeveloperProfileViewLocalisation = {
  generalInformationTitle: 'Angaben zum Entwickler',
  labels: labelLocalisations,
  statuses: statusesLocalisations,
  placeholderValue: '-',
  productInformationTitle:  'Angaben zu den Produkten',
};

const developer: IDeveloper = {
  city:  'Hamburg',
  country:  'Deutschland',
  email:  'felix.kuester@web.de',
  fullName: 'Felix Kuester',
  isActive:  false,
  phoneNumber:  '+49 040 258 94 56',
  pseudonym:  'Kuester Design',
  region:  'Saarland',
  street:  'Fasanenstraße 58',
  zipCode:  '22043',
  status: EUserStatus.Invited,
};

const breadcrumbLink: IBreadCrumbLink = {
  text: 'Entwickler',
  link: {
    routerLink: '/example-url-to-developers',
    title: 'Zur Entwicklerübersicht'
  }
}

const breadcrumbs: IBreadcrumbs = {
  breadcrumbLinks: [breadcrumbLink],
  lastBreadcrumb: 'Felix Kuester'
}

export interface IAdminDeveloperProfileViewData {
  breadcrumbs: IBreadcrumbs,
  developer: IDeveloper,
  localisations: IAdminDeveloperProfileViewLocalisation,
  ratingMaxValue: number
}

export const adminDeveloperProfileViewData: IAdminDeveloperProfileViewData = {
  breadcrumbs,
  developer,
  localisations,
  ratingMaxValue: 5
};
