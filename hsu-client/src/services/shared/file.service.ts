import {
  FileItem,
  FileUploader,
  FileUploaderOptions
} from 'ng2-file-upload';
import { AppConsts } from '../../shared/AppConsts';
import { IAjaxResponse, TokenService } from 'abp-ng2-module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class FileService {

  private readonly uploader: FileUploader;
  private readonly uploaderOptions: FileUploaderOptions;

  constructor(uploadUrl: string, private readonly _tokenService: TokenService, private readonly http: HttpClient) {
    this.uploaderOptions = {
      url: AppConsts.remoteServiceBaseUrl + uploadUrl
    }
    this.uploader = new FileUploader(this.uploaderOptions);
    this.initFileUploaderOptions();
  }

  public getFileUploader(): FileUploader {
    return this.uploader;
  }

  public sendGetRequest(url: string): Observable<Blob> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Authorization': 'Bearer ' + this._tokenService.getToken()
    });

    return this.http.get(url, {
      headers, responseType: 'blob'
    })
  }

  public sendDeleteRequest(url: string): Observable<IAjaxResponse> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Authorization': 'Bearer ' + this._tokenService.getToken()
    });
    return this.http.delete<IAjaxResponse>(url, {
      headers
    })
  }

  public processDownload(file: Blob, fileName: string) {
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
  }

  private initFileUploaderOptions() {
    this.uploaderOptions.autoUpload = false;
    this.uploaderOptions.authToken = 'Bearer ' + this._tokenService.getToken();
    this.uploaderOptions.removeAfterUpload = true;
    this.uploader.onAfterAddingFile = (file: FileItem) => {
      file.withCredentials = false;
    };
    this.uploader.setOptions(this.uploaderOptions);
  }

}
