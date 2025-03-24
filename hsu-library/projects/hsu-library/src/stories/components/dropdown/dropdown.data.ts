import { PmDropdownOption } from '../../../lib/components/pm-dropdown/pm-dropdown.shared';
import { PmComponentMargin, IComponentMargin } from '../../../lib/utils/pm-component-margin';

interface IInputData {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  active: boolean;
  searchable: boolean;
  disabled: boolean;
  hovered: boolean;
  required: boolean;
  options: PmDropdownOption<string>[];
  margin: IComponentMargin;
}

export const DropdownData: IInputData = {
  label: 'Label',
  name: 'example',
  placeholder: 'Placeholder',
  value: '',
  active: false,
  searchable: false,
  disabled: false,
  hovered: false,
  required: false,
  options: [
    {
      key: '1',
      value: 'Selection 1'
    },
    {
      key: '2',
      value: 'Selection 2'
    },
    {
      key: '3',
      value: 'Selection 3'
    },
    {
      key: '4',
      value: 'Selection 4'
    },
    {
      key: '5',
      value: 'Selection 5'
    },
    {
      key: '6',
      value: 'Selection 6'
    },
    {
      key: '7',
      value: 'Selection 7'
    },
    {
      key: '8',
      value: 'Selection 8'
    },
    {
      key: '9',
      value: 'Selection 9'
    },
    {
      key: '10',
      value: 'Selection 10'
    }
  ],
  margin: new PmComponentMargin(),
};
