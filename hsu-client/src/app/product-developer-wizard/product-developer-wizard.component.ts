import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { AppLocalizationService } from '../../services/localization/app-localization.service';
import {
  IProductCreateOrEditLocalisation,
  IStep
} from './product-developer-wizard.shared';
import { IProductApiService } from '../../services/products/iproduct-api.service';
import { WizardStepType } from '../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../shared/AppConsts';

@Component({
  selector: 'product-developer-wizard',
  templateUrl: './product-developer-wizard.component.html',
})
export class ProductDeveloperWizardComponent implements OnInit, AfterViewInit {
  @Input()
  productId: number = 0;

  @Input()
  title: string = '';

  @Input()
  isAdminView: boolean = false;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  @ViewChild('generalInfo') generalInfo!: TemplateRef<Element>;
  @ViewChild('deliveryAddress') deliveryAddress!: TemplateRef<Element>;
  @ViewChild('materialGroups') materialGroups!: TemplateRef<Element>;
  @ViewChild('variants') variants!: TemplateRef<Element>;
  @ViewChild('sortingMeasurements') sortingMeasurements!: TemplateRef<Element>;
  @ViewChild('fileUpload') fileUpload!: TemplateRef<Element>;

  protected dynamicTemplates: TemplateRef<Element>[] = [];

  protected processingNextStepSuccess: Subject<boolean> = new Subject<boolean>();

  protected saveGeneralInfo: Subject<void> = new Subject<void>();

  protected saveDeliveryAddress: Subject<void> = new Subject<void>();

  protected saveMaterialGroups: Subject<void> = new Subject<void>();

  protected saveVariantInfo: Subject<void> = new Subject<void>();

  protected saveSortingInfo: Subject<void> = new Subject<void>();

  protected saveUploadInfo: Subject<void> = new Subject<void>();

  protected isValid: boolean = false;

  protected steps: IStep[];

  protected currentStep: number = 0;

  protected showWizard: boolean = false;

  protected localisations: IProductCreateOrEditLocalisation;

  private isSaving: boolean = false;

  protected readonly WizardStepType = WizardStepType;


  constructor(
    private readonly localizationService: AppLocalizationService,
    private productApiService: IProductApiService
  ) {
    this.steps = this.createWizardSteps();
    this.localisations = this.getLocalisations();
  }

  ngAfterViewInit(): void {
    this.dynamicTemplates = [
      this.generalInfo,
      ...(AppConsts.IsOffer ? [this.deliveryAddress] : []),
      this.materialGroups,
      ...(AppConsts.HasVariants ? [this.variants, this.sortingMeasurements,] : []),
      this.fileUpload,
    ];
  }

  ngOnInit(): void {
    this.productApiService.getWizardStep(this.productId).subscribe((stepType: WizardStepType): void => {
      const index: number = this.steps.findIndex(step => step.wizardStepType === stepType);
      this.currentStep = index >= 0 ? index : 0;
      this.showWizard = true;
    });
  }

  onStepChange() {
    this.isValid = false;
  }

  // eslint-disable-next-line complexity
  onSave(wizardStep: number) {

    this.isSaving = true;

    this.currentStep = wizardStep;

    if (!this.isValid) {
      return;
    }
    const step: WizardStepType = this.steps[wizardStep].wizardStepType
    switch (step) {
    case WizardStepType.General:
      this.saveGeneralInfo.next();
      break;
    case WizardStepType.DeliveryAddress:
      this.saveDeliveryAddress.next();
      break;
    case WizardStepType.MaterialGroups:
      this.saveMaterialGroups.next();
      break;
    case WizardStepType.Variants:
      this.saveVariantInfo.next();
      break;
    case WizardStepType.SortingMeasurements:
      this.saveSortingInfo.next();
      break;
    case WizardStepType.Files:
      this.saveUploadInfo.next();
      break;
    }
  }

  handleSaveResult(success: boolean) {
    if (this.isSaving) {
      this.processingNextStepSuccess.next(success);
      this.isSaving = false;
    }

    if (this.isAdminView && this.currentStep === this.steps.length-1) {
      this.onClose.emit();
    }
  }

  onFinalize() {

    this.productApiService.finalizeForValueChainPlanning(this.productId)
      .subscribe(() => {
        this.onClose.emit();
      })
  }

  getStepDescriptions(): string[] {
    return this.steps.map(step => step.description);
  }

  private getLocalisations(): IProductCreateOrEditLocalisation {
    return {
      draft: this.localizationService.loc('ProductTableHeader.ProductNumber'),
      wizard: {
        cancel: this.localizationService.loc('DeveloperProductWizard.Cancel'),
        draft: this.localizationService.loc('ProductCreateOrEdit.Draft'),
        save: this.localizationService.loc('ProductCreateOrEdit.Save'),
        prevStep: this.localizationService.loc('DeveloperProductWizard.Previous'),
        nextStep: this.localizationService.loc('DeveloperProductWizard.Next'),
        cancelConfirmationTitle: this.localizationService.loc('DeveloperProductWizard.CancelConfirmationTitle'),
        cancelConfirmationDescription: this.localizationService.loc('DeveloperProductWizard.CancelConfirmationDescription'),
        confirm: this.localizationService.loc('DeveloperProductWizard.Confirm'),
        saveAsAdmin: this.localizationService.loc('DeveloperProductWizard.SaveAsAdmin'),
        confirmPopup: {
          title: this.localizationService.loc('DeveloperProductWizard.ConfirmPopup.Title'),
          description: this.localizationService.loc('DeveloperProductWizard.ConfirmPopup.Description'),
          confirm: this.localizationService.loc('DeveloperProductWizard.ConfirmPopup.Confirm'),
          cancel: this.localizationService.loc('DeveloperProductWizard.ConfirmPopup.Cancel'),
        }
      }
    }
  }

  private createWizardSteps(): IStep[] {
    return [
      {
        wizardStepType: WizardStepType.General, description: this.localizationService.loc('ProductCreateOrEditGeneral.Title')
      },
      {
        wizardStepType: WizardStepType.DeliveryAddress, description: this.localizationService.loc('ProductCreateOrEditDeliveryAddress.Title')
      },
      {
        wizardStepType: WizardStepType.MaterialGroups,
        description: this.localizationService.loc('ProductCreateOrEditMaterialGroups.Title')
      },
      ...(AppConsts.HasVariants ? [
        {
          wizardStepType: WizardStepType.Variants, description: this.localizationService.loc('ProductCreateOrEditVariants.Title')
        },
        {
          wizardStepType: WizardStepType.SortingMeasurements,
          description: this.localizationService.loc('ProductCreateOrEditSortingMeasurements.Title')
        },
      ] : []),
      {
        wizardStepType: WizardStepType.Files, description: this.localizationService.loc('ProductCreateOrEditFiles.Title')
      },
    ];
  }
}
