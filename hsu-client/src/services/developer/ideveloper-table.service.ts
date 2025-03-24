import { DeveloperOverviewOutput } from '../../shared/service-proxies/service-proxies';
import {
  Row,
  IColumnHeader,
  PmDropdownOption
} from 'hsu-library';

export abstract class IDeveloperTableService {
  public abstract getDeveloperOverviewColumnHeaders(): IColumnHeader[];
  public abstract getPaginationOptions(): PmDropdownOption<string>[];
  public abstract getDeveloperOverviewTableRow (developer: DeveloperOverviewOutput): Row;
}
