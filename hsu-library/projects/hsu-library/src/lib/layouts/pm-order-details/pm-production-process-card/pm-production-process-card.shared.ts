import { IPmConfirmPopupLocalisations } from '../../pm-confirm-popup/pm-confirm-popup.shared';

export interface IProductionProcessCardLocalisations {
  title: string;
  startButton: string;
  finishButton: string;
  completeOrderButton: string;
  description: string;
  confirmPopupStart: IPmConfirmPopupLocalisations
  confirmPopupFinish: IPmConfirmPopupLocalisations
  completeOrderPopup: IPmConfirmPopupLocalisations
}

export interface IDeliveryDocument {
  index: number;
  name: string;
}

export const productionProcessCardLocalisations: IProductionProcessCardLocalisations = {
  title: '',
  startButton: '',
  finishButton: '',
  completeOrderButton: '',
  description: '',
  confirmPopupStart: {
    title: '',
    description: '',
    confirm: '',
    cancel: ''
  },
  confirmPopupFinish: {
    title: '',
    description: '',
    confirm: '',
    cancel: ''
  },
  completeOrderPopup: {
    title: '',
    description: '',
    confirm: '',
    cancel: ''
  }
}
