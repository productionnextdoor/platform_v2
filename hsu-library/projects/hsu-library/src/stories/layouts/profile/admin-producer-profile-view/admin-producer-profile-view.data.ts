import {
  IAdminProducerProfileViewLabelLocalisation,
  IAdminProducerProfileViewLocalisation,
} from '../../../../lib/layouts/pm-profile/pm-admin-producer-profile-view/pm-admin-producer-profile-view.shared';
import {
  IProducer,
  IProducerRating,
  IProducerTradeType,
  PRODUCER_RATING_UNSPECIFIED
} from '../../../../lib/layouts/pm-profile/producer.shared';
import { EUserStatus, IStatusesLocalisation } from '../../../../lib/layouts/pm-profile/general.shared';
import { IBreadCrumbLink, IBreadcrumbs } from '../../../../lib/layouts/pm-header/pm-header.shared';

const labelLocalisations: IAdminProducerProfileViewLabelLocalisation = {
  companyName: 'Name d. Unternehmens:',
  tradeType: 'Gewerk:',
  email: 'E-Mail-Adresse:',
  numberOfEmployees: 'Anzahl Mitarbeiter:',
  phoneNumber: 'Telefon-Nr.:',
  zipCode: 'PLZ:',
  city: 'Ort:',
  street: 'Straße und Haus Nr.:',
  note: 'Notiz:',
  associatedProducts: 'Beteiligte Produkte:',
  alreadyProducedFurniture: 'Bereits produzierte Möbel:',
  currentOrders: 'Derzeitige Aufträge:',
};

const statusesLocalisations: IStatusesLocalisation = {
  active: 'Aktiv',
  inactive: 'Inaktiv',
  invited: 'Eingeladen'
}

const localisations: IAdminProducerProfileViewLocalisation = {
  companyInformationTitle: 'Angaben zum Unternehmen',
  parameterTitle: 'Wertkettenparameter',
  productsAndServicesTitle: 'Produkte und Aufträge',
  labels: labelLocalisations,
  statuses: statusesLocalisations,
  ratingTitleSeparation: ': ',
};

const ratings: IProducerRating[] = [
  {
    identifier: 1,
    type: 'Soziales Engagement',
    rating: 3
  },
  {
    identifier: 2,
    type: 'Parameter 2',
    rating: PRODUCER_RATING_UNSPECIFIED
  },
  {
    identifier: 3,
    type: 'Parameter 3',
    rating: 5
  },
  {
    identifier: 4,
    type: 'Parameter 4',
    rating: 4
  },
];

const tradeType: IProducerTradeType = {
  key: 1,
  value: 'Schreinerei',
}

const producer: IProducer = {
  alreadyProducedFurniture: 2,
  associatedProducts: 3,
  city: 'Hamburg',
  companyName: 'Produzent 01',
  contactPersonFullName: 'Produzent 01',
  currentOrders: 3,
  email: 'produzent01@gmx.de',
  status: EUserStatus.Active,
  note: 'Der Produzent ist besonders versiert im Bezug auf die Verarbeitung von Vollholz.',
  numberOfEmployees: 12,
  phoneNumber: '+49 040 258 94 56',
  producerRatings: ratings,
  street: 'Alter Teichweg 14',
  trade: tradeType,
  zipCode: '22307',
};

const breadcrumbLink: IBreadCrumbLink = {
  text: 'Produzenten',
  link: {
    routerLink: '/example-url-to-producers',
    title: 'Zur Produzentenübersicht'
  }
}

const breadcrumbs: IBreadcrumbs = {
  breadcrumbLinks: [breadcrumbLink],
  lastBreadcrumb: 'Produzent 01'
}


export interface IAdminProducerProfileViewData {
  localisations: IAdminProducerProfileViewLocalisation
  producer: IProducer,
  breadcrumbs: IBreadcrumbs,
  ratingMaxValue: number
}

export const adminProducerProfileViewData: IAdminProducerProfileViewData = {
  localisations,
  producer,
  breadcrumbs,
  ratingMaxValue: 5
};
