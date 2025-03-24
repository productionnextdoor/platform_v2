import { Row } from '../../../lib/components/pm-table/pm-table.shared';
import {
  ActionCell,
  StatusCell,
  TextCell
} from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';
import {
  EActionButtonElementType
} from '../../../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.shared';
import {
  TableHeaderType,
  TextColumnHeader
} from '../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';
import { IProducerOverviewLocalisation } from '../../../lib/layouts/pm-producer-overview/pm-producer-overview.shared';

enum EProducerState {
  Active = 'Active',
  Inactive = 'Inactive'
}

interface IProducerOverviewData {
  localisationStrings: IProducerOverviewLocalisation;
  loading: boolean;
  totalItems: number;
  itemsPerPageOptions: PmDropdownOption<string>[];
  columnHeaders: TextColumnHeader[];
  rowData: Row[];
}

export const ProducerOverviewData: IProducerOverviewData = {
  localisationStrings: {
    totalText: 'Gesamt',
    titleProducerOverview: 'Produzenten',
    searchBarLabel: 'Suche',
    searchBarPlaceholder: 'Gib einen Suchbegriff ein',
    inviteButtonLabel: 'Neuen Produzenten eintragen'
  },
  loading: false,
  totalItems: 32,
  itemsPerPageOptions: [
    {
      key: '10',
      value: '10'
    },
    {
      key: '20',
      value: '20'
    },
    {
      key: '30',
      value: '30'
    },
    {
      key: '40',
      value: '40'
    }
  ],
  columnHeaders: [
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'producerName',
      columnTitle: 'Name',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'craft',
      columnTitle: 'Gewerk',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'address',
      columnTitle: 'Anschrift',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'mail',
      columnTitle: 'E-Mail-Adresse',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'phone',
      columnTitle: 'Telefonnummer',
      sortable: false,
    },
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'state',
      columnTitle: 'Status',
      sortable: true,
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
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Alter Teichweg 220, 22049 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@web.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 258 94 56',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Active,
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
      rowId: 2,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Glaserei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Kiebitzweg 2, 22869 Schenefeld',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@gmx.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 257 12 25',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Active,
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
      rowId: 3,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Bornheide 92, 22549 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@googlemail.com',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 173 658 98 47',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Inactive,
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
      rowId: 4,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'August-Kirch-Straße 19, 22525 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@online.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 258 94 56',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Active,
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
      rowId: 5,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Alter Teichweg 220, 22049 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@web.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 178 56 56 99',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Active,
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
      rowId: 6,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Metallbauer',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Kiebitzweg 2, 22869 Schenefeld',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@gmx.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 258 94 56',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Active,
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
      rowId: 7,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Glaserei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Bornheide 92, 22549 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@googlemail.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 257 12 25',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Active,
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
      rowId: 8,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Metallbauer',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'August-Kirch-Straße 19, 22525 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@online.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 173 658 98 47',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Inactive,
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
      rowId: 9,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Alter Teichweg 220, 22049 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@googlemail.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 258 94 56',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Active,
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
      rowId: 10,
      isHighlighted: false,
      cells: [
        {
          text: 'Name d. Unternehmens',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Kiebitzweg 2, 22869 Schenefeld',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'unternehmen@web.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 178 56 56 99',
          type: 'TextCell'
        } as TextCell,
        {
          text: EProducerState.Active,
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
  ]
};
