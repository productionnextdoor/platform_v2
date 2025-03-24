import {
  IProductPopupButtons,
  IProductPopupTextOptions
} from '../../../lib/layouts/pm-product-popup/pm-product-popup.shared';
import {PmDropdownOption} from '../../../lib/components/pm-dropdown/pm-dropdown.shared';

export interface IProductPopupData {
  ngContent: string;
  popupStrings: IProductPopupTextOptions;
  buttonLabel: IProductPopupButtons;
  optionsDeveloper: PmDropdownOption<number>[];
}

export const productPopupData: IProductPopupData = {
  ngContent: '',
  popupStrings: {
    popupTitle: 'Neues Produkt anlegen',
    titleProduct: 'Allgemeine Angaben',
    titleDeveloper: 'Entwickler zuweisen',
    productNumberText: 'Produktnummer',
    creationDateText: 'Erstelldatum',
    productNameTexts: {
      label: 'Name des Produkts',
      placeholder: 'Name des Produkts eingeben',
    },
    developerTexts: {
      label: 'Entwickler des Produkts eingeben oder auswählen',
      placeholder: 'Entwickler eingeben oder auswählen',
    },
    descriptionTexts: {
      label: 'Bemerkung',
      placeholder: 'Anmerkungen an den Entwickler',
    },
  },
  buttonLabel: {
    closeLabel: 'Abbrechen',
    saveLabel: 'Angaben speichern',
    publishLabel: 'Produkt freigeben',
  },
  optionsDeveloper: [
    {
      key: 1,
      value: 'Developer 1'
    },
    {
      key: 2,
      value: 'Developer 2'
    },
    {
      key: 3,
      value: 'Developer 3'
    },
    {
      key: 4,
      value: 'Developer 4'
    }
  ]
};
