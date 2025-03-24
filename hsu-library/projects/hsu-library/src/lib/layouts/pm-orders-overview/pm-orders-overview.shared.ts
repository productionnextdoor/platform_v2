import { IToolBarElementText } from '../../shared/toolBarElementText.shared';

export interface IOrderOverviewLocalisation {
  totalText: string;
  titleOrderOverview: string;
  searchBarTexts: IToolBarElementText;
  stateFilterTexts: IToolBarElementText;
}

export const pmOrderOverviewLocalisation: IOrderOverviewLocalisation = {
  totalText: '',
  titleOrderOverview: '',
  searchBarTexts: {
    label: '',
    placeholder: '',
  },
  stateFilterTexts:  {
    label: '',
    placeholder: '',
  },
};
