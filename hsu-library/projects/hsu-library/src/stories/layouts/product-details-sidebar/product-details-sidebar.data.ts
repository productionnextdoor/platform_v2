import {
  IProductDetailsSidebarLocalisations,
  IPropertySection
} from '../../../lib/layouts/pm-product-details-sidebar/pm-product-details-sidebar.shared';
import { IFileNameByCategory } from '../../../lib/layouts/pm-file-upload/pm-file-upload.shared';
import { imageData } from '../../components/image/image.data';

export interface IProductDetailsSidebarAdminData {
  localisations: IProductDetailsSidebarLocalisations;
  sharePointLink: string;
  productDataSidebar: IPropertySection[];
  uploadCategories: {[key: string]: string};
  fileData: IFileNameByCategory[];
  productImagePath: string;
  productImagePathFull: string;
}

export const productDetailsSidebarData: IProductDetailsSidebarAdminData = {
  localisations: {
    sidebarTitle: 'Produktdetails',
    fileSectionTitle: 'Dateien',
    sharepointLinkLabel: 'Link zum SharePoint',
  },
  sharePointLink: 'linkzumsharepoint.com',
  productDataSidebar: [
    {
      sectionTitle: 'Allgemeine Angaben',
      content: '',
      groups: [
        {
          groupTitle: '',
          properties: [
            {
              key: 'Entwickler:in',
              value: 'Sven Moench',
            },
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
              value: '07.08.2023',
            },
            {
              key: 'Größe im Produktstandard (H, B, T)',
              value: '120 cm, 100 cm, 80 cm',
            },
          ]
        },
      ]
    },
    {
      sectionTitle: 'Materialgruppen im Produktstandard',
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
              key: 'Oberflächenbeschaffenheit',
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
              key: 'Oberflächenbeschaffenheit',
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
          groupTitle: 'Abweichende Größen (Min. - Max.)',
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
              key: 'Größe (H, B, T)',
              value: '180 cm, 120 cm, 80 cm',
            },
          ]
        },
        {
          groupTitle: 'Abweichende Materialien (Holz)',
          properties: [
            {
              key: 'Material (Holz)',
              value: 'Birke Multiplex, FSC',
            },
            {
              key: 'Material (Holz)',
              value: 'Buche Leimholz',
            },
          ],
        }
      ]
    },
    {
      sectionTitle: 'Kurzbeschreibung',
      content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.' +
               'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
      groups: [],
    },
  ],
  uploadCategories: {
    ProductDescription: 'Produktbeschreibung',
    ProductPicture: 'Produktbilder',
    ModelsAndDrawings: 'Modelle und Zeichnungen',
    TechnicalDetails: 'Technische Details',
    ManufacturingHints: 'Herstellungshinweise',
    InstallationAndUsageInstructions: '(Intallations- und Nutzungs) Anweisungen',
    Miscellaneous : 'Begleitdokumente und Sonstiges'
  },
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
      fileName: 'modelsAndDrawings.pdf',
      categoryName: 'ModelsAndDrawings',
    },
    {
      fileId: 5,
      fileName: 'technicalDetails.cad',
      categoryName: 'TechnicalDetails',
    },
    {
      fileId: 6,
      fileName: 'manufacturingHints.pdf',
      categoryName: 'ManufacturingHints',
    },
    {
      fileId: 7,
      fileName: 'installationAndUsageInstructions.exl',
      categoryName: 'InstallationAndUsageInstructions',
    },
    {
      fileId: 8,
      fileName: 'miscellaneousDocuments.pdf',
      categoryName: 'Miscellaneous',
    },
  ],
  productImagePath: imageData.imagePath,
  productImagePathFull: imageData.imagePathFull,
}
