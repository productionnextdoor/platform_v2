import { IPmConfirmPopupLocalisations } from '../../layouts/pm-confirm-popup/pm-confirm-popup.shared';

export type OnErrorFn = () => void;

export interface IPmWizardLocalisations {
  cancel: string;
  draft: string;
  save: string;
  prevStep: string;
  nextStep: string;
  cancelConfirmationTitle: string;
  cancelConfirmationDescription: string;
  confirm: string;
  saveAsAdmin: string;
  confirmPopup: IPmConfirmPopupLocalisations;
}

export interface IPmWizardStepData {
  step: number;
  isForwardNavigation: boolean;
}

export const wizardLocalisations: IPmWizardLocalisations = {
  cancel: '',
  draft: '',
  save: '',
  prevStep: '',
  nextStep: '',
  cancelConfirmationTitle: '',
  cancelConfirmationDescription: '',
  confirm: '',
  saveAsAdmin: '',
  confirmPopup: {
    title: '',
    description: '',
    confirm: '',
    cancel: ''
  }
}
