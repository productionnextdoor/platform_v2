import { IProductDeliveryAddress } from '../../../lib/layouts/pm-product-delivery-address/pm-product-delivery-address.shared';

interface IProductDeliveryAddressData {
  productDeliveryAddressLocalisations: {
    bannerText: string;
    titleText: string;
    descriptionText: string;
    nameLabel: string;
    streetLabel: string;
    zipCodeLabel: string;
    cityLabel: string;
    phoneLabel: string;
    emailLabel: string;
    inputErrorMessages: string[];
  },
  productId: number;
  isAdminView: boolean;
  deliveryAddress: IProductDeliveryAddress;
}

export const productDeliveryAddressData: IProductDeliveryAddressData = {
  productDeliveryAddressLocalisations: {
    bannerText: 'Bitte gebe hier die Adresse an zu der das fertige Produkt geliefert werden soll. (Admin)',
    titleText: 'Lieferadresse',
    descriptionText: 'Bitte gebe hier die Anschrift und den Namen des Empfängers an zu welchem das fertige Produkt geliefert werden soll.',
    nameLabel: 'Vor - und Zuname',
    streetLabel: 'Straße inkl. Hausnummer',
    zipCodeLabel: 'Postleitzahl',
    cityLabel: 'Stadt',
    phoneLabel: 'Telefonnummer',
    emailLabel: 'E-Mail Adresse',
    inputErrorMessages: ['Erforderliches Feld']
  },
  productId: 0,
  isAdminView: false,
  deliveryAddress: {
    productId: 0,
    name: 'Max Mustermann',
    street: 'Musterstraße 1',
    zipCode: '12345',
    city: 'Musterstadt',
    phone: '0123456789',
    email: 'max@mustermann.de',
  }
}
