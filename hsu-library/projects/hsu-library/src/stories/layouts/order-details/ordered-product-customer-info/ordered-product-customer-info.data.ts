import {
  ICustomerInfoData
} from '../../../../lib/layouts/pm-order-details/pm-ordered-product-customer-info/pm-ordered-product-customer-info.shared';


interface CustomerInfoCard {
  title: string;
  customerData:ICustomerInfoData;
}

export const customerInfoCard: CustomerInfoCard = {
  title:'Details zum Kunden',
  customerData: {
    firstRow: [
      {
        key: 'Name',
        value:'Nadine Bader'
      },
      {
        key: 'Telefon',
        value:'+49 07144 11 32 69'
      },
    ],
    secondRow: [
      {
        key: 'E-Mail',
        value:'nadineBader@cuvox.de'
      },
      {
        key: 'Straße',
        value:'Kurfürstenstraße 72'
      },
    ],
    thirdRow: [
      {
        key: 'PLZ',
        value:'74385'
      },
      {
        key: 'Ort',
        value:'Pleidelsheim'
      },
    ]
  }
}
