import { EPmInputType } from '../../../lib/components/pm-input/pm-input.component';

export interface IColData {
  gap: number;
  ngContent: string;
}

export const colData: IColData = {
  gap: 16,
  ngContent: `
      <pm-text>pm-col example</pm-text>
      <pm-input label="E-Mail" type="${EPmInputType.TEXT}" placeholder="Enter E-Mail" />
      <pm-input label="Message" type="${EPmInputType.TEXTAREA}" placeholder="Message" />
      <pm-button label="Submit" fullWidth="true" />
  `
}
