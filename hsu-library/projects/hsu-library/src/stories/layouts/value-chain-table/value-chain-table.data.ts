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
  CheckboxCell,
  ERatingType,
  RatingCell,
  TextCell
} from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';

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

export const ValueChainTableData: IValueChainTableData = {
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
      type: TableHeaderType.Checkbox,
      columnIdentifier: 'isActive',
      checkboxState: PmCheckboxState.DEFAULT
    } as CheckboxColumnHeader,
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
  rowData: [
    {
      rowId: 0,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 02, Produzent 03, Produzent 04',
          type: 'TextCell'
        } as TextCell,
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
        } as TextCell,
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 01, Produzent 03, Produzent 04',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '4,4/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,0/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,5/5,0',
          ratingType: ERatingType.BEST,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,2/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.170 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '12 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 2,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 01',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '4,0/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,0/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,0/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,0/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.150 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '11,5 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 3,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 01, Produzent 04',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '4,1/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,4/5,0',
          ratingType: ERatingType.BEST,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,1/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,4/5,0',
          ratingType: ERatingType.BEST,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.100 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '11 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 4,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 02, Produzent 03',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '3,7/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,6/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,7/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,6/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.100 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '11 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 5,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 01, Produzent 02, Produzent 04',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '3,7/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,0/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,7/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,3/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.090 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '9,5 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 6,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 01, Produzent 02, Produzent 03, Produzent 04',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '3,2/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,8/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,2/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '4,8/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.070 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '9 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 7,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 02, Produzent 04',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '3,0/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,3/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,1/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '3,3/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.060 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '8,5 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 8,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 03, Produzent 04',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '2,5/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '1,9/5,0',
          ratingType: ERatingType.WORST,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '2,5/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '2,1/5,0',
          ratingType: ERatingType.DEFAULT,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.050 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '8,5 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 9,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          type: 'CheckboxCell',
          value: PmCheckboxState.ACTIVE,
        } as CheckboxCell,
        {
          text: 'Produzent 01, Produzent 02, Produzent 03',
          type: 'TextCell'
        } as TextCell,
        {
          ratingScore: '1,0/5,0',
          ratingType: ERatingType.WORST,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '1,0/5,0',
          ratingType: ERatingType.WORST,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '1,2/5,0',
          ratingType: ERatingType.WORST,
          type: 'RatingCell'
        } as RatingCell,
        {
          ratingScore: '1,5/5,0',
          ratingType: ERatingType.WORST,
          type: 'RatingCell'
        } as RatingCell,
        {
          text: '3.000 €',
          type: 'TextCell'
        } as TextCell,
        {
          text: '8,5 Wochen',
          type: 'TextCell'
        } as TextCell,
      ]
    },
  ],
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
