import {
  IColumnHeader,
  Row,
  IProductOverviewLocalisation,
  PmDropdownOption,
  EActionButtonElementType,
  Icon
} from 'hsu-library';
import {
  ProductListDto,
  ProductState,
} from '../../../shared/service-proxies/service-proxies';
import {
  EWizardType
} from './product-table-base.service';

export abstract class IProductTableService {
  public abstract getColumnHeaders(): IColumnHeader[];
  public abstract getLocalisationStrings(): IProductOverviewLocalisation;
  public abstract getStateOptions(): PmDropdownOption<string>[];
  public abstract getTableRow(item: ProductListDto): Row;
  public abstract getWizardType(): EWizardType;
  protected abstract getActionIcon(productState: ProductState): Icon;
  protected abstract getActionType(productState: ProductState): EActionButtonElementType;
}

