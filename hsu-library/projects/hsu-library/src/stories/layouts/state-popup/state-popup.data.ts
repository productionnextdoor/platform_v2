import { IPmStatePopupLocalisations } from '../../../lib/layouts/pm-state-popup/pm-state-popup.shared';

export interface IPmStatePopupData {
  localisations: IPmStatePopupLocalisations;
  countdown: number;
}

export const statePopupData: IPmStatePopupData = {
  localisations: {
    title: 'Neuen Zustand hinzufügen',
    description:
      'Bitte ergänze hier den neuen Zustand. Beachte, dass das Pop-up nach Ablauf des Timers automatisch geschlossen ' +
      'wird, ohne deine Angaben zu speichern.',
    state: 'Zustand',
    statePlaceholder: 'Neuen Zustand eingeben',
    confirm: 'Zustand hinzufügen',
    cancel: 'Abbrechen',
    delete: 'Zustand löschen'
  },
  countdown: 0 // Fixed time for Chromatic tests to ensure the countdown value never changes
};
