import {
  IOrderOverviewLocalisation,
  IColumnHeader,
  PmDropdownOption,
} from 'hsu-library';
import { Observable } from 'rxjs';
import {
  IOrdersFilter,
  IOrderTableData
} from './orders-table.service';

export abstract class IOrderTableService {
  public abstract getColumnHeaders(): IColumnHeader[];
  public abstract getLocalisationStrings(): IOrderOverviewLocalisation;
  public abstract getTableRows(filter: IOrdersFilter): Observable<IOrderTableData>;
  public abstract getStatusOptions(): PmDropdownOption<string>[];
}
