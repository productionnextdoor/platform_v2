import { IToolBarElementText } from '../../shared/toolBarElementText.shared';

export interface IPMStatisticsData{
  filter: string;
  dateFrom: string;
  dateTo: string;
}

export interface IPmStatisticsCardLocalisations {
  title: string;
  filterInput: IToolBarElementText;
  dateFrom: IToolBarElementText;
  dateTo: IToolBarElementText;
  buttonLabel: string;
}

export const pmStatisticsCardLocalisations: IPmStatisticsCardLocalisations = {
  title: '',
  filterInput: {
    label:'',
    placeholder:''
  },
  dateFrom: {
    label:'',
    placeholder:''
  },
  dateTo: {
    label:'',
    placeholder:''
  },
  buttonLabel:''
};
