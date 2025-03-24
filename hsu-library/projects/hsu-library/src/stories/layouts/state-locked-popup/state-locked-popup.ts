import {
  IPmStateLockedPopupLocalisations
} from '../../../lib/layouts/pm-state-locked-popup/pm-state-locked-popup.shared';

export interface IPmStateLockPopupData {
  localisations: IPmStateLockedPopupLocalisations;
}

export const stateLockedPopup: IPmStateLockPopupData = {
  localisations: {
    title: 'Zustand gesperrt',
    description:
      'An dieser Position wird gerade ein weitere Zustand von einem anderen Nutzer hinzugefügt. Bitte versuche es in einigen Minuten noch einmal.',
    confirm: 'OK',
  }
};
