export interface IProductDeliveryAddress {
  productId: number;
  name: string;
  street: string;
  zipCode: string;
  city: string;
  phone: string;
  email: string;
}

export const defaultDeliveryAddress: IProductDeliveryAddress = {
  productId: 0,
  name: '',
  street: '',
  zipCode: '',
  city: '',
  phone: '',
  email: ''
}

export interface IProductDeliveryAddressLocalisations {
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
}

export const defaultProductDeliveryAddressLocalisations: IProductDeliveryAddressLocalisations = {
  bannerText: '',
  titleText: '',
  descriptionText: '',
  nameLabel: '',
  streetLabel: '',
  zipCodeLabel: '',
  cityLabel: '',
  phoneLabel: '',
  emailLabel: '',
  inputErrorMessages: []
}
