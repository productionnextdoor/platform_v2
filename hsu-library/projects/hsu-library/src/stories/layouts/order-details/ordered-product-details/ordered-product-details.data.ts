import {
  IOrderedProductData
} from '../../../../lib/layouts/pm-order-details/pm-ordered-product-details/pm-ordered-product-details.shared';

interface OrderedProductDetailsCard {
  title: string;
  detailData:IOrderedProductData;
}

export const orderedProductDetailsCardDara: OrderedProductDetailsCard = {
  title:'Details zum beauftragten Produkt',
  detailData: {
    productDetails: {
      title: 'Angaben zum Produkt',
      properties: [
        {
          key: 'Auftragsnummer',
          value: 'AB-1234571',
        },
        {
          key: 'Größe (H, B, T)',
          value: '120 cm, 100 cm, 80 cm',
        },
        {
          key: 'Material (Holz)',
          value: 'Birke Multiplex',
        },
        {
          key: 'Material (Glas):',
          value: 'Einscheiben-Sicherheits-Glas',
        },
        {
          key: 'Nettopreis für den Kunden',
          value: '2.320,00 €',
        },
      ]
    },
    payouts: {
      title: 'Auszahlung (Netto)',
      properties: [
        {
          key: 'Produzent 01',
          value: '300,00 €',
        },
        {
          key: 'Produzent 02',
          value: '300,00 €',
        },
        {
          key: 'Produzent 03',
          value: '300,00 €',
        },
        {
          key: 'Produzent 04',
          value: '300,00 €',
        },
        {
          key: 'Produzent 05',
          value: '300,00 €',
        },
        {
          key: 'Produzent 06',
          value: '300,00 €',
        },
        {
          key: 'Produzent 07',
          value: '300,00 €',
        },
        {
          key: 'Anteil Plattform',
          value: ' 150,00 € ',
        },

      ]
    },
    documents: {
      title: 'Dokumente',
      properties: [
        {
          key: '',
          value: ' installationAndUsage-InstructionsinstallationAndUsageInstructions.exl',
        },
        {
          key: '',
          value: 'Angaben Produkt.pdf',
        },
        {
          key: '',
          value: 'Angaben Produkt.jpg',
        },
      ]
    },
  }
}
