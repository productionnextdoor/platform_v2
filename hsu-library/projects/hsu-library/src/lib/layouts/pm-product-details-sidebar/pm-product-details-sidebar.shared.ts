import { ICardProperty } from '../../shared/info-card-section-data.shared';

export interface IPropertySection {
  sectionTitle: string;
  content: string;
  groups: IPropertyGroup[];
}

export interface IPropertyGroup {
  groupTitle: string;
  properties: ICardProperty[];
}


export interface IProductDetailsSidebarLocalisations {
  sidebarTitle: string;
  fileSectionTitle: string;
  sharepointLinkLabel: string;
}

export const productDetailsSidebarLocalisations: IProductDetailsSidebarLocalisations = {
  sidebarTitle: '',
  fileSectionTitle: '',
  sharepointLinkLabel: '',
}
