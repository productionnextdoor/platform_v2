import {
  PmComponentMargin,
  IComponentMargin
} from '../../../lib/utils/pm-component-margin';

export interface ITextData {
  type: string;
  text: string;
  margin: IComponentMargin;
}

export const textData: ITextData = {
  type: 'h1',
  text: 'Lorem ipsum',
  margin: new PmComponentMargin()
}
