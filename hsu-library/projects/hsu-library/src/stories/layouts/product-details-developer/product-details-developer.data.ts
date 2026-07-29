import {
  IProductDetailsBaseData,
  IProductDetailsDeveloperLocalisations
} from '../../../lib/layouts/pm-product-details-developer/pm-product-details-developer.shared';
import { imageData } from '../../components/image/image.data';
import {
  IPropertyGroup,
  IPropertySection
} from '../../../lib/layouts/pm-product-details-sidebar/pm-product-details-sidebar.shared';
import { IFileNameByCategory } from '../../../lib/layouts/pm-file-upload/pm-file-upload.shared';

export interface IProductDetailsDeveloperData {
  localisations: IProductDetailsDeveloperLocalisations;
  productDetailsBaseData: IProductDetailsBaseData;
  generalInformation: IPropertyGroup;
  productDataDetailCard: IPropertySection[];
  fileData: IFileNameByCategory[]
  uploadCategories: { [key: string]: string };
  productImagePath: string;
  productImagePathFull: string;

}

export const productDetailsDeveloperData: IProductDetailsDeveloperData = {
  localisations: {
    mainTitle: 'Produktdetails',
    productDescriptionTitle: 'Kurzbeschreibung',
    productFilesTitle: 'Dateien',
    sharepointLinkLabel: 'Link zum SharePoint',
  },
  productDetailsBaseData: {
    productDescription: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    lastEditDate: '',
    sharePointLink: 'linkzumsharepoint.com'
  },
  generalInformation: {
    groupTitle: 'Allgemeine Angaben',
    properties: [
      {
        key: 'Name des Produkts',
        value: 'Kommode Alpha',
      },
      {
        key: 'Produktnummer',
        value: '123456',
      },
      {
        key: 'Erstelldatum',
        value: '07.08.2023'
      },
      {
        key: 'Letzte Änderung',
        value: '15.08.2023',
      },
      {
        key: 'Größe (H, B, T)',
        value: '120 cm, 100 cm, 80 cm',
      },
    ]
  },
  productDataDetailCard: [
    {
      sectionTitle: 'Materialgruppen',
      content: '',
      groups: [
        {
          groupTitle: 'Holz',
          properties: [
            {
              key: 'Material',
              value: 'Birke Multiplex',
            },
            {
              key: 'Finaler Zustand',
              value: 'Montiertes Gestell',
            },
            {
              key: 'Spezifizierung',
              value: 'Oberfläche 01',
            },
          ]
        },
        {
          groupTitle: 'Glas',
          properties: [
            {
              key: 'Material',
              value: 'Einscheiben-Sicherheits-Glas',
            },
            {
              key: 'Finaler Zustand',
              value: 'Fertige Glasplatte',
            },
            {
              key: 'Spezifizierung',
              value: 'Klar',
            },
          ]
        },
      ]
    },
    {
      sectionTitle: 'Produktvarianten',
      content: '',
      groups: [
        {
          groupTitle: '',
          properties: [
            {
              key: 'Größe (H, B, T)',
              value: '60 cm, 80 cm, 80 cm',
            },
            {
              key: 'Größe (H, B, T)',
              value: '160 cm, 120 cm, 80 cm',
            },
            {
              key: 'Material (Holz)',
              value: 'Buche Leimholz',
            },
          ]
        },
      ]
    },
  ],
  fileData: [
    {
      fileId: 1,
      fileName: 'productDescription.pdf',
      categoryName: 'ProductDescription',
    },
    {
      fileId: 2,
      fileName: 'productPicture.jpg',
      categoryName: 'ProductPicture',
    },
    {
      fileId: 3,
      fileName: 'productPicture.jpg',
      categoryName: 'ProductPicture',
    },
    {
      fileId: 4,
      fileName: 'technicalDetails.cad',
      categoryName: 'TechnicalDetails',
    },
    {
      fileId: 5,
      fileName: 'installationAndUsageInstructions.exl',
      categoryName: 'InstallationAndUsageInstructions',
    },
  ],
  uploadCategories: {
    ProductDescription: 'Produktbeschreibung',
    ProductPicture: 'Produktbilder',
    ModelsAndDrawings: 'Modelle und Zeichnungen',
    TechnicalDetails: 'Technische Details',
    ManufacturingHints: 'Herstellungshinweise',
    InstallationAndUsageInstructions: '(Intallations- und Nutzungs) Anweisungen',
    Miscellaneous: 'Begleitdokumente und Sonstiges'
  },
  productImagePath: imageData.imagePath,
  productImagePathFull: imageData.imagePathFull,
}
