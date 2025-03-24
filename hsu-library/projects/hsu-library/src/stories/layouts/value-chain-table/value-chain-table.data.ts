import { IValueChainTableLocalisation } from '../../../lib/layouts/pm-value-chain-table/pm-value-chain-table.shared';
import {
  CheckboxColumnHeader,
  IColumnHeader,
  TableHeaderType,
  TextColumnHeader
} from '../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../../lib/components/pm-table/pm-table.shared';
import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';
import {
  ActionCell,
  CheckboxCell,
  ERatingType,
  ICell,
  RatingCell,
  TextCell
} from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';
import {
  ActionButtonType,
  EActionButtonElementType
} from '../../../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.shared';

interface IValueChainTableData {
  localisations: IValueChainTableLocalisation;
  lastCalculationDate: string;
  loading: boolean;
  columnHeaders: IColumnHeader[];
  rowData: Row[];
  totalItems: number;
  currentPage: number;
  itemsPerPageOptions: PmDropdownOption<string>[];
}

export const defaultValueChainTableDataIValueChainTableData: IValueChainTableData = {
  localisations: {
    cardTitle: 'Errechnete Wertketten-Optionen',
    description: 'Hier werden alle Optionen aufgeführt, die für die Herstellung des Produkts errechnet wurden. Zudem ' +
      'wird die durchschnittliche Bewertung für die jeweils berechnete Option mit aufgeführt. Errechnete Wertketten werden ' +
      'ab einem durchschnittlichen Parameter-Wert von 2,0 aktiv gesetzt. Dies kann manuell angepasst werden.',
    paginationTotalText: 'Gesamt',
    datepickerTitle: 'Datum der letzten Berechnung',
  },
  lastCalculationDate: '12.08.2024',
  loading: false,
  columnHeaders: [
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'requestedProducers',
      columnTitle: 'Beteiligte Produzenten',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'socialEngagement',
      columnTitle: 'Soziales Engagement',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'parameter2',
      columnTitle: 'Parameter 2',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'parameter3',
      columnTitle: 'Parameter 3',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'parameter4',
      columnTitle: 'Parameter 4',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'costs',
      columnTitle: 'Kosten',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'runningTime',
      columnTitle: 'Durchlaufzeit',
      sortable: true,
    } as TextColumnHeader,
  ],
  rowData: [],
  totalItems: 10,
  currentPage: 1,
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
  ]
}

const commonRowCells: ICell[] = [
    {
      ratingScore: '4,5/5,0',
      ratingType: ERatingType.BEST,
      type: 'RatingCell'
    } as RatingCell,
    {
      ratingScore: '1,5/5,0',
      ratingType: ERatingType.DEFAULT,
      type: 'RatingCell'
    } as RatingCell,
    {
      ratingScore: '4,5/5,0',
      ratingType: ERatingType.BEST,
      type: 'RatingCell'
    } as RatingCell,
    {
      ratingScore: '1,5/5,0',
      ratingType: ERatingType.DEFAULT,
      type: 'RatingCell'
    } as RatingCell,
    {
      text: '3.200 €',
      type: 'TextCell'
    } as TextCell,
    {
      text: '12 Wochen',
      type: 'TextCell'
    } as TextCell
];


export const ValueChainTableData: IValueChainTableData = {
  ...defaultValueChainTableDataIValueChainTableData,
  columnHeaders: [
    {
      type: TableHeaderType.Checkbox,
      columnIdentifier: 'isActive',
      checkboxState: PmCheckboxState.DEFAULT
    } as CheckboxColumnHeader,
    ...defaultValueChainTableDataIValueChainTableData.columnHeaders
  ],
  rowData: [
    {
      rowId: 0,
      isHighlighted: true,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.DEFAULT,
        } as CheckboxCell,
        {
          text: 'Produzent 1',
          type: 'TextCell'
        } as TextCell,
        ...commonRowCells
      ]
    },
    ...Array.from(
      {
        length: 10
      }).map((_, index) => ({
      rowId: index,
      isHighlighted: false,
      isSelected: false,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: `Produzent ${index + 1}`,
          type: 'TextCell'
        } as TextCell,
        ...commonRowCells
      ],
    }))]

}

export const DevelopersValueChainTableData: IValueChainTableData = {
  ...defaultValueChainTableDataIValueChainTableData,
  columnHeaders: [
    {
      type: TableHeaderType.Text,
      columnIdentifier: '',
      columnTitle: '',
      sortable: false,
    } as TextColumnHeader,
    ...defaultValueChainTableDataIValueChainTableData.columnHeaders
  ],
  rowData: [
    {
      rowId: 0,
      isHighlighted: true,
      isSelected: true,
      cells: [
        {
          type: 'ActionCell',
          buttonType: ActionButtonType.BUTTON,
          actions: [
            {
              text: 'Select',
              link: '',
              type: EActionButtonElementType.SELECT_VALUE_CHAIN
            }
          ],
          disabled: true,
        } as ActionCell,
        {
          text: 'Produzent 1',
          type: 'TextCell'
        } as TextCell,
        ...commonRowCells
      ]
    },
    ...Array.from({
      length: 9
    }
    ).map((_, index) => ({
      rowId: index + 1,
      isHighlighted: false,
      isSelected: false,
      cells: [
        {
          type: 'ActionCell',
          buttonType: ActionButtonType.BUTTON,
          actions: [
            {
              text: 'Select',
              link: '',
              type: EActionButtonElementType.SELECT_VALUE_CHAIN
            }
          ],
          disabled: false,
        } as ActionCell,
        {
          text: `Produzent ${index + 2}`,
          type: 'TextCell'
        } as TextCell,
        ...commonRowCells
      ],
    }))]
}



