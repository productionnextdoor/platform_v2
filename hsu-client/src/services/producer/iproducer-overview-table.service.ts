import {
  PmDropdownOption,
  IColumnHeader,
  Row
} from 'hsu-library';
import { ProducerOverviewOutput } from '../../shared/service-proxies/service-proxies';

export abstract class IProducerOverviewTableService {
  public abstract getPaginationOptions(): PmDropdownOption<string>[];
  public abstract getProducerOverviewColumnHeaders(showDetailsColumn: boolean): IColumnHeader[];
  public abstract getProducerOverviewTableRow (showDetailsColumn: boolean, producer: ProducerOverviewOutput): Row;
}
