import {
  IProductDetailsInProgressLocalisations
} from '../../../lib/layouts/pm-product-details-in-progress/pm-product-details-in-progress.shared';

export interface IProductDetailsInProgressData {
  localisations: IProductDetailsInProgressLocalisations;
  lastEditDate: string;
}

export const productDetailsInProgressData: IProductDetailsInProgressData = {
  localisations: {
    description: 'Das Produkt liegt zur Zeit beim Entwickler. Angaben, die bereits eingetragen wurden, kannst du in den ' +
      'Produkdetails einsehen. Bei weiteren Fragen nimm bitte mit dem Entwickler direkt Kontakt auf.',
    lastEditTitle: 'Letzte Bearbeitung des Produkts',
  },
  lastEditDate: '12.10.2023',
}
