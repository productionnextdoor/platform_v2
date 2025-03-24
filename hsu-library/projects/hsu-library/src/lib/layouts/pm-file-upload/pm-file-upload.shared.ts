
export interface IFileUploadLocalisations {
  bannerText: string;
  titleText: string;
  descriptionText: string;
  sharepointLinkLabel: string;
  sharepointLinkPlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  fileTag: string;
  uploadText: string;
  productDescription: string;
  productPicture: string;
  modelsAndDrawings: string;
  technicalDetails: string;
  manufacturingHints: string;
  installationAndUsageInstructions: string;
  miscellaneousDocuments: string;
  categoryNames: {[key: string]: string};
  inputErrorMessages: string[];
}

export const uploadLocalisations: IFileUploadLocalisations = {
  bannerText: '',
  titleText: '',
  descriptionText: '',
  sharepointLinkLabel: '',
  sharepointLinkPlaceholder: '',
  descriptionLabel: '',
  descriptionPlaceholder: '',
  fileTag: '',
  uploadText: '',
  productDescription: '',
  productPicture: '',
  modelsAndDrawings: '',
  technicalDetails: '',
  manufacturingHints: '',
  installationAndUsageInstructions: '',
  miscellaneousDocuments: '',
  categoryNames: {},
  inputErrorMessages: []
};

export interface IFileNameByCategory {
  fileId: number;
  fileName: string;
  categoryName: keyof typeof FileCategory;
}

export enum FileCategory {
  ProductDescription = 'ProductDescription',
  ProductPicture = 'ProductPicture',
  ModelsAndDrawings = 'ModelsAndDrawings',
  TechnicalDetails = 'TechnicalDetails',
  ManufacturingHints = 'ManufacturingHints',
  InstallationAndUsageInstructions = 'InstallationAndUsageInstructions',
  Miscellaneous = 'Miscellaneous'
}
