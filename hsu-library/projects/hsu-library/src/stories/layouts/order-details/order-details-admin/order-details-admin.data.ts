import {
  IBreadCrumbLink,
  IBreadcrumbs 
} from '../../../../lib/layouts/pm-header/pm-header.shared';
import { IPmConfirmPopupLocalisations } from '../../../../lib/layouts/pm-confirm-popup/pm-confirm-popup.shared';

interface OrderDetailsAdminData {
  breadcrumbs: IBreadcrumbs;
  cancelDisabled: boolean;
  cancelButtonLabel: string;
  cancelPopupLocalisations: IPmConfirmPopupLocalisations;
  ngContent: string
}

const breadcrumbLink: IBreadCrumbLink = {
  text: 'Auftragsübersicht',
  link: {
    routerLink: '/example-url-to-orders',
    title: 'Zur Auftragsübersicht'
  }
}

const breadcrumbs: IBreadcrumbs = {
  breadcrumbLinks: [breadcrumbLink],
  lastBreadcrumb: 'Kommode Alpha'
}

export const orderDetailsAdminData: OrderDetailsAdminData = {
  breadcrumbs: breadcrumbs,
  cancelButtonLabel: 'Auftrag stornieren',
  cancelDisabled: false,
  cancelPopupLocalisations: {
    title: 'Auftrag stornieren',
    description: 'Möchtest du den Auftrag wirklich stornieren?',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen'
  },
  ngContent: `
          <pm-row>
            <pm-col>
                <pm-order-value-chain-card
                      [index]="1"
                      [requestDate]="'06.09.2023'"
                      [status]="'selected'"
                      [columnHeaders]="[
                          { type: 'TextColumn', columnIdentifier: 'material', columnTitle: 'Rohmaterial/Schritt', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'startState', columnTitle: 'Startzustand', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'finalState', columnTitle: 'Ergebniszustand', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'status', columnTitle: 'Status', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'processingTime', columnTitle: 'Auftragsbearbeitungszeit', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'producerName', columnTitle: 'Name d. Produzenten', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'workType', columnTitle: 'Gewerk', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'address', columnTitle: 'Anschrift', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'email', columnTitle: 'E-Mail-Adresse', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'phoneNumber', columnTitle: 'Telefonnummer', sortable: false }
                      ]"
                      [rowData]="[
                          {
                              rowId: 1,
                              isHighlighted: false,
                              cells: [
                                  { text: 'Birke Multiplex/1', type: 'TextCell' },
                                  { text: 'Rohmaterial Holz', type: 'TextCell' },
                                  { text: 'Zugeschnittene Platten', type: 'TextCell' },
                                  { text: 'Offen', type: 'StatusCell' },
                                  { text: '2, 5 Wochen', type: 'TextCell' },
                                  { text: 'Produzent 01', type: 'TextCell' },
                                  { text: 'Glaserei', type: 'TextCell' },
                                  { text: 'Some street 25,  123456,  Hamburg', type: 'TextCell' },
                                  { text: 'unternehmen@web.de', type: 'TextCell' },
                                  { text: '+49 040 258 94 56', type: 'TextCell' }
                              ]
                          },
                           {
                              rowId: 1,
                              isHighlighted: false,
                              cells: [
                                  { text: 'Birke Multiplex/1', type: 'TextCell' },
                                  { text: 'Rohmaterial Holz', type: 'TextCell' },
                                  { text: 'Zugeschnittene Platten', type: 'TextCell' },
                                  { text: 'Offen', type: 'StatusCell' },
                                  { text: '2, 5 Wochen', type: 'TextCell' },
                                  { text: 'Produzent 01', type: 'TextCell' },
                                  { text: 'Glaserei', type: 'TextCell' },
                                  { text: 'Some street 25,  123456,  Hamburg', type: 'TextCell' },
                                  { text: 'unternehmen@web.de', type: 'TextCell' },
                                  { text: '+49 040 258 94 56', type: 'TextCell' }
                              ]
                          },
                           {
                              rowId: 1,
                              isHighlighted: false,
                              cells: [
                                  { text: 'Birke Multiplex/1', type: 'TextCell' },
                                  { text: 'Rohmaterial Holz', type: 'TextCell' },
                                  { text: 'Zugeschnittene Platten', type: 'TextCell' },
                                  { text: 'Offen', type: 'StatusCell' },
                                  { text: '2, 5 Wochen', type: 'TextCell' },
                                  { text: 'Produzent 01', type: 'TextCell' },
                                  { text: 'Glaserei', type: 'TextCell' },
                                  { text: 'Some street 25,  123456,  Hamburg', type: 'TextCell' },
                                  { text: 'unternehmen@web.de', type: 'TextCell' },
                                  { text: '+49 040 258 94 56', type: 'TextCell' }
                              ]
                          },
                      ]"
                      [valueChainCardLocalisation]="{
                          description: 'In der folgenden Tabelle kannst du die verschiedenen Arbeitsschritte und den aktuellen Status der angefragten Wertkette einsehen.',
                          requestDate: 'Datum der Anfrage',
                          requestValueChain: 'angefragte Wertkette',
                          status: {
                              accepted: 'Beauftragt',
                              rejected: 'Nicht zustande gekommen',
                              inProgress: 'In Bearbeitung',
                              completed: 'Abgeschlossen',
                              canceled: 'Storniert'
                          }
                      }"
                ></pm-order-value-chain-card>
                <pm-order-value-chain-card
                      [index]="1"
                      [requestDate]="'06.09.2023'"
                      [status]="'rejected'"
                      [columnHeaders]="[
                          { type: 'TextColumn', columnIdentifier: 'material', columnTitle: 'Rohmaterial/Schritt', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'startState', columnTitle: 'Startzustand', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'finalState', columnTitle: 'Ergebniszustand', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'status', columnTitle: 'Status', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'processingTime', columnTitle: 'Auftragsbearbeitungszeit', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'producerName', columnTitle: 'Name d. Produzenten', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'workType', columnTitle: 'Gewerk', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'address', columnTitle: 'Anschrift', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'email', columnTitle: 'E-Mail-Adresse', sortable: false },
                          { type: 'TextColumn', columnIdentifier: 'phoneNumber', columnTitle: 'Telefonnummer', sortable: false }
                      ]"
                      [rowData]="[
                          {
                              rowId: 1,
                              isHighlighted: false,
                              cells: [
                                  { text: 'Birke Multiplex/1', type: 'TextCell' },
                                  { text: 'Rohmaterial Holz', type: 'TextCell' },
                                  { text: 'Zugeschnittene Platten', type: 'TextCell' },
                                  { text: 'Offen', type: 'StatusCell' },
                                  { text: '2, 5 Wochen', type: 'TextCell' },
                                  { text: 'Produzent 01', type: 'TextCell' },
                                  { text: 'Glaserei', type: 'TextCell' },
                                  { text: 'Some street 25,  123456,  Hamburg', type: 'TextCell' },
                                  { text: 'unternehmen@web.de', type: 'TextCell' },
                                  { text: '+49 040 258 94 56', type: 'TextCell' }
                              ]
                          },
                           {
                              rowId: 1,
                              isHighlighted: false,
                              cells: [
                                  { text: 'Birke Multiplex/1', type: 'TextCell' },
                                  { text: 'Rohmaterial Holz', type: 'TextCell' },
                                  { text: 'Zugeschnittene Platten', type: 'TextCell' },
                                  { text: 'Offen', type: 'StatusCell' },
                                  { text: '2, 5 Wochen', type: 'TextCell' },
                                  { text: 'Produzent 01', type: 'TextCell' },
                                  { text: 'Glaserei', type: 'TextCell' },
                                  { text: 'Some street 25,  123456,  Hamburg', type: 'TextCell' },
                                  { text: 'unternehmen@web.de', type: 'TextCell' },
                                  { text: '+49 040 258 94 56', type: 'TextCell' }
                              ]
                          },
                           {
                              rowId: 1,
                              isHighlighted: false,
                              cells: [
                                  { text: 'Birke Multiplex/1', type: 'TextCell' },
                                  { text: 'Rohmaterial Holz', type: 'TextCell' },
                                  { text: 'Zugeschnittene Platten', type: 'TextCell' },
                                  { text: 'Offen', type: 'StatusCell' },
                                  { text: '2, 5 Wochen', type: 'TextCell' },
                                  { text: 'Produzent 01', type: 'TextCell' },
                                  { text: 'Glaserei', type: 'TextCell' },
                                  { text: 'Some street 25,  123456,  Hamburg', type: 'TextCell' },
                                  { text: 'unternehmen@web.de', type: 'TextCell' },
                                  { text: '+49 040 258 94 56', type: 'TextCell' }
                              ]
                          },
                      ]"
                      [valueChainCardLocalisation]="{
                          description: 'In der folgenden Tabelle kannst du die verschiedenen Arbeitsschritte und den aktuellen Status der angefragten Wertkette einsehen.',
                          requestDate: 'Datum der Anfrage',
                          requestValueChain: 'angefragte Wertkette',
                          status: {
                              accepted: 'Beauftragt',
                              rejected: 'Nicht zustande gekommen',
                              inProgress: 'In Bearbeitung',
                              completed: 'Abgeschlossen',
                              canceled: 'Storniert'
                          }
                      }"
                ></pm-order-value-chain-card>
          </pm-col>
        </pm-row>`
}
