export interface IProductModel {
    productName: string,
    developerId: number,
    description: string,
    productNumber?: number,
    creationDate?: Date,
}

export interface IProductPopupTextOptions {
  popupTitle: string,
  titleProduct: string;
  titleDeveloper: string;
  productNumberText: string;
  creationDateText: string;
  productNameTexts: IProductPopupText;
  developerTexts: IProductPopupText;
  descriptionTexts: IProductPopupText;
}

export interface IProductPopupText {
    label: string;
    placeholder: string;
}

export interface IProductPopupButtons {
    closeLabel: string;
    saveLabel: string;
    publishLabel: string;
}
