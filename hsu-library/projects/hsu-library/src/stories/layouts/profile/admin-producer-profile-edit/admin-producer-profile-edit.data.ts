import {
  IAdminProducerProfileEditLabelLocalisation,
  IAdminProducerProfileEditLocalisation,
} from '../../../../lib/layouts/pm-profile/pm-admin-producer-profile-edit/pm-admin-producer-profile-edit.shared';
import {
  IProducer,
  IProducerRating,
  IProducerTradeType,
  PRODUCER_RATING_UNSPECIFIED,
} from '../../../../lib/layouts/pm-profile/producer.shared';
import { PmDropdownOption } from '../../../../lib/components/pm-dropdown/pm-dropdown.shared';
import { EUserStatus, IStatusesLocalisation } from '../../../../lib/layouts/pm-profile/general.shared';

export interface IAdminProducerProfileEditData {
  localisations: IAdminProducerProfileEditLocalisation;
  producer: IProducer
  producerRatingPlaceholder: string;
  producerRatingMaxValue: number;
  tradeDropdownOptions: PmDropdownOption<number>[]
  stateDropdownOptions: PmDropdownOption<EUserStatus>[]
  ratingDropdownOptions: PmDropdownOption<number>[]
}

const producerRatings: IProducerRating[] = [
  {
    identifier: 1,
    type: 'Soziales Engagement',
    rating: 3
  },
  {
    identifier: 1,
    type: 'Parameter 2',
    rating: PRODUCER_RATING_UNSPECIFIED,
  },
  {
    identifier: 1,
    type: 'Parameter 3',
    rating: 5
  },
  {
    identifier: 1,
    type: 'Parameter 4',
    rating: 4
  }
];

const selectedProducerTradeType: IProducerTradeType = {
  key: 2,
  value: 'Glaserei',
};

const labelLocalisations: IAdminProducerProfileEditLabelLocalisation = {
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
  street: 'Straße und Haus-Nr.',
  contactPersonFullName: 'Ansprechpartner im Unternehmen',
  note: 'Notiz',
}

const statusesLocalisations: IStatusesLocalisation = {
  active: 'Aktiv',
  inactive: 'Inaktiv',
  invited: 'Eingeladen',
}

const adminProducerProfileEditLocalisations: IAdminProducerProfileEditLocalisation = {
  popupTitle: 'Produzent bearbeiten',
  popupSubtitle: 'Angaben zum Unternehmen',
  rateUnit: 'Euro',
  labels: labelLocalisations,
  statuses: statusesLocalisations,
  parameterTitle: 'Wertkettenparameter',
  ratingTitleSeparation: ': ',
  ratingValueSeparator: '/',
  undefinedRating: 'Keine Angabe',
  notePlaceholder: 'Hier kannst du eine Notiz hinzufügen. Die Notiz ist für den Produzent nicht sichtbar.',
  inputErrorMessages: ['Erforderliches Feld']
}

const tradeTypes: IProducerTradeType[] = [
  {
    key: 1,
    value: 'Schreinerei',
  },
  {
    key: 2,
    value: 'Glaserei',
  },
  {
    key: 3,
    value: 'Metallbauer',
  }
]

const producer: IProducer = {
  companyName: 'Unternehmen XY',
  trade: selectedProducerTradeType,
  numberOfEmployees: 10,
  zipCode: '22043',
  city: 'Hamburg',
  rate: 100,
  email: 'felix.kuester@web.de',
  phoneNumber: '+49 040 258 94 56',
  isActive: true,
  street: 'Alter Teichweg 14',
  contactPersonFullName: 'Hans Meyer',
  note: 'Der Produzent ist besonders versiert im Bezug auf die Verarbeitung von Vollholz.',
  producerRatings: producerRatings,
  tradeTypes: tradeTypes
}

const tradeDropdownOptions: PmDropdownOption<number>[] = tradeTypes.map(type => ({
  key: type.key,
  value: type.value,
}));

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

const ratingDropdownOptions: PmDropdownOption<number>[] = [
  {
    key: PRODUCER_RATING_UNSPECIFIED,
    value: 'Keine Angabe',
  },
  {
    key: 1,
    value: '1',
  },
  {
    key: 2,
    value: '2',
  },
  {
    key: 3,
    value: '3',
  },
  {
    key: 4,
    value: '4',
  },
  {
    key: 5,
    value: '5',
  }
];

export const adminProducerProfileEditProfileData: IAdminProducerProfileEditData = {
  localisations: adminProducerProfileEditLocalisations,
  producer: producer,
  producerRatingMaxValue: 5,
  producerRatingPlaceholder: '~',
  tradeDropdownOptions: tradeDropdownOptions,
  stateDropdownOptions: stateDropdownOptions,
  ratingDropdownOptions: ratingDropdownOptions
};
