import {
  Icon
} from '../../components/pm-icon/pm-icon.shared';


export interface IMenuItem<T> {
  menuId: number;
  logo: Icon;
  text: string;
  path: T;
  subPaths: T[];
  accessPermissions: string[];
}

export interface IMenuSelectEvent {
  activeId: number;
}

