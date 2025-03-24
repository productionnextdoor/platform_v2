import {
  IProductGraphCardLocalisations, IGraphKeys
} from '../../../lib/layouts/pm-product-graph-card/pm-product-graph-card.shared';

export interface IProductGraphCardData {
  localisations: IProductGraphCardLocalisations;
  graphKeys: IGraphKeys;
}

export const productGraphCardData: IProductGraphCardData = {
  localisations: {
    cardTitle: 'Wertkettenplanung',
    descriptionAdmin: 'Bitte erstelle eine wahrscheinliche Wertkette als Basis für den ersten Produzenten. ' +
                 'Beim Hover über die Linien werden Buttons eingeblendet, um neue Zustände hinzuzufügen oder bereits erstellte Zustände zu bearbeiten. ' +
                 'Die in der Wertkette bereits vorgegebenen Zustände kannst du in den Produktdetails bearbeiten. Sobald sich Produzenten eingetragen haben, können keine Zustände mehr von dir hinzugefügt werden. ' +
                 'Für die Wertketten können dann verschiedene Optionen berechnet werden.',
    descriptionProducer: 'Bitte trag in die Wertkettenplanung deine Arbeitsschritte ein. Mögliche Startzustände werden beim ' +
                         'Hover über die Zustände eingeblendet, mögliche Ergebniszustände werden eingeblendet sobald du einen Startzustand angewählt hast. ' +
                         'Du kannst auch eigene Zustände ergänzen, indem du über die Linien zwischen den vorhanden Zuständen hoverst und auf das Plus klickst. ' +
                         'Solltest du bereits Zustände eingetragen haben, kannst du diese über den Bearbeitungsstift editieren.',
    buttonLabel: 'Optionen berechnen',
  },
  graphKeys: {
    finalState: 'Finaler Zustand der Rohmaterialgruppe in der Wertkettenplanung',
    stepWithoutProducer: 'Dieser Schritt wurde noch von keinem Produzenten eingetragen',
    stepWithProducer: 'Dieser Schritt wurde bereits von einem Produzenten eingetragen',
    stepCurrentProducer: 'Dieser Schritt wurde von dir eingetragen',
  }
}
