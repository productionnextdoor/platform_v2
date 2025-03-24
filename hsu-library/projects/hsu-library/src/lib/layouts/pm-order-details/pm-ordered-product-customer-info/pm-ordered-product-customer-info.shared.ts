import { ICardProperty } from '../../../shared/info-card-section-data.shared';


export interface ICustomerInfoData {
  firstRow: ICardProperty[];
  secondRow: ICardProperty[];
  thirdRow: ICardProperty[];

}

export const defaultCustomerInfoData: ICustomerInfoData = {
  firstRow:
    [
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
    ],
  secondRow:
    [
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
    ],
  thirdRow:
    [
      {
        key: '',
        value: '',
      },
      {
        key: '',
        value: '',
      },
    ],

}

