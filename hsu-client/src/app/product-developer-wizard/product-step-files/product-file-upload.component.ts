import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AppLocalizationService } from '../../../services/localization/app-localization.service';
import {
  IFileUploadLocalisations,
  IFileNameByCategory,
  PmFiletagCategoryPipe,
  IUploadFiles
} from 'hsu-library';
import { WithRx } from '../../../shared/mixins/with-rx.mixin';
import { Observable } from 'rxjs';
import {
  FileItem,
  FileUploader,
} from 'ng2-file-upload';
import { IAjaxResponse } from 'abp-ng2-module';
import {
  ProductFileCategory,
  ProductFilesStepOutput
} from '../../../shared/service-proxies/service-proxies'
import { IProductFileService } from '../../../services/products/iproduct-file.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProductApiService } from '../../../services/products/iproduct-api.service';

export interface IFileOver {
  fileOver: boolean;
  category: ProductFileCategory
}

export interface IFilesDrop {
  fileItems: File[];
  category: ProductFileCategory
}

@Component({
  selector: 'product-file-upload',
  templateUrl: './product-file-upload.component.html'
})
export class ProductFileUploadComponent extends WithRx() implements OnInit {

  @Input()
  public productId: number = 0;

  @Input()
  public isValid: boolean = false;

  @Input()
  public saveUploadInfo!: Observable<void>;

  @Input()
  public isAdminView: boolean = false;

  @Output()
  public isValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onSaveSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();


  protected localisations: IFileUploadLocalisations;
  protected uploader: FileUploader;
  protected fileData: IFileNameByCategory[] = [];
  protected sharepointLink: string = '';
  protected productDescription: string = '';

  private destroyRef: DestroyRef = inject(DestroyRef);

  //Drop zone flags
  protected productDescriptionActive: boolean = false;
  protected productPictureActive: boolean = false;
  protected technicalDetailsActive: boolean = false;
  protected miscellaneousActive: boolean = false;
  protected modelsAndDrawingsActive: boolean = false;
  protected manufacturingHintsActive: boolean = false;
  protected installationAndUsageInstructions: boolean = false;

  protected readonly ProductFileCategory = ProductFileCategory;

  constructor(
    private productFileService: IProductFileService,
    private localizationService: AppLocalizationService,
    private productApiService: IProductApiService,
    private fileTagCategoryPipe: PmFiletagCategoryPipe
  ) {
    super();
    this.uploader = this.productFileService.getFileUploader();
    this.localisations = {
      bannerText: this.localizationService.loc('ProductCreateOrEditGeneral.Note'),
      titleText: this.localizationService.loc('ProductCreateOrEditFiles.Title'),
      descriptionText: this.localizationService.loc('ProductCreateOrEditFiles.Description'),
      sharepointLinkLabel: this.localizationService.loc('ProductCreateOrEditFiles.SharepointLink.Label'),
      sharepointLinkPlaceholder: this.localizationService.loc('ProductCreateOrEditFiles.SharepointLink.Placeholder'),
      descriptionLabel: this.localizationService.loc('ProductCreateOrEditFiles.Description.Label'),
      descriptionPlaceholder: this.localizationService.loc('ProductCreateOrEditFiles.Description.Placeholder'),
      fileTag: this.localizationService.loc('ProductCreateOrEditFiles.FileTag'),
      uploadText: this.localizationService.loc('ProductCreateOrEditFiles.UploadText'),
      productDescription: this.localizationService.loc('ProductCreateOrEditFiles.UploadCategory.ProductDescription'),
      productPicture: this.localizationService.loc('ProductCreateOrEditFiles.UploadCategory.ProductPicture'),
      modelsAndDrawings: this.localizationService.loc('ProductCreateOrEditFiles.UploadCategory.ModelsAndDrawings'),
      technicalDetails: this.localizationService.loc('ProductCreateOrEditFiles.UploadCategory.TechnicalDetails'),
      manufacturingHints: this.localizationService.loc('ProductCreateOrEditFiles.UploadCategory.ManufacturingHints'),
      installationAndUsageInstructions: this.localizationService.loc('ProductCreateOrEditFiles.UploadCategory.InstallationAndUsageInstructions'),
      miscellaneousDocuments: this.localizationService.loc('ProductCreateOrEditFiles.UploadCategory.Miscellaneous'),
      categoryNames: {
        ProductDescription: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.ProductDescription'),
        ProductPicture: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.ProductPicture'),
        ModelsAndDrawings: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.ModelsAndDrawings'),
        TechnicalDetails: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.TechnicalDetails'),
        ManufacturingHints: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.ManufacturingHints'),
        InstallationAndUsageInstructions: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.InstallationAndUsageInstructions'),
        Miscellaneous: this.localizationService.loc('ProductCreateOrEditFiles.FileCategory.Miscellaneous')
      },
      inputErrorMessages: [this.localizationService.loc('Error.InputField.RequiredMissing')],
    }
  }

  ngOnInit() {
    this.initFileUploader();
    this.initProductFilesInformation();
    this.initSavingProductFilesInformation();
  }

  protected onFileDrop(filesDropped: IFilesDrop) {
    if (this.uploader.isUploading) {
      return;
    }
    this.uploader.addToQueue(filesDropped.fileItems);
    this.startUpload(filesDropped.category);
  }

  protected onFilesSelected(fileUpload: IUploadFiles) {
    if (this.uploader.isUploading) {
      return;
    }
    this.uploader.addToQueue(fileUpload.files);
    this.startUpload(Number(fileUpload.uploadId) ?? 0)
  }

  private startUpload(category: ProductFileCategory) {
    // This is a functions signature, can't change that
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
      form.append('ProductId', this.productId);
      form.append('FileCategory', category);
    };
    this.isValidChange.emit(false);
    this.uploader.uploadAll();
  }

  protected onDeleteFile(fileId: number) {
    this.productFileService.deleteFile(fileId).subscribe(
      {
        next: (response: IAjaxResponse) => {
          if (response.success) {
            const index: number = this.fileData.findIndex(file => file.fileId === fileId);
            this.fileData.splice(index, 1);
            this.fileData = [...this.fileData];
          }
          this.validateFormData();
        },
      });
  }

  protected fileOverDropZone(fileOver: IFileOver): void {
    this.productDescriptionActive = this.isDropZoneActive(fileOver, ProductFileCategory.ProductDescription);
    this.productPictureActive = this.isDropZoneActive(fileOver, ProductFileCategory.ProductPicture);
    this.technicalDetailsActive = this.isDropZoneActive(fileOver, ProductFileCategory.TechnicalDetails);
    this.miscellaneousActive = this.isDropZoneActive(fileOver, ProductFileCategory.Miscellaneous);
    this.modelsAndDrawingsActive = this.isDropZoneActive(fileOver, ProductFileCategory.ModelsAndDrawings);
    this.manufacturingHintsActive = this.isDropZoneActive(fileOver, ProductFileCategory.ManufacturingHints);
    this.installationAndUsageInstructions = this.isDropZoneActive(fileOver, ProductFileCategory.InstallationAndUsageInstructions);
  }

  protected validateFormData(): void {
    const allFilesExist: boolean = this.getRequiredCategories().every((category) => {
      return this.fileTagCategoryPipe.transform(this.fileData, category).length > 0;
    })
    this.isValidChange.emit(allFilesExist && this.productDescription !== '');
  }

  private initFileUploader(): void {
    this.uploader.onSuccessItem = (item: FileItem, response: string) => {
      const resp: IAjaxResponse = <IAjaxResponse>JSON.parse(response);
      if (resp.success) {
        this.fileData = [
          ...this.fileData,
          this.productFileService.mapFileDtoToFileNameByCategory(resp.result)
        ]
      }
    };

    this.uploader.onCompleteAll = () => this.validateFormData();
  }

  private initProductFilesInformation() {
    this.productApiService.getProductFilesInformation(this.productId).subscribe({
      next: (productFilesInfo: ProductFilesStepOutput) => {
        this.setAndValidateData(productFilesInfo);
      }
    });
  }

  private initSavingProductFilesInformation() {
    this.saveUploadInfo.pipe(
      takeUntilDestroyed(this.destroyRef),
      this.switchMapCancelable(() => this.productApiService.saveProductFilesInformation(this.productId, this.sharepointLink, this.productDescription))
    ).subscribe({
      next: (productFilesInfo: ProductFilesStepOutput) => {
        this.setAndValidateData(productFilesInfo);
        this.onSaveSuccess.emit(true);
      },
      error: () => {
        this.onSaveSuccess.emit(false);
      }
    });
  }

  private setAndValidateData(productFilesInfo: ProductFilesStepOutput) {
    this.sharepointLink = productFilesInfo.sharepointLink ?? '';
    this.productDescription = productFilesInfo.productDescription ?? '';
    this.fileData = productFilesInfo.productFileDtos?.map(productFileDto => {
      return this.productFileService.mapFileDtoToFileNameByCategory(productFileDto)
    }) ?? []
    this.validateFormData();
  }

  private getRequiredCategories(): string[] {
    return Object.keys(ProductFileCategory).filter((item) =>
      isNaN(Number(item)) &&
      item !== ProductFileCategory[ProductFileCategory.Miscellaneous]
    );
  }

  private isDropZoneActive(fileOver: IFileOver, category: ProductFileCategory): boolean {
    return fileOver.fileOver && fileOver.category === category;
  }
}
