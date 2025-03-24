import {
  IDeveloperRevenueCardLocalisations,
  IDeveloperRevenueInfo
} from '../../../lib/layouts/pm-developer-revenue-card/pm-developer-revenue-card.shared';

interface IDeveloperRevenueCardData {
  localisations: IDeveloperRevenueCardLocalisations;
  revenueData: IDeveloperRevenueInfo;
}

export const DeveloperRevenueCardData: IDeveloperRevenueCardData = {
  localisations: {
    mainTitle: 'Bestellungen & Profit',
    subTitle: 'Allgemein',
    totalOrders: 'Bestellungen insgesamt',
    priceRange: 'Preisspanne',
    royaltyRate: 'Mein Anteil pro Bestellung',
    totalRevenue: 'Bisheriger Verdienst',
  },
  revenueData: {
    totalOrders: 23,
    priceRange: '750.00 - 6500.00',
    royaltyRate: 5,
    totalRevenue: 2119.55,
  }
}
