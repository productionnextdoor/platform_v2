import {
  Row,
  IValueChainCardLocalisations,
  valueChainCardLocalisation,
  ValueChainStatusValues,
  IPmConfirmPopupLocalisations,
  pmConfirmPopupLocalisations
} from 'hsu-library';

export interface IValueChainData {
  index: number,
  requestDate: string,
  status: ValueChainStatusValues
  rowData: Row[]
}

export interface IOrderDetailsAdminLocalisation {
  cancelButtonLabel: string;
  valueChainCardLocalisation: IValueChainCardLocalisations,
  cancelPopupLocalisations: IPmConfirmPopupLocalisations
}

export const orderDetailsAdminLocalisation: IOrderDetailsAdminLocalisation = {
  cancelButtonLabel: '',
  valueChainCardLocalisation: valueChainCardLocalisation,
  cancelPopupLocalisations: pmConfirmPopupLocalisations
}

export const topValueChainStatuses: ValueChainStatusValues[] = [
  'selected',
  'commissioned',
  'inProgress',
  'completed',
];
