import { IStatusesLocalisation, defaultStatusesLocalisation } from '../general.shared';

export interface IAdminProducerProfileViewLabelLocalisation {
  alreadyProducedFurniture: string;
  associatedProducts: string;
  city: string;
  companyName: string;
  currentOrders: string;
  email: string;
  note: string;
  numberOfEmployees: string;
  phoneNumber: string;
  street: string;
  tradeType: string;
  zipCode: string;
}

export interface IAdminProducerProfileViewLocalisation {
  companyInformationTitle: string,
  parameterTitle: string,
  productsAndServicesTitle: string,
  labels: IAdminProducerProfileViewLabelLocalisation,
  statuses: IStatusesLocalisation,
  ratingTitleSeparation: string,
}

export const defaultAdminProducerProfileLabelLocalisation: IAdminProducerProfileViewLabelLocalisation = {
  alreadyProducedFurniture: '',
  associatedProducts: '',
  city: '',
  companyName: '',
  currentOrders: '',
  email: '',
  note: '',
  numberOfEmployees: '',
  phoneNumber: '',
  street: '',
  tradeType: '',
  zipCode: '',
}

export const defaultAdminProducerProfileViewLocalisation: IAdminProducerProfileViewLocalisation = {
  companyInformationTitle: '',
  parameterTitle: '',
  productsAndServicesTitle: '',
  labels: defaultAdminProducerProfileLabelLocalisation,
  statuses: defaultStatusesLocalisation,
  ratingTitleSeparation: ''
}
