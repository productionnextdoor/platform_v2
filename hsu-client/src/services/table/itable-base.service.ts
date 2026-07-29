import {
  ActionCell,
  CheckboxCell,
  StatusCell,
  TextCell,
  EActionButtonElementType,
  CheckboxColumnHeader,
  TextColumnHeader,
  Icon,
  PmCheckboxState,
  ERatingType,
  RatingCell
} from 'hsu-library';

export abstract class ITableBaseService {
  public abstract createTextCell (text: string): TextCell;
  public abstract createActionCell (icon: Icon, link: string, type: EActionButtonElementType, disabled?: boolean): ActionCell;
  public abstract createCheckboxCell(value: PmCheckboxState, disabled: boolean): CheckboxCell;
  public abstract createStatusCell (text: string): StatusCell;
  public abstract createRatingCell(rating: number, starType: ERatingType): RatingCell
  public abstract createTextColumnHeader (columnIdentifier: string, columnTitle: string, sortable: boolean ): TextColumnHeader;
  public abstract createCheckboxColumnHeader (columnIdentifier: string,): CheckboxColumnHeader;
  public abstract mapAddress(street?: string, zipCode?: string, city?: string): string
}
