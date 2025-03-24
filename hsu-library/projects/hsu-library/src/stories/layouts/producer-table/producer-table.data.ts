import {
  CheckboxColumnHeader, IColumnHeader, TableHeaderType, TextColumnHeader
} from '../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../../lib/components/pm-table/pm-table.shared';
import {
  ActionCell, CheckboxCell, TextCell
} from '../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { Icon } from '../../../lib/components/pm-icon/pm-icon.shared';
import { EActionButtonElementType } from '../../../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.shared';
import { PmCheckboxState } from '../../../lib/components/pm-checkbox/pm-checkbox.shared';
import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';
import { IProducerTableLocalisation } from '../../../lib/layouts/pm-producer-table/pm-producer-table.shared';

interface IProducerTableData {
  localisations: IProducerTableLocalisation;
  loading: boolean;
  columnHeaders: IColumnHeader[];
  rowData: Row[];
  totalItems: number;
  currentPage: number;
  itemsPerPageOptions: PmDropdownOption<string>[];
}

export const ProducerTableData: IProducerTableData = {
  localisations: {
    cardTitle: 'Produzenten Anfragen',
    description: 'Die markierten Produzenten wurden vorgeschlagen, um für das Produkt angefragt zu werden. Sie können manuell angepasst werden und angefragt werden,' +
      ' sobald eine Bearbeitungsfrist eingestellt worden ist. Bereits angefragte Produzenten können nicht deselektiert oder erneut angefragt werden.',
    paginationTotalText: 'Gesamt',
    requestButtonLabel: 'Produzenten anfragen',
    deadline: 'Bearbeitungsfrist',
    popup: {
      title: 'Bearbeitungsfrist für die Produzenten',
      description: 'Hier kann eine Bearbeitungsfrist für das Eintragen der Produktionsprozesse angegeben werden, die für alle ausgewählten Produzenten gültig ist.',
      inputLabel: 'Bearbeitungsfrist bis zum… *',
      cancelButtonLabel: 'Abbrechen',
      confirmButtonLabel: 'Bestätigen'
    },
    requestPopup: {
      title: 'Produzenten anfragen',
      description: 'Bist du sicher, dass du die ausgewählten Produzenten für das Produkt anfragen möchtest? ' +
        'Die Produzenten werden dann freigeschaltet, um ihre Arbeitsschritte innerhalb der Bearbeitungsfrist in die Produktionskette des Produkts einzutragen.',
      cancelButtonLabel: 'Abbrechen',
      confirmButtonLabel: 'Bestätigen'
    }
  },
  loading: false,
  columnHeaders: [
    {
      type: TableHeaderType.Checkbox,
      columnIdentifier: 'checkbox',
      checkboxState: PmCheckboxState.MULTISELECT,
    } as CheckboxColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'producerName',
      columnTitle: 'Name des Produzenten',
      sortable: true,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'producerCraft',
      columnTitle: 'Gewerk',
      sortable: true,
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
    } as TextColumnHeader,
  ],
  rowData: [
    {
      rowId: 0,
      isHighlighted: false,
      isSelected: true,
      cells: [
        {
          value: PmCheckboxState.ACTIVE,
          type: 'CheckboxCell',
          disabled: true
        } as CheckboxCell,
        {
          text: 'Produzent 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: '-',
          type: 'TextCell'
        } as TextCell,
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
      isSelected: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell'
        } as CheckboxCell,
        {
          text: 'Produzent 02',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Glaserei',
          type: 'TextCell'
        } as TextCell,
        {
          text: '-',
          type: 'TextCell'
        } as TextCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell,
      ]
    },
    {
      rowId: 2,
      isHighlighted: false,
      isSelected: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell'
        } as CheckboxCell,
        {
          text: 'Produzent 03',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: '-',
          type: 'TextCell'
        } as TextCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell,
      ]
    },
    {
      rowId: 3,
      isHighlighted: false,
      isSelected: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell'
        } as CheckboxCell,
        {
          text: 'Produzent 04',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Schreinerei',
          type: 'TextCell'
        } as TextCell,
        {
          text: '-',
          type: 'TextCell'
        } as TextCell,
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.ARROW,
              link: '',
              type: EActionButtonElementType.PRODUCT_DETAILS
            },
          ]
        } as ActionCell,
      ]
    },
  ],
  totalItems: 32,
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
};
