import { EUserStatus } from './general.shared';

export interface IProducerRating {
  identifier: number;
  rating: number;
  type: string;
}

export interface IProducerTradeType {
  key: number;
  value: string;
}

export interface IProducer {
  userId?: number;
  city?: string;
  companyName?: string;
  contactPersonFullName?: string;
  email?: string;
  numberOfEmployees?: number;
  phoneNumber?: string;
  street?: string;
  trade?: IProducerTradeType;
  zipCode?: string;
  producerRatings?: IProducerRating[];
  rate?: number;
  alreadyProducedFurniture?: number;
  associatedProducts?: number;
  currentOrders?: number;
  note?: string;
  isActive?: boolean;
  tradeTypes?: IProducerTradeType[];
  status?: EUserStatus;
  agbAndTerms?: boolean;
}

export const PRODUCER_RATING_UNSPECIFIED: number = 0;

export interface IRegistrationProducer extends IProducer {
  hourlyWage: number;
  password: string;
  repeatedPassword: string;
  verificationCode: string;
}
