import {
  IFileNameByCategory,
  IFileUploadLocalisations
} from '../../../lib/layouts/pm-file-upload/pm-file-upload.shared';

export interface IFileUploadData {
    localisations: IFileUploadLocalisations;
    fileData: IFileNameByCategory[];
    ngContent: string;
}

export const fileUploadData: IFileUploadData = {
  localisations: {
    bannerText: 'Bitte füge alle Produktangaben ein und gib mir das Produkt anschließend zur Prüfung frei. (Admin)',
    titleText: 'Upload aller Dateien zum Produkt',
    descriptionText: 'Bitte beschreibe das Produkt in einem kurzen Text zur Unterstützung für den Herstellungsprozess und füge ein Galeriebild hinzu. Lade auch die notwendigen Dateien zur Herstellung des Produkts hoch. ' +
                   'Beachte, dass die hochgeladenen Datei-Namen und die ausgewählten Kategorisierungen entsprechend auch den Produzenten zur Verfügung gestellt werden.',
    sharepointLinkLabel: 'Link zum Sharepoint',
    sharepointLinkPlaceholder: 'Link einfügen',
    descriptionLabel: 'Kurzbeschreibung des Produkts',
    descriptionPlaceholder: 'Beschreibe das Produkt für die Produzenten',
    fileTag: 'Alle Dateitypen',
    uploadText: 'Drag & Drop oder wähle eine Datei zum Upload',
    productDescription: 'Produktbeschreibung',
    productPicture: 'Produktbilder',
    modelsAndDrawings: 'Modelle und Zeichnungen',
    technicalDetails: 'Technische Details',
    manufacturingHints: 'Herstellungshinweise',
    installationAndUsageInstructions: '(Installations- und Nutzungs) Anweisungen',
    miscellaneousDocuments: 'Begleitdokumente und Sonstiges',
    categoryNames: {
      ProductDescription: 'Dateien Produktbeschreibung',
      ProductPicture: 'Dateien Produktbilder',
      ModelsAndDrawings: 'Dateien Modelle und Zeichnungen',
      TechnicalDetails: 'Dateien Technische Details',
      ManufacturingHints: 'Dateien Herstellungshinweise',
      InstallationAndUsageInstructions: 'Dateien (Installations- und Nutzungs) Anweisungen',
      Miscellaneous : 'Dateien Begleitdokumente und Sonstiges'
    },
    inputErrorMessages: ['Erforderliches Feld']
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
  ngContent: `
     <ng-template>
        <pm-upload
            [uploadLabel]="'Produktbeschreibung'"
            [uploadText]="'Drag & Drop oder {0} zum Upload'"
            [uploadTextLabel]="'wähle eine Datei'"
            [fileTag]="'Alle Dateitypen'"
            [required]="true"
        />
    </ng-template>

    <ng-template>
        <pm-upload
            [uploadLabel]="'Produktbilder'"
            [uploadText]="'Drag & Drop oder {0} zum Upload'"
            [uploadTextLabel]="'wähle eine Datei'"
            [fileTag]="'Alle Dateitypen'"
            [required]="true"
        />
    </ng-template>

    <ng-template>
        <pm-upload
            [uploadLabel]="'Modelle und Zeichnungen'"
            [uploadText]="'Drag & Drop oder {0} zum Upload'"
            [uploadTextLabel]="'wähle eine Datei'"
            [fileTag]="'Alle Dateitypen'"
            [required]="true"
        />
    </ng-template>

    <ng-template>
        <pm-upload
            [uploadLabel]="'Technische Details'"
            [uploadText]="'Drag & Drop oder {0} zum Upload'"
            [uploadTextLabel]="'wähle eine Datei'"
            [fileTag]="'Alle Dateitypen'"
            [required]="true"
        />
    </ng-template>

    <ng-template>
        <pm-upload
        [uploadLabel]="'Herstellungshinweise'"
        [uploadText]="'Drag & Drop oder {0} zum Upload'"
            [uploadTextLabel]="'wähle eine Datei'"
        [fileTag]="'Alle Dateitypen'"
        />
    </ng-template>

    <ng-template>
        <pm-upload
            [uploadLabel]="'(Installations- und Nutzungs) Anweisungen'"
            [uploadText]="'Drag & Drop oder {0} zum Upload'"
            [uploadTextLabel]="'wähle eine Datei'"
            [fileTag]="'Alle Dateitypen'"
            [required]="true"
        />
    </ng-template>

    <ng-template>
        <pm-upload
            [uploadLabel]="'Begleitdokumente und Sonstiges'"
            [uploadText]="'Drag & Drop oder {0} zum Upload'"
            [uploadTextLabel]="'wähle eine Datei'"
            [fileTag]="'Alle Dateitypen'"
        />
    </ng-template>
  `
}
