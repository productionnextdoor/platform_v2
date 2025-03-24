export const labelData: ILabelData = {
  text: 'Label',
  for: 'example',
  required: false,
  inline: false,
  bold: false,
}

export interface ILabelData {
  text: string;
  for: string;
  required: boolean;
  inline: boolean;
  bold: boolean;
}
