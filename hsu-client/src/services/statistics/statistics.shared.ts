import {
  IPmStatisticsCardLocalisations, IPMStatisticsData,
  pmStatisticsCardLocalisations
} from '../../../../hsu-library/dist/hsu-library';
import { StatisticsDataType } from '../../shared/service-proxies/service-proxies';


export interface IStatisticsLocalisationsSharedLocalisations {
  headerTitle: string;
  productStepsLocalisations: IPmStatisticsCardLocalisations;
  productValueChainsLocalisations: IPmStatisticsCardLocalisations;
  producerRequestLocalisations: IPmStatisticsCardLocalisations;

}

export const defaultStatisticsLocalisations: IStatisticsLocalisationsSharedLocalisations = {
  headerTitle: '',
  producerRequestLocalisations: pmStatisticsCardLocalisations,
  productStepsLocalisations: pmStatisticsCardLocalisations,
  productValueChainsLocalisations: pmStatisticsCardLocalisations
}

export interface IStatisticsDownload {
  filter: IPMStatisticsData;
  type: StatisticsDataType
}


