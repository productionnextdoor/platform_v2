export interface IDeveloperRevenueCardLocalisations {
  mainTitle: string;
  subTitle: string;
  totalOrders: string;
  priceRange: string;
  royaltyRate: string;
  totalRevenue: string;
}

export const developerRevenueCardLocalisations: IDeveloperRevenueCardLocalisations = {
  mainTitle: '',
  subTitle: '',
  totalOrders: '',
  priceRange: '',
  royaltyRate: '',
  totalRevenue: '',
}

export interface IDeveloperRevenueInfo {
  totalOrders: number;
  priceRange: string;
  royaltyRate: number;
  totalRevenue: number;
}

export const developerRevenueInfo: IDeveloperRevenueInfo = {
  totalOrders: 0,
  priceRange: '',
  royaltyRate: 0,
  totalRevenue: 0,
}
