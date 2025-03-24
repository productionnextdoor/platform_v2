import { ICardSectionData } from '../../../shared/info-card-section-data.shared';


export interface IOrderedProductData {
  productDetails: ICardSectionData;
  payouts: ICardSectionData;
  documents: ICardSectionData;

}

export const detailsDefaultData: IOrderedProductData = {
  productDetails: {
    title: '',
    properties: [
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
    ]
  },
  payouts: {
    title: '',
    properties: [
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '€',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },

    ]
  },
  documents: {
    title: '',
    properties: [
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
    ]
  },
}

