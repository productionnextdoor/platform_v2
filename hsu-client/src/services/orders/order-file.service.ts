import { Injectable } from '@angular/core';
import {
  FileUploader,
} from 'ng2-file-upload';
import { AppConsts } from '../../shared/AppConsts';
import { map, Observable } from 'rxjs';
import { IOrderFileService } from './iorder-file.service';
import { FileService } from '../shared/file.service';
import { TokenService } from 'abp-ng2-module';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class OrderFileService implements IOrderFileService {

  private readonly fileService: FileService;

  constructor(readonly _tokenService: TokenService, private readonly http: HttpClient) {
    this.fileService = new FileService('/OrderDocuments/UploadFile', this._tokenService, this.http)
  }

  public getFileUploader(): FileUploader {
    return this.fileService.getFileUploader();
  }

  public downloadOrderDocuments(orderId: number): Observable<void> {
    const url: string = `${AppConsts.remoteServiceBaseUrl}/OrderDocuments/DownloadFiles/?orderId=${orderId}`;

    return this.fileService
      .sendGetRequest(url)
      .pipe(
        map(archive => this.fileService.processDownload(archive, `Order-${orderId}-Files.zip`))
      );
  }

}
