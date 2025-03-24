import {
  IColumnHeader,
  TableHeaderType,
  TextColumnHeader
} from '../../../../lib/components/pm-table/pm-table-header/pm-table-header.shared';
import { Row } from '../../../../lib/components/pm-table/pm-table.shared';
import {
  IDeliveryDocument,
  IProductionProcessCardLocalisations,
} from '../../../../lib/layouts/pm-order-details/pm-production-process-card/pm-production-process-card.shared';
import {
  CheckboxCell,
  StatusCell,
  TextCell
} from '../../../../lib/components/pm-table/pm-table-cell/pm-table-cell.shared';
import { PmCheckboxState } from '../../../../lib/components/pm-checkbox/pm-checkbox.shared';

export interface IProductionProcessCardData {
  columnHeaders: IColumnHeader[];
  rowData: Row[];
  startDisabled: boolean;
  endDisabled: boolean;
  isFinalSelected: boolean;
  loading: boolean;
  deliveryDocuments: IDeliveryDocument[],
  localisations: IProductionProcessCardLocalisations;
  ngContent: string;
}

export const productionProcessCardData: IProductionProcessCardData = {
  startDisabled: false,
  endDisabled: true,
  isFinalSelected: false,
  loading: false,
  deliveryDocuments: [
    {
      index: 15,
      name: 'Document 1.pdf'
    },
    {
      index: 16,
      name: 'Document 2.pdf'
    },
    {
      index: 17,
      name: 'Document 3.jpg'
    }
  ],
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
      columnIdentifier: 'processingFrom',
      columnTitle: 'Bearbeitung ab',
      sortable: false,
    } as TextColumnHeader,
    {
      type: TableHeaderType.Text,
      columnIdentifier: 'processingUntil',
      columnTitle: 'Bearbeitung bis',
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
      isHighlighted: true,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell',
          disabled: true
        } as CheckboxCell,
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
          text: 'Abgeschlossen',
          type: 'StatusCell'
        } as StatusCell,
        {
          text: 'KW 35',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'KW 37',
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
      ],

    },
    {
      rowId: 2,
      isHighlighted: true,
      cells: [
        {
          value: PmCheckboxState.ACTIVE,
          type: 'CheckboxCell',
          disabled: false
        } as CheckboxCell,
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
          text: 'In Bearbeitung',
          type: 'StatusCell'
        } as StatusCell,
        {
          text: 'KW 35',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'KW 37',
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
      ],

    },
    {
      rowId: 3,
      isHighlighted: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell',
          disabled: true
        } as CheckboxCell,
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
          text: 'KW 35',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'KW 37',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 02',
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
      ],

    },
    {
      rowId: 4,
      isHighlighted: true,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell',
          disabled: false
        } as CheckboxCell,
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
          text: 'KW 35',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'KW 37',
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
      ],

    },
    {
      rowId: 5,
      isHighlighted: false,
      cells: [
        {
          value: PmCheckboxState.DEFAULT,
          type: 'CheckboxCell',
          disabled: true
        } as CheckboxCell,
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
          text: 'KW 35',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'KW 37',
          type: 'TextCell'
        } as TextCell,
        {
          text: 'Produzent 02',
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
      ],

    },

  ],
  localisations: {
    title: 'Beauftragte Wertkette',
    startButton: 'Bearbeitung starten',
    finishButton: 'Bearbeitung beenden',
    completeOrderButton: 'Auftrag abschließen',
    description: 'In der folgenden Tabelle kannst du die verschiedenen Arbeitsschritte und den aktuellen Status der ' +
      'beauftragten Wertkette einsehen. Wenn du mit einem Arbeitsschritt beginnst oder diesen abgeschlossen hast,' +
      ' kannst du dies über die Aktivierung der Buttons kennzeichnen. Solltest du mehrere Arbeitsschritte haben, ist' +
      ' eine mehrfache Tätigung der Buttons möglich. Deine Arbeitsschritte sind gehighlightet.',
    confirmPopupStart: {
      title: 'Bearbeitung starten',
      description: 'Wenn du mit der Bearbeitung beginnst, kennzeichnen wir dies entsprechend im System. Bitte denke daran auf den Button “Bearbeitung beenden” zu klicken, sobald du die Bearbeitung deines Arbeitsschrittes abgeschlossen hast.',
      confirm: 'Bestätigen',
      cancel: 'Abbrechen'
    },
    confirmPopupFinish: {
      title: 'Bearbeitung beenden',
      description: 'Wenn du die Bearbeitung beendest, kennzeichnen wir dies entsprechend im System. Solltest du für mehrere Arbeitsschritte in der Wertkette zuständig sein, wird der Button „Bearbeitung starten“ erneut aktiviert.',
      confirm: 'Bestätigen',
      cancel: 'Abbrechen'
    },
    completeOrderPopup: {
      title: 'Auftrag abschließen',
      description: 'Wenn du einen Auftrag abschließt, bestätigst du, dass das Produkt erfolgreich beim Endkunden eingetroffen ' +
        'und gegebenenfalls montiert worden ist. Füge bitte eine entsprechende Lieferbestätigung hinzu. Wenn du diesen Schritt' +
        ' bestätigt hast, kannst du ihn nicht mehr widerrufen.',
      confirm: 'Bestätigen',
      cancel: 'Abbrechen'
    },
  },
  ngContent:
    `<ng-container uploadField>
        <pm-upload
              class="production-process-card__popup-uploadfield"
              [uploadText]="'Drag & Drop oder {0} zum Upload'"
              [uploadTextLabel]="'wähle eine Datei'"
              [fileTag]="'Lieferbestätigung (PDF-Datei)'"
              [required]="true"
             />
    </ng-container>`
}


