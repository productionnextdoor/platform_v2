import {
  IStatisticsDownload,
  IStatisticsLocalisationsSharedLocalisations
} from './statistics.shared';
import { ITab } from 'hsu-library';


export abstract class IStatisticsService {

  public abstract getFile(statisticData: IStatisticsDownload): void
  public abstract getStatisticsLocalisations(): IStatisticsLocalisationsSharedLocalisations
  public abstract getTabs(): ITab<number>[]

}
