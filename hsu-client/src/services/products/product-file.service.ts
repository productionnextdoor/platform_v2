import { Injectable } from '@angular/core';
import {
  FileUploader,
} from 'ng2-file-upload';
import { AppConsts } from '../../shared/AppConsts';
import {
  FileCategory,
  IFileNameByCategory
} from 'hsu-library';
import {
  ProductFileCategory,
  ProductFileDto
} from '../../shared/service-proxies/service-proxies';
import {
  IAjaxResponse, TokenService,
} from 'abp-ng2-module';
import { IProductFileService } from './iproduct-file.service';
import { map, Observable } from 'rxjs';
import { FileService } from '../shared/file.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductFileService implements IProductFileService {

  private readonly fileCategoryEnumMap: Map<ProductFileCategory, FileCategory>;
  private readonly fileService: FileService;

  constructor(readonly _tokenService: TokenService, private readonly http: HttpClient) {
    this.fileService = new FileService('/ProductFile/UploadFile', this._tokenService, this.http)
    this.fileCategoryEnumMap = this.initFileCategoryEnumMap();
  }


  public getFileUploader(): FileUploader {
    return this.fileService.getFileUploader();
  }

  public getFileCategoryEnumValue(productFileCategory: ProductFileCategory): FileCategory {
    return this.fileCategoryEnumMap.get(productFileCategory) ?? FileCategory.Miscellaneous
  }

  public downloadFile(fileId: number, fileName: string): Observable<void> {
    const url: string = `${AppConsts.remoteServiceBaseUrl}/ProductFile/DownloadFile/?fileId=${fileId}`;
    return this.fileService.sendGetRequest(url).pipe(
      map(archive => this.fileService.processDownload(archive, fileName))
    );
  }

  public getImage(fileId: number): Observable<Blob> {
    const url: string = `${AppConsts.remoteServiceBaseUrl}/ProductFile/GetProductImage/?fileId=${fileId}`;
    return this.fileService.sendGetRequest(url);
  }

  public downloadProductFiles(productId: number, fileName: string): Observable<void> {
    const url: string = `${AppConsts.remoteServiceBaseUrl}/ProductFile/DownloadProductFiles/?productId=${productId}`;
    return this.fileService.sendGetRequest(url).pipe(
      map(archive => this.fileService.processDownload(archive, fileName))
    );
  }

  public deleteFile(fileId: number): Observable<IAjaxResponse> {
    const url: string = `${AppConsts.remoteServiceBaseUrl}/ProductFile/DeleteFile/?fileId=${fileId}`;
    return this.fileService.sendDeleteRequest(url);

  }

  public mapFileDtoToFileNameByCategory(productFileDto: ProductFileDto): IFileNameByCategory {
    return {
      fileId: productFileDto.fileId,
      fileName: productFileDto.fileName ?? '',
      categoryName: this.getFileCategoryEnumValue(productFileDto.fileCategory)
    }
  }

  private initFileCategoryEnumMap(): Map<ProductFileCategory, FileCategory> {
    return new Map<ProductFileCategory, FileCategory>([
      [ProductFileCategory.ProductDescription, FileCategory.ProductDescription],
      [ProductFileCategory.ProductPicture, FileCategory.ProductPicture],
      [ProductFileCategory.ModelsAndDrawings, FileCategory.ModelsAndDrawings],
      [ProductFileCategory.TechnicalDetails, FileCategory.TechnicalDetails],
      [ProductFileCategory.ManufacturingHints, FileCategory.ManufacturingHints],
      [ProductFileCategory.InstallationAndUsageInstructions, FileCategory.InstallationAndUsageInstructions],
      [ProductFileCategory.Miscellaneous, FileCategory.Miscellaneous],
    ]);
  }
}
