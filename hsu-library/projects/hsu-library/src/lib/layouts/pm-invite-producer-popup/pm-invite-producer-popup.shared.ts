import { IProducerTradeType } from '../pm-profile/producer.shared';

export interface IInviteProducerPopupLocalisations {
  title: string;
  description: string;
  form: IInviteProducerPopupFormLocalisations;
  cancelButtonLabel: string;
  inviteButtonLabel: string;
  emailNotValidError: string;
}

export interface IInviteProducerPopupFormLocalisations {
  title: string;
  companyNameLabel: string;
  companyNamePlaceholder: string;
  tradeLabel: string;
  tradePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  contactPersonLabel: string;
  contactPersonPlaceholder: string;
}

export interface IProducerBaseData {
  companyName: string;
  trade: IProducerTradeType;
  email: string;
  contactPerson: string;
}

export const InviteProducerPopupLocalisations: IInviteProducerPopupLocalisations = {
  title: '',
  description: '',
  form: {
    title: '',
    companyNameLabel: '',
    companyNamePlaceholder: '',
    tradeLabel: '',
    tradePlaceholder: '',
    emailLabel: '',
    emailPlaceholder: '',
    contactPersonLabel: '',
    contactPersonPlaceholder: '',
  },
  cancelButtonLabel: '',
  inviteButtonLabel: '',
  emailNotValidError: '',
}

export class ProducerBaseData implements IProducerBaseData {
  companyName: string = '';
  trade: IProducerTradeType = {
    key: 0,
    value: '',
  };
  email: string = '';
  contactPerson: string = '';
}
