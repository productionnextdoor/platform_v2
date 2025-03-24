import {
  IWorkStepData,
  IWorkStepPopupLocalisations
} from '../../../lib/layouts/pm-work-step-popup/pm-work-step-popup.shared';

export interface IWorkStepPopupData {
  localisations: IWorkStepPopupLocalisations;
  workStepData: IWorkStepData;
}

export const workStepPopupData: IWorkStepPopupData = {
  localisations: {
    context: 'Details: ',
    title: 'Rohmaterial Holz - Zugeschnittene Platten',
    buttonLabel: 'Zurück zur Übersicht',
  },
  workStepData: {
    producer: {
      title: 'Produzent',
      properties: [
        {
          key: 'Name d. Produzenten',
          value: 'Produzent 01'
        },
        {
          key: 'Gewerk',
          value: 'Schreinerei'
        },
      ]
    },
    workTime: {
      title: 'Arbeitszeit',
      properties: [
        {
          key: 'Voraussichtliche Auftragsbearbeitungszeit',
          value: '2,5 Wochen'
        },
        {
          key: 'Arbeitszeit in Stunden',
          value: '8,5 Stunden'
        },
      ]
    },
    workStep: {
      title: 'Arbeitsschritt',
      properties: [
        {
          key: 'Startzustand',
          value: 'Rohmaterial Holz'
        },
        {
          key: 'Endzustand',
          value: 'Zugeschnittene Platten'
        },
      ]
    },
    calculation: {
      title: 'Kalkulation (Produktstandard)',
      properties: [
        {
          key: 'Arbeitskosten',
          value: '890,00 €'
        },
        {
          key: 'Material- & Transportkosten',
          value: '330,00 €'
        },
      ]
    }
  },
}
