import {
  IMeasurement,
  IProductVariantsLocalisations,
  IWorkPieceVariant
} from '../../../lib/layouts/pm-product-variants/pm-product-variants.shared';
import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';



export interface IProductMeasurementData {
  localisations: IProductVariantsLocalisations;
  productId: number;
  workPieceOptions: PmDropdownOption<string>[];
  measurements: IMeasurement[];
  workPieceVariants: IWorkPieceVariant[];
}

export const productVariantsData: IProductMeasurementData = {
  localisations: {
    bannerText: 'Bitte füge alle Produktangaben ein und gib mir das Produkt anschließend zur Prüfung frei. (Admin)',
    titleText: 'Varianten zum Produktstandard',
    descriptionText: 'In welchen alternativen Varianten soll das Produkt angeboten werden? Füge die Abweichungen über den ' +
    'Plus-Button in den entsprechenden Kategorien hinzu. Bitte beachte, dass zertifizierte Materialien jeweils als ' +
    'einzelne Variante unter „Abweichenden Materialien“ angegeben werden müssen.',
    heightLabel: 'Höhe in cm',
    heightPlaceholder: 'Höhe',
    widthLabel: 'Breite in cm',
    widthPlaceholder: 'Breite',
    depthLabel: 'Tiefe in cm',
    depthPlaceholder: 'Tiefe',
    workPieceDropdownLabel: 'Materialgruppe',
    workPieceDropdownPlaceholder: 'Materialgruppe',
    workPieceVariantLabel: 'Abweichendes Material',
    workPieceVariantPlaceholder: 'Abweichendes Material',
    measurementVariantsTitle: 'Abweichende Größen',
    workPieceVariantsTitle: 'Abweichende Materialien',
    inputErrorMessages: ['Erforderliches Feld']
  },
  productId: 1,
  workPieceOptions: [
    {
      key: '1',
      value: 'Holz (Birke Multiplex)',
    },
    {
      key: '2',
      value: 'Holz (Laminatbeschichtung)',
    },
    {
      key: '3',
      value: 'Glas (gefrorenes Glas)',
    }
  ],
  measurements: [
    {
      measurementId: 1,
      height: 10,
      width: 20,
      depth: 30,
      isDefaultMeasurement: false,
    },
    {
      measurementId: 1,
      height: 40,
      width: 50,
      depth: 60,
      isDefaultMeasurement: false,
    },
    {
      measurementId: 3,
      height: 70,
      width: 80,
      depth: 90,
      isDefaultMeasurement: false,
    }
  ],
  workPieceVariants: [
    {
      variantId: 1,
      workPieceId: 1,
      description: 'Variant 1'
    },
    {
      variantId: 2,
      workPieceId: 2,
      description: 'Variant 2'
    },
    {
      variantId: 3,
      workPieceId: 3,
      description: 'Variant 3'
    }
  ]
}
