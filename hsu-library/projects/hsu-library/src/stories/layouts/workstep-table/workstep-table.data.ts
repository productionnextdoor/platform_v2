import { IWorkstepTableLocalisations } from '../../../lib/layouts/pm-workstep-table/pm-workstep-table.shared';
import {
  CheckboxColumnHeader, IColumnHeader, TableHeaderType, TextColumnHeader
} from '../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../../lib/components/pm-table/pm-table.shared';
import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';
import {
  ActionCell, CheckboxCell, TextCell
} from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';
import { EActionButtonElementType } from '../../../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.shared';

interface IWorkstepTableData {
  localisations: IWorkstepTableLocalisations;
  loading: boolean;
  totalItems: number;
  columnHeaders: IColumnHeader[];
  rowData: Row[];
}

export const WorkstepTableData: IWorkstepTableData = {
  localisations: {
    cardTitle: 'Eingetragene Arbeitsschritte',
    description: 'Hier werden die bereits eingetragenen Arbeitsschritte von Produzenten aufgelistet. Du kannst die Schritte an dieser Stelle auch wieder zurücksetzen, beachte jedoch, dass dies Auswirkungen auf die Wertketten habe kann!',
    totalItemsText: 'Gesamt',
    removeButtonLabel: 'Arbeitsschritte entfernen'
  },
  loading: false,
  totalItems: 4,
  columnHeaders: [
    {
      type: TableHeaderType.Checkbox,
      columnIdentifier: 'checkbox',
      checkboxState: PmCheckboxState.DEFAULT,
    } as CheckboxColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'startingState',
      columnTitle: 'Startzustand',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'resultingState',
      columnTitle: 'Ergebniszustand',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'price',
      columnTitle: 'Preis (Standard)',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'producerName',
      columnTitle: 'Name d. Produzenten',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'trade',
      columnTitle: 'Gewerk',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'details',
      columnTitle: 'Details',
      sortable: false,
    } as TextColumnHeader,
  ],
  rowData: [
    {
      rowId: 0,
      isHighlighted: false,
      isSelected: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell',
          disabled: false
        } as CheckboxCell,
        {
          text: 'Rohmaterial Holz',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Zugeschnittene Platten',
          type: 'TextCell'
        } as TextCell,
        {
          text: '280,00€',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_WORKSTEP
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      isSelected: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell',
          disabled: false
        } as CheckboxCell,
        {
          text: 'Gelochte Platten',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Kommode Alpha',
          type: 'TextCell'
        } as TextCell,
        {
          text: '280,00€',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_WORKSTEP
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 2,
      isHighlighted: false,
      isSelected: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell',
          disabled: false
        } as CheckboxCell,
        {
          text: 'Rohmaterial Holz',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Kommode Alpha',
          type: 'TextCell'
        } as TextCell,
        {
          text: '280,00€',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 02',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_WORKSTEP
            },
          ]
        } as ActionCell
      ]
    },
    {
      rowId: 3,
      isHighlighted: false,
      isSelected: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell',
          disabled: false
        } as CheckboxCell,
        {
          text: 'Rohmaterial Glas',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Kommode Alpha',
          type: 'TextCell'
        } as TextCell,
        {
          text: '280,00€',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 02',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_WORKSTEP
            },
          ]
        } as ActionCell
      ]
    },
  ]
}
