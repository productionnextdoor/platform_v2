import {
  IPmFinalProductStepPopupLocalisations
} from '../../../lib/layouts/pm-final-product-step-popup/pm-final-product-step-popup.shared';

export interface IPmStateLockPopupData {
  localisations: IPmFinalProductStepPopupLocalisations;
}

export const finalProductStepPopup: IPmStateLockPopupData = {
  localisations: {
    title: 'Bearbeitung des Arbeitsschritts',
    description:
      'Im ausgewählten Arbeitsschritt wird der Finalzustand einer Rohmaterialgruppe übersprungen, du möchtest also ' +
      'auch die Endmontage des Produktes übernehmen. Wenn das der Fall ist, klick bitte auf “Mit der Bearbeitung ' +
      'fortfahren”. Wenn du auch bereit wärst, nur Teilschritte aus dem von dir gewählten Prozess zu übernehmen, so ' +
      'trag diese bitte separat ein. Du kannst dies jetzt gleich tun, indem du auf “Abbrechen” klickst und die ' +
      'Teilschritte auswählst, oder du kannst zunächst hier “Mit der Bearbeitung fortfahren” und nach Abschluss des ' +
      'aktuell gewählten Schrittes zusätzlich die Teilschritte ergänzen.',
    cancel: 'Abbrechen',
    confirm: 'Mit der Bearbeitung fortfahren',
  }
};
