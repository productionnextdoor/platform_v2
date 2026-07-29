import {
  EValueChainStatus,
  IValueChainCardLocalisations
} from '../../../../lib/layouts/pm-order-details/pm-order-value-chain-card/pm-order-value-chain-card.shared';
import {
  IColumnHeader,
  TableHeaderType,
  TextColumnHeader
} from '../../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../../../lib/components/pm-table/pm-table.shared';
import {
  ActionCell,
  StatusCell,
  TextCell
} from '../../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { Icon } from '../../../../lib/components/pm-icon/pm-icon.shared';
import {
  EActionButtonElementType
} from '../../../../lib/components/pm-table/pm-table-action-buttons/pm-table-action-buttons.shared';


interface ValueChainCardData {
  index: number,
  requestDate: string,
  status: string
  valueChainCardLocalisation: IValueChainCardLocalisations;
  columnHeaders: IColumnHeader[];
  rowData: Row[];
}

export const valueChainCardData: ValueChainCardData = {
  index: 1,
  requestDate: '06.09.2023',
  status: EValueChainStatus['Selected'],
  valueChainCardLocalisation: {
    description: 'In der folgenden Tabelle kannst du die verschiedenen Arbeitsschritte und den aktuellen Status der angefragten Wertkette einsehen.',
    requestDate: 'Datum der Anfrage',
    requestValueChain: 'angefragte Wertkette',
    status: {
      rejected: 'Nicht zustande gekommen',
      commissioned: 'Beauftragt',
      inProgress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
      canceled: 'Storniert'
    }
  },
  columnHeaders: [
    {
      type: TableHeaderType.Text,
      columnIdentifier: '',
      columnTitle: '',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'material',
      columnTitle: 'Rohmaterial/Schritt',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'startState',
      columnTitle: 'Startzustand',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'finalState',
      columnTitle: 'Ergebniszustand',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'status',
      columnTitle: 'Status',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'processingTime',
      columnTitle: 'Auftragsbearbeitungszeit',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'producerName',
      columnTitle: 'Name d. Produzenten',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'workType',
      columnTitle: 'Gewerk',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'address',
      columnTitle: 'Anschrift',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'email',
      columnTitle: 'E-Mail-Adresse',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'phoneNumber',
      columnTitle: 'Telefonnummer',
      sortable: false,
    } as TextColumnHeader,
  ],
  rowData: [
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.RELOAD,
              link: '',
              type: EActionButtonElementType.RE_REQUEST_ACTION
            }
          ],
          disabled: true
        } as ActionCell,
        {
          text: 'Birke Multiplex/1',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Rohmaterial Holz',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Zugeschnittene Platten',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Offen',
          type: 'StatusCell'
        } as StatusCell,
        {
          text: '2,5 Wochen',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Glaserei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Some street 25, 123456, Hamburg',
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
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.RELOAD,
              link: '',
              type: EActionButtonElementType.RE_REQUEST_ACTION
            },
          ]
        } as ActionCell,
        {
          text: 'Birke Multiplex/1',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Rohmaterial Holz',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Zugeschnittene Platten',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Offen',
          type: 'StatusCell'
        } as StatusCell,
        {
          text: '2,5 Wochen',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Glaserei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Some street 25, 123456, Hamburg',
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
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.RELOAD,
              link: '',
              type: EActionButtonElementType.RE_REQUEST_ACTION
            },
          ]
        } as ActionCell,
        {
          text: 'Birke Multiplex/1',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Rohmaterial Holz',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Zugeschnittene Platten',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Offen',
          type: 'StatusCell'
        } as StatusCell,
        {
          text: '2,5 Wochen',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Glaserei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Some street 25, 123456, Hamburg',
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
      ]
    },
    {
      rowId: 1,
      isHighlighted: false,
      cells: [
        {
          type: 'ActionCell',
          actions: [
            {
              icon: Icon.RELOAD,
              link: '',
              type: EActionButtonElementType.RE_REQUEST_ACTION
            },
          ]
        } as ActionCell,
        {
          text: 'Birke Multiplex/1',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Rohmaterial Holz',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Zugeschnittene Platten',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Offen',
          type: 'StatusCell'
        } as StatusCell,
        {
          text: '2,5 Wochen',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 01',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Glaserei',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Some street 25, 123456, Hamburg',
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
      ]
    },
  ],
}
