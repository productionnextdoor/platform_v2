import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { IFileNameByCategory } from './pm-file-upload.shared';

@Pipe({
  name: 'FileTagsByCategory'
})
export class PmFiletagCategoryPipe implements PipeTransform {
  transform(fileData: IFileNameByCategory[], category?: string): IFileNameByCategory[] {
    return fileData.filter(file => file.categoryName === category);
  }
}
