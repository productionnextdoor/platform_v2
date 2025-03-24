import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { Icon } from '../../components/pm-icon/pm-icon.shared';


@Pipe({
  name: 'FiletypeIcon'
})
export class PmFiletypeIconPipe implements PipeTransform {

  transform(fileName: string): Icon {
    const fileExtension: string = fileName.split('.').pop() ?? 'pdf'

    return this.getFileExtension(fileExtension);
  }

  getFileExtension(fileExtension: string): Icon {
    switch (fileExtension) {
    case 'cad':
      return Icon.CAD_FILE;
    case 'exl':
      return Icon.EXL_FILE;
    case 'jpg':
    case 'png':
      return Icon.IMG_FILE;
    case 'pdf':
      return Icon.PDF_FILE;
    default:
      return Icon.INFO;
    }
  }
}
