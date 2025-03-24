import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';
import { Row } from '../../../lib/components/pm-table/pm-table.shared';
import {
  ActionCell, StatusCell, TextCell
} from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';
import { EActionButtonElementType } from '../../../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.shared';
import {
  IColumnHeader, TableHeaderType, TextColumnHeader
} from '../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import { IOrderOverviewLocalisation } from '../../../lib/layouts/pm-orders-overview/pm-orders-overview.shared';

enum EOrderStatus {
  Open = 'Open',
  Commissioned = 'Commissioned',
  InProgress = 'In progress',
  Completed = 'Completed',
  NotDone = 'Not done',
  Cancelled = 'Cancelled',
}

interface ITableData {
  loading: boolean;
  totalItems: number;
  localisationStrings: IOrderOverviewLocalisation;
  columnHeaders: IColumnHeader[];
  statusFilterOptions: PmDropdownOption<string>[];
  rowData: Row[];
}

export const TableData: ITableData = {
  loading: false,
  totalItems: 50,
  localisationStrings: {
    titleOrderOverview: 'Auftragsübersicht',
    totalText: 'Gesamt',
    searchBarTexts: {
      label: 'Suche',
      placeholder: 'Gib einen Suchbegriff ein'
    },
    stateFilterTexts: {
      label: 'Filtern nach',
      placeholder: 'Zustand auswählen',
    },
  },
  statusFilterOptions: [
    {
      key: '1',
      value: 'Option 1'
    },
    {
      key: '2',
      value: 'Option 2'
    },
    {
      key: '3',
      value: 'Option 3'
    },
    {
      key: '4',
      value: 'Option 4'
    },
    {
      key: '5',
      value: 'Option 5'
    },
    {
      key: '6',
      value: 'Option 6'
    },
    {
      key: '7',
      value: 'Option 7'
    },
    {
      key: '8',
      value: 'Option 8'
    },
    {
      key: '9',
      value: 'Option 9'
    },
    {
      key: '10',
      value: 'Option 10'
    }
  ],
  columnHeaders: [
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'orderNumber',
      columnTitle: 'Auftragsnummer',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'productNumber',
      columnTitle: 'Produktnummer',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'productName',
      columnTitle: 'Produktname',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'orderTime',
      columnTitle: 'Bestelldatum',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'orderStatus',
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
  rowData: [
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: '13213321',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 1',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EOrderStatus.Open,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: '13213321',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 1',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EOrderStatus.Open,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: '13213321',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 1',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EOrderStatus.Open,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: '13213321',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 1',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EOrderStatus.Open,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: '13213321',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 1',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EOrderStatus.Open,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: '13213321',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 1',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EOrderStatus.Open,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: '13213321',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 1',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EOrderStatus.Open,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          text: '13215313',
          type: 'TextCell'
        } as TextCell,
        {
          text: '13213321',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 1',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EOrderStatus.Open,
          type: 'StatusCell'
        } as StatusCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell
      ]
    },
  ],
};
