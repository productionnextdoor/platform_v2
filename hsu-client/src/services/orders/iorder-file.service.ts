import {
  FileUploader,
} from 'ng2-file-upload';
import {Observable} from 'rxjs';

export abstract class IOrderFileService {

  abstract getFileUploader(): FileUploader;

  abstract downloadOrderDocuments(orderId: number): Observable<void>;
}
