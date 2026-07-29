import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { AppLocalizationService } from '../../services/localization/app-localization.service';
import { IProductCreateOrEditLocalisation } from './product-developer-wizard.shared';
import { IProductApiService } from '../../services/products/iproduct-api.service';
import { WizardStepType } from '../../shared/service-proxies/service-proxies';

@Component({
  selector: 'product-developer-wizard',
  templateUrl: './product-developer-wizard.component.html',
})
export class ProductDeveloperWizardComponent implements OnInit {
  @Input()
  productId: number = 0;

  @Input()
  title: string = '';

  @Input()
  isAdminView: boolean = false;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  protected processingNextStepSuccess: Subject<boolean> = new Subject<boolean>();

  protected saveGeneralInfo: Subject<void> = new Subject<void>();

  protected saveMaterialGroups: Subject<void> = new Subject<void>();

  protected saveVariantInfo: Subject<void> = new Subject<void>();

  protected saveSortingInfo: Subject<void> = new Subject<void>();

  protected saveUploadInfo: Subject<void> = new Subject<void>();

  protected isValid: boolean = false;

  protected steps: string[];

  protected currentStep: WizardStepType = WizardStepType.General;

  protected showWizard: boolean = false;

  protected localisations: IProductCreateOrEditLocalisation;

  private isSaving: boolean = false;


  constructor(
    private readonly localizationService: AppLocalizationService,
    private productApiService: IProductApiService
  ) {
    this.steps = [
      this.localizationService.loc('ProductCreateOrEditGeneral.Title'),
      this.localizationService.loc('ProductCreateOrEditMaterialGroups.Title'),
      this.localizationService.loc('ProductCreateOrEditVariants.Title'),
      this.localizationService.loc('ProductCreateOrEditSortingMeasurements.Title'),
      this.localizationService.loc('ProductCreateOrEditFiles.Title'),
    ];

    this.localisations = {
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

  ngOnInit(): void {
    this.productApiService.getWizardStep(this.productId).subscribe((stepType) => {
      this.currentStep = stepType;
      this.showWizard = true;
    });
  }

  onStepChange() {
    this.isValid = false;
  }

  // eslint-disable-next-line complexity
  onSave(step: WizardStepType) {
    this.isSaving = true;
    this.currentStep = step;

    if (!this.isValid) {
      return;
    }

    switch (step) {
    case WizardStepType.General:
      this.saveGeneralInfo.next();
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

    if (this.isAdminView && this.currentStep === WizardStepType.Files) {
      this.onClose.emit();
    }
  }

  onFinalize() {
    this.productApiService.finalizeForValueChainPlanning(this.productId)
      .subscribe(() => {
        this.onClose.emit();
      })
  }

  protected readonly WizardStepType = WizardStepType;
}
