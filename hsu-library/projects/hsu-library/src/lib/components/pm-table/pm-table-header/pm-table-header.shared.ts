export interface IColumnHeader {
  type: TableHeaderType;
  columnIdentifier: string;
}

export abstract class TextColumnHeader implements IColumnHeader {
  type: TableHeaderType = TableHeaderType.Text;
  abstract columnIdentifier: string;
  abstract columnTitle: string;
  abstract sortable: boolean;
}

export abstract class CheckboxColumnHeader implements IColumnHeader {
  type: TableHeaderType = TableHeaderType.Checkbox;
  abstract columnIdentifier: string;
}

export enum ESortOrder {
  None = '',
  Ascending = 'ASC',
  Descending = 'DESC'
}

export interface IColumnSortEvent {
  columnIdentifier: string,
  sortOrder: ESortOrder
}

export enum TableHeaderType {
  Text = 'TextColumn',
  Checkbox = 'CheckboxColumn'
}
