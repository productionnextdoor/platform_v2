import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import {
  IMaterialItemLocalisations,
  materialItemLocalisations
} from '../pm-material-item/pm-material-item.shared';

export interface IMaterialGroup {
  materialGroupId: number;
  name: string;
  localizedName: string;
  options: PmDropdownOption<number>[];
}

export interface IMaterialGroupLocalisations {
  bannerText: string;
  titleText: string;
  descriptionText: string;
  materialItem: IMaterialItemLocalisations
}

export const materialGroupLocalisations: IMaterialGroupLocalisations = {
  bannerText: '',
  titleText: '',
  descriptionText: '',
  materialItem: materialItemLocalisations
};
