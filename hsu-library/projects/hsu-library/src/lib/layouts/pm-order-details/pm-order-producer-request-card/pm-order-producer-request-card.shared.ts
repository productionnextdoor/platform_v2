import {
  IPmConfirmPopupLocalisations,
  pmConfirmPopupLocalisations
} from '../../pm-confirm-popup/pm-confirm-popup.shared';
import { ICardSectionData } from '../../../shared/info-card-section-data.shared';

export interface IProducerOrderAction {
  stepId: number,
  accepted: boolean,
}



export interface IOrderProdRequestData {
  startStateName: string;
  endStateName: string;
  baseInfo: ICardSectionData;
  workTime: ICardSectionData;
  income: ICardSectionData;
  calculation: ICardSectionData;
}

export const defaultOrderProdRequestData: IOrderProdRequestData = {
  startStateName: '',
  endStateName: '',
  baseInfo: {
    title: '',
    properties: []
  },
  workTime: {
    title: '',
    properties: []
  },
  income: {
    title: '',
    properties: []
  },
  calculation: {
    title: '',
    properties: []
  }
}

export interface IOrderProdRequestLocalisations {
  context: string;
  description: string;
  acceptBtnLabel: string;
  rejectBtnLabel: string;
  confirmPopup: IPmConfirmPopupLocalisations;
}

export const orderProdRequestLocalisations: IOrderProdRequestLocalisations = {
  context: '',
  description: '',
  acceptBtnLabel: '',
  rejectBtnLabel: '',
  confirmPopup: pmConfirmPopupLocalisations
}
