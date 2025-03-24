import { EPmInputType } from '../../../lib/components/pm-input/pm-input.component';

export interface IRowData {
  gap: number;
  template: string;
  ngContent: string;
}

export const rowData: IRowData = {
  gap: 16,
  template: '1fr 2fr',
  ngContent: `
      <div>
          <pm-input label="E-Mail" type="${EPmInputType.TEXT}" placeholder="Enter E-Mail" />
          <pm-text>pm-row example</pm-text>
          <pm-button label="Submit" fullWidth="true" />
      </div>
      <pm-input label="Message" type="${EPmInputType.TEXTAREA}" placeholder="Message" />
  `
}
