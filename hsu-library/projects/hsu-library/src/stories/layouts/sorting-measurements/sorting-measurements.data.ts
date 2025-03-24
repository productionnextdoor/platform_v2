import {
  IColumnHeader, TableHeaderType, TextColumnHeader
} from '../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../../lib/components/pm-table/pm-table.shared';
import { TextCell } from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { ISortingMeasurementLocalisations } from '../../../lib/layouts/pm-sorting-measurements/pm-sorting-measurements.shared';

interface ISortingData {
  localisations: ISortingMeasurementLocalisations;
  sortingHeaders: IColumnHeader[];
  sortingRows: Row [];
}

export const sortingData: ISortingData = {
  localisations: {
    bannerText: 'Bitte füge alle Produktangaben ein und gib mir das Produkt anschließend zur Prüfung frei. (Admin)',
    titleText: 'Reihenfolge der angegebenen Produktgrößen',
    descriptionText:
      'Bitte bringe die zuvor angegeben Größenvarianten, angefangen von der minimalsten (1), bis hin zur maximalsten Ausprägung in eine Reihenfolge entsprechend des Materialbedarfs. Der Produktstandard ist dunkelgrün gehighlightet. ' +
      'Diese Sortierung ist wichtig, um später Aufwand und Materialkosten für die jeweilige Produktausprägung kalkulieren zu können.',
  },
  sortingHeaders: [
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'dragHandle',
      columnTitle: '',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'position',
      columnTitle: 'Position',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'height',
      columnTitle: 'Höhe in cm',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'width',
      columnTitle: 'Breite in cm',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'depth',
      columnTitle: 'Tiefe in cm',
      sortable: false,
    } as TextColumnHeader
  ],
  sortingRows: [
    {
      rowId: 1,
      cells: [
        {
          text: '1 - Minimalausprägung',
          type: 'TextCell'
        } as TextCell,
        {
          text: '60 cm',
          type: 'TextCell'
        } as TextCell,
        {
          text: '80 cm',
          type: 'TextCell'
        } as TextCell,
        {
          text: '80 cm',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 2,
      isHighlighted: true,
      cells: [
        {
          text: '2',
          type: 'TextCell'
        } as TextCell,
        {
          text: '120 cm',
          type: 'TextCell'
        } as TextCell,
        {
          text: '100 cm',
          type: 'TextCell'
        } as TextCell,
        {
          text: '80 cm',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 3,
      cells: [
        {
          text: '3',
          type: 'TextCell'
        } as TextCell,
        {
          text: '160 cm',
          type: 'TextCell'
        } as TextCell,
        {
          text: '120 cm',
          type: 'TextCell'
        } as TextCell,
        {
          text: '80 cm',
          type: 'TextCell'
        } as TextCell,
      ]
    },
    {
      rowId: 4,
      cells: [
        {
          text: '4 - Maximalausprägung',
          type: 'TextCell'
        } as TextCell,
        {
          text: '180 cm',
          type: 'TextCell'
        } as TextCell,
        {
          text: '120 cm',
          type: 'TextCell'
        } as TextCell,
        {
          text: '80 cm',
          type: 'TextCell'
        } as TextCell,
      ],
    },
  ]
}
