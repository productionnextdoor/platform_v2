import { ICardProperty } from '../../../../lib/shared/info-card-section-data.shared';


interface DeliveryDocumentsCard {
  title: string;
  fileList:ICardProperty[];
}

export const deliveryDocumentsData: DeliveryDocumentsCard = {
  title:'Delivery Documents',
  fileList: [
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
}
