
export interface IUploadData {
  uploadText: string;
  uploadTextLabel:string
  fileTag: string;
  uploadLabel: string;
}

export const UploadData: IUploadData = {
  uploadText: 'Drag & Drop oder {0} zum Upload',
  uploadTextLabel: 'wähle eine Datei',
  fileTag: 'Alle Dateitypen',
  uploadLabel: 'Beschreibung',
}
