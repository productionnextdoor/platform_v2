import {
  FileUploader,
} from 'ng2-file-upload';
import {
  FileCategory,
  IFileNameByCategory
} from 'hsu-library';
import {
  ProductFileCategory,
  ProductFileDto
} from '../../shared/service-proxies/service-proxies';
import {Observable} from 'rxjs';
import {IAjaxResponse} from 'abp-ng2-module';

export abstract class IProductFileService {

  abstract getFileUploader(): FileUploader;

  abstract getFileCategoryEnumValue(productFileCategory: ProductFileCategory): FileCategory;

  abstract downloadFile(fileId: number, fileName:string): Observable<void>;

  abstract getImage(fileId: number): Observable<Blob>;

  abstract downloadProductFiles(productId: number, fileName:string): Observable<void>

  abstract deleteFile(fileId: number): Observable<IAjaxResponse>;

  abstract mapFileDtoToFileNameByCategory(productFileDto: ProductFileDto): IFileNameByCategory;

}
