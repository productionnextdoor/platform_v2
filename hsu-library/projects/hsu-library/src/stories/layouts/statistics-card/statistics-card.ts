import { IPmStatisticsCardLocalisations } from '../../../lib/layouts/pm-statistics-card/pm-statistics-card.shared';


interface IStatisticsCardData {
  localisations: IPmStatisticsCardLocalisations;

}

export const statisticsCard: IStatisticsCardData = {
  localisations: {
    title:'Statistics Card example',
    filterInput: {
      label: 'Product number',
      placeholder: 'Product number',
    },
    dateTo: {
      label: 'Date to',
      placeholder: 'Date to',
    },
    dateFrom: {
      label: 'Date from',
      placeholder: 'Date from'
    },
    buttonLabel: 'Download CSV'
  }

}

