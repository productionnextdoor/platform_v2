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
import { IProductOverviewLocalisation } from '../../../lib/layouts/pm-product-overview/pm-product-overview.shared';

enum EProductState {
  Draft = 'Draft',
  InProcessDeveloper = 'In Process Developer',
  ReadyForValueChainPlanning = 'Ready For Value Chain Planning',
  InProcessProducer = 'In Process Producer',
  Live = 'Live',
  Locked = 'Locked',
  ValueChainExtension = 'Value Chain Extension'
}

interface ITableData {
  loading: boolean;
  totalItems: number;
  localisationStrings: IProductOverviewLocalisation;
  columnHeaders: IColumnHeader[];
  statusFilterOptions: PmDropdownOption<string>[];
  rowData: Row[];
}

export const TableData: ITableData = {
  loading: false,
  totalItems: 50,
  localisationStrings: {
    titleAdminOverview: 'Produktübersicht',
    totalText: 'Gesamt',
    buttonLabel: 'Produkt anlegen',
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
      columnIdentifier: 'creationTime',
      columnTitle: 'Erstelldatum',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'lastModificationTime',
      columnTitle: 'Letzte Änderung',
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
          text: 'Product 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.InProcessDeveloper,
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
          text: '8467546',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 02',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.Live,
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
          text: '7567445',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 03',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.InProcessProducer,
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
          text: '9768768',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 04',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.Draft,
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
          text: '4564565',
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
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.Draft,
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
          text: '3457435',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 06',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.Draft,
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
      isHighlighted: true,
      cells: [
        {
          text: '3454544',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 07',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.Draft,
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
          text: '3455443',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 08',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.Draft,
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
          text: '6545654',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Product 09',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: '01.04.2023',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProductState.Draft,
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
