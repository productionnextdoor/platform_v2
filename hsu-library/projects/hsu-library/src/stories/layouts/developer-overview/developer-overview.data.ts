import { Row } from '../../../lib/components/pm-table/pm-table.shared';
import {
  ActionCell, StatusCell, TextCell
} from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';
import {
  EActionButtonElementType
} from '../../../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.shared';
import {
  TableHeaderType,
  TextColumnHeader
} from '../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import {
  IDeveloperOverviewLocalisation
} from '../../../lib/layouts/pm-developer-overview/pm-developer-overview.shared';
import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';

enum EDeveloperState {
  Active = 'Active',
  Inactive = 'Inactive'
}


interface IDeveloperOverviewData {
  localisationStrings: IDeveloperOverviewLocalisation;
  loading: boolean;
  totalItems: number;
  itemsPerPageOptions: PmDropdownOption<string>[];
  columnHeaders: TextColumnHeader[];
  rowData: Row[];
}

export const DeveloperOverviewData: IDeveloperOverviewData = {
  localisationStrings: {
    totalText: 'Gesamt',
    titleDeveloperOverview: 'Entwickler',
    searchBarLabel: 'Suche',
    searchBarPlaceholder: 'Gib einen Suchbegriff ein',
    buttonLabel: 'Neuen Entwickler eintragen',
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
      columnIdentifier: 'developerName',
      columnTitle: 'Name',
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
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'products',
      columnTitle: 'Anzahl Produkte',
      sortable: false,
    } as TextColumnHeader,
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
          text: 'Felix Küster',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Fasanenstrasse 58, 22043 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'felix.kuester@web.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 258 94 56',
          type: 'TextCell'
        } as TextCell,
        {
          text: '2',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Active,
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
          text: 'Mike Nagel',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Boxhagener Str. 97, 22145 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'm.nagel@gmx.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 257 12 25',
          type: 'TextCell'
        } as TextCell,
        {
          text: '1',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Active,
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
          text: 'Melanie Farber',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Waßmannsdorfer Chaussee 18, 22761 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'melanie.farber@googlemail.com',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 173 658 98 47',
          type: 'TextCell'
        } as TextCell,
        {
          text: '-',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Inactive,
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
          text: 'Steffen Lowe',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Los-Angeles-Platz 43, 22041 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'slowe@online.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 258 94 56',
          type: 'TextCell'
        } as TextCell,
        {
          text: '3',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Active,
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
          text: 'Barbara Ackermann',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Grolmanstraße 81, 22339 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'barbara.ackermann@web.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 178 56 56 99',
          type: 'TextCell'
        } as TextCell,
        {
          text: '1',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Active,
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
          text: 'Felix Küster',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Fasanenstrasse 58, 22043 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'felix.kuester@web.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 258 94 56',
          type: 'TextCell'
        } as TextCell,
        {
          text: '2',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Active,
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
          text: 'Mike Nagel',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Boxhagener Str. 97, 22145 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'm.nagel@gmx.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 257 12 25',
          type: 'TextCell'
        } as TextCell,
        {
          text: '1',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Active,
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
          text: 'Melanie Farber',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Waßmannsdorfer Chaussee 18, 22761 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'melanie.farber@googlemail.com',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 173 658 98 47',
          type: 'TextCell'
        } as TextCell,
        {
          text: '-',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Inactive,
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
          text: 'Steffen Lowe',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Los-Angeles-Platz 43, 22041 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'slowe@online.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 040 258 94 56',
          type: 'TextCell'
        } as TextCell,
        {
          text: '3',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Active,
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
          text: 'Barbara Ackermann',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Grolmanstraße 81, 22339 Hamburg',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'barbara.ackermann@web.de',
          type: 'TextCell'
        } as TextCell,
        {
          text: '+49 178 56 56 99',
          type: 'TextCell'
        } as TextCell,
        {
          text: '1',
          type: 'TextCell'
        } as TextCell,
        {
          text: EDeveloperState.Active,
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

