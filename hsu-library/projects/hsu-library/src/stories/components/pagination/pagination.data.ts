import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';

export interface IPaginationData {
  totalItems: number;
  totalText: string;
  currentPage:number;
  itemsPerPageOptions: PmDropdownOption<string>[];
  pagesShown: number;
  loading: boolean;
}

export const PaginationData: IPaginationData = {
  totalItems: 50,
  totalText: 'Gesamt',
  currentPage: 1,
  itemsPerPageOptions: [
    {
      key: '10',
      value: '10'
    },
    {
      key: '20',
      value: '20'
    },
    {
      key: '30',
      value: '30'
    },
    {
      key: '40',
      value: '40'
    }
  ],
  pagesShown: 3,
  loading: false
}
