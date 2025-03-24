import { IPmConfirmPopupLocalisations } from '../../../lib/layouts/pm-confirm-popup/pm-confirm-popup.shared';

export interface IPmConfirmPopupData {
  localisations: IPmConfirmPopupLocalisations;
}

export const confirmPopupData: IPmConfirmPopupData = {
  localisations: {
    title: 'Produkt einreichen',
    description:
      'Wenn du auf “Produkt einreichen” klickst, wird der Entwurf an den zuständigen Administrator weitergeleitet. ' +
      'Danach hast du vorerst keine Möglichkeit mehr die Details des Produktes zu bearbeiten. Möchtest du das ' +
      'Produkt wirklich einreichen?',
    confirm: 'Produkt einreichen',
    cancel: 'Abbrechen'
  }
};
