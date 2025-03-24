import { Row } from '../../../lib/components/pm-table/pm-table.shared';
import {
  CheckboxColumnHeader, IColumnHeader, TableHeaderType, TextColumnHeader
} from '../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import {
  ActionCell, CheckboxCell, StatusCell, ERatingType, TextCell, RatingCell
} from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';
import { EActionButtonElementType } from '../../../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.shared';
import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';

interface ITableData {
  columnHeaders: IColumnHeader[];
  loading: boolean;
  rows: Row[];
}

enum StatusCellType {
  Draft = 'Draft',
  InProcessDeveloper = 'In process developer',
  ReadyForValueChainPlanning = 'Ready for value chain planning',
  InProcessProducer = 'In process producer',
  Live = 'Live',
  Locked = 'Locked',
  ValueChainExtension = 'Value chain extension'
}

export const TableData: ITableData = {
  loading: false,
  columnHeaders: [
    {
      type: TableHeaderType.Checkbox,
      columnIdentifier: 'checkbox',
      checkboxState: PmCheckboxState.MULTISELECT
    } as CheckboxColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'productNumber',
      columnTitle: 'Produktnummer',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'name',
      columnTitle: 'Produktname',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'createdAt',
      columnTitle: 'Erstelldatum',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'updatedAt',
      columnTitle: '⌀ Soziales Engagement',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'state',
      columnTitle: 'Status',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'details',
      columnTitle: 'Details',
      sortable: false,
    } as TextColumnHeader
  ],
  rows: [
    {
      rowId: 1,
      isHighlighted: true,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell'
        } as CheckboxCell,
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '4,5/5,0',
          ratingType: ERatingType.BEST,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: StatusCellType.Draft,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            }
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 2,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell'
        } as CheckboxCell,
        {
          text: '76435434',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 02',
          type: 'TextCell'
        } as TextCell,
        {
          text: '05.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '4,0/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: StatusCellType.InProcessDeveloper,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            }
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 3,
      isSelected: true,
      cells: [
        {
          value: PmCheckboxState.ACTIVE,
          type: 'CheckboxCell'
        } as CheckboxCell,
        {
          text: '86123444',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 03',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.06.2022',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '2,5/5,0',
          ratingType: ERatingType.WORST,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: StatusCellType.Locked,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            }
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 4,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell'
        } as CheckboxCell,
        {
          text: '12325553',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 04',
          type: 'TextCell'
        } as TextCell,
        {
          text: '12.03.2023',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '3,8/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: StatusCellType.ReadyForValueChainPlanning,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            }
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 5,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell'
        } as CheckboxCell,
        {
          text: '745634434',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 05',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '4,2/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: StatusCellType.InProcessProducer,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            }
          ]
        } as ActionCell
      ]
    },
  ],
};
