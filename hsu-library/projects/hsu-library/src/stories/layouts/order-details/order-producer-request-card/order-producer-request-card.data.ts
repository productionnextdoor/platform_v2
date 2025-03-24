import {
  IOrderProdRequestData,
  IOrderProdRequestLocalisations
} from '../../../../lib/layouts/pm-order-details/pm-order-producer-request-card/pm-order-producer-request-card.shared';

export interface IOrderProducerRequestData {
  actionId: number;
  responseNeeded: boolean;
  badgeText: string;
  badgeNegative: boolean;
  localisations: IOrderProdRequestLocalisations;
  orderRequestData: IOrderProdRequestData;
}

export const orderProducerRequestCardData: IOrderProducerRequestData = {
  actionId: 1,
  responseNeeded: true,
  badgeText: 'Anfrage angenommen',
  badgeNegative: false,
  localisations: {
    context: 'Anfrage zum Arbeitsschritt: ',
    description: 'Wenn du den Auftrag zu dem hier aufgeführten Arbeitsschritt annehmen kannst, bestätige bitte die Anfrage. Sollte dir die Bearbeitung des Auftrags zur Zeit nicht möglich sein, klicke bitte auf „Auftrag ablehnen“.',
    rejectBtnLabel: 'Anfrage ablehnen',
    acceptBtnLabel: 'Anfrage annehmen',
    confirmPopup: {
      title: 'Auftrag annehmen',
      description: 'Wenn du den Auftrag annimmst, bestätigst du, diesen in der von dir genannten voraussichtlichen Auftragsbearbeitungszeit erledigen zu können. ' +
        'Der Auftrag wird dann als angenommen ausgewiesen und kann nur durch den Admin wieder zurückgesetzt werden.',
      confirm: 'Bestätigen',
      cancel: 'Abbrechen'
    }
  },
  orderRequestData: {
    startStateName: 'Rohmaterial Holz',
    endStateName: 'Zugeschnittene Platten',
    baseInfo: {
      title: 'Angaben zum angefragten Produkt',
      properties: [
        {
          key: 'Größe (H, B, T)',
          value: '120 cm, 100 cm, 80 cm'
        },
        {
          key: 'Material',
          value: 'Birke Multiplex, FSC-Zertifizierung'
        },
        {
          key: 'Auslieferung an den Kunden',
          value: 'KW 40'
        },
      ]
    },
    workTime: {
      title: 'Meine Arbeitszeit',
      properties: [
        {
          key: 'Voraussichtliche Auftragsbearbeitungszeit',
          value: '2,5 Wochen'
        },
        {
          key: 'Arbeitszeit in Stunden',
          value: '8,5 Stunden'
        },
        {
          key: 'Bearbeitung ab',
          value: 'KW 32'
        },
        {
          key: 'Bearbeitung bis',
          value: 'KW 35'
        },
      ]
    },
    income: {
      title: 'Mein Verdienst am Arbeitsschritt',
      properties: [
        {
          key: 'Arbeitskosten',
          value: '850,00 €'
        },
        {
          key: 'Material- & Transportkosten',
          value: '310,00 €'
        },
        {
          key: 'Gesamt-Verdienst',
          value: '1.110,00 €'
        },
      ]
    },
    calculation: {
      title: 'Meine Kalkulation für den Arbeitsschritt',
      properties: [
        {
          key: 'Arbeitskosten',
          value: '890,00 €'
        },
        {
          key: 'Material- & Transportkosten',
          value: '330,00 €'
        },
        {
          key: 'Gesamt-Verdienst',
          value: '1.200,00 €'
        },
      ]
    }
  },
}
