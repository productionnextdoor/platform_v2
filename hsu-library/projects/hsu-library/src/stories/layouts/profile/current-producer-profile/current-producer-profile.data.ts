import {
  IProducerProfileFormLabelLocalisation,
  IProducerProfileLocalisation,
} from '../../../../lib/layouts/pm-profile/pm-current-producer-profile/pm-current-producer-profile.shared';
import {
  IProducer,
  IProducerRating,
  IProducerTradeType,
  PRODUCER_RATING_UNSPECIFIED,
} from '../../../../lib/layouts/pm-profile/producer.shared';
import { EUserStatus, IStatusesLocalisation } from '../../../../lib/layouts/pm-profile/general.shared';

export interface IProducerProfile {
  localisations: IProducerProfileLocalisation;
  producer: IProducer
  producerRatingMaxValue: number;
}

const labelLocalisations: IProducerProfileFormLabelLocalisation= {
  companyName: 'Name d. Unternehmens',
  tradeType: 'Gewerk',
  email: 'E-Mail-Adresse',
  numberOfEmployees: 'Anzahl Mitarbeiter',
  phoneNumber: 'Telefon-Nr.',
  zipCode: 'PLZ',
  city: 'Ort',
  state: 'Status',
  save: 'Speichern',
  cancel: 'Abbrechen',
  rate: 'Stundenlohn',
  street: 'Straße und Haus Nr.',
  contactPersonFullName: 'Ansprechpartner'
}

const statusLocalisation: IStatusesLocalisation = {
  active: 'Aktiv',
  inactive: 'Inaktiv',
  invited: 'Eingeladen'
}

const localisations: IProducerProfileLocalisation = {
  popupTitle: 'Mein Profil',
  popupSubtitle: 'Angaben zum Unternehmen',
  rateUnit: 'Euro',
  labels: labelLocalisations,
  statuses: statusLocalisation,
  parameterTitle: 'Wertkettenparameter',
  ratingTitleSeparation: ': ',
  inputErrorMessages: ['Erforderliches Feld']
}

const ratings: IProducerRating[] = [
  {
    identifier: 1,
    type: 'Soziales Engagement',
    rating: 3
  },
  {
    identifier: 2,
    type: 'Parameter 2',
    rating: PRODUCER_RATING_UNSPECIFIED,
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
  }
]

const currentProducerTradeType: IProducerTradeType = {
  key: 3,
  value: 'Schreinerei',
}

const producer: IProducer = {
  companyName: 'Unternehmen XY',
  trade: currentProducerTradeType,
  numberOfEmployees: 10,
  zipCode: '22043',
  city: 'Hamburg',
  rate: 100,
  isActive: false,
  email: 'felix.kuester@web.de',
  phoneNumber: '+49 040 258 94 56',
  status: EUserStatus.Active,
  street: 'Alter Teichweg 14',
  contactPersonFullName: 'Hans Meyer',
  producerRatings: ratings
}

export const currentProducerProfileData: IProducerProfile = {
  localisations: localisations,
  producer: producer,
  producerRatingMaxValue: 5,
};
