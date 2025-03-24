import { IPmMaxCostPopupLocalisations } from '../../../lib/layouts/pm-max-cost-popup/pm-max-cost-popup.shared';

export interface IPmMaxCostPopupData {
  localisations: IPmMaxCostPopupLocalisations;
}

export const maxCostPopupData: IPmMaxCostPopupData = {
  localisations: {
    title: 'Maximalkosten eintragen',
    description: 'Bitte tragen Sie die maximalen Kosten für dieses Produkt ein.',
    inputLabel: 'Maximalkosten',
    unit: 'Euro (Netto)',
    placeholder:'Maximalkosten',
    confirm: 'Optionen berechnen',
    cancel: 'Abbrechen'
  }
};
