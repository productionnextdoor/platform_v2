import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  PmDropdownOption,
  IProductPopupTextOptions,
  IProductPopupButtons
} from 'hsu-library';
import {
  WithRx
} from '../../shared/mixins/with-rx.mixin';
import {
  IProductWithStateModel,
  ProductApiService
} from '../../services/products/product-api.service';
import {
  ProductState
} from '../../shared/service-proxies/service-proxies';
import {
  forkJoin
} from 'rxjs';
import {
  IUserService
} from '../../services/user/iuser.services';
import {
  AppLocalizationService
} from '../../services/localization/app-localization.service';

@Component({
  selector: 'admin-product-popup',
  templateUrl: './admin-product-popup.component.html'
})
export class AdminProductPopupComponent extends WithRx() implements OnInit, OnDestroy {

  @Input()
  productId: number = 0;

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  developerOptions: PmDropdownOption<number>[] = [];

  productModel: IProductWithStateModel = {
    productId: 0,
    productName: '',
    developerId: 0,
    description: '',
    state: ProductState.Draft
  };

  popupStrings: IProductPopupTextOptions = {
    popupTitle: '',
    titleProduct: '',
    titleDeveloper: '',
    productNumberText: '',
    creationDateText: '',
    productNameTexts: {
      label: '',
      placeholder: '',
    },
    developerTexts: {
      label: '',
      placeholder: '',
    },
    descriptionTexts: {
      label: '',
      placeholder: '',
    },
  };

  buttonLabel: IProductPopupButtons = {
    closeLabel: '',
    saveLabel: '',
    publishLabel: '',
  }


  constructor(
      private readonly productPopupService: ProductApiService,
      private readonly userService: IUserService,
      private readonly localizationService:AppLocalizationService) {
    super();
  }

  ngOnInit(): void {
    this.initProductModel();
    this.popupStrings = this.getPopupStrings();
    this.buttonLabel = this.getButtonLabel();
  }

  initProductModel(): void {
    forkJoin([
      this.productPopupService.getBaseProductOrEmpty(this.productId),
      this.userService.getDevelopersAsDropdownOptions()
    ]).subscribe({
      next: ([productData, developerOptions]) => {
        this.productModel = productData;
        this.developerOptions = developerOptions;
      }
    });
  }

  saveProduct () {
    this.productPopupService.saveProduct({
      ...this.productModel,
      state: ProductState.Draft
    } as IProductWithStateModel).subscribe({
      next: (result) => {
        this.productModel = this.productPopupService.listDtoToProductModel(result)
      }
    });
  }

  publishProduct(): void {
    this.productPopupService.saveProduct({
      ...this.productModel,
      state: ProductState.InProcessDeveloper
    } as IProductWithStateModel)
      .subscribe({
        next: () => {
          this.closePopup();
        }
      });
  }

  closePopup() {
    this.onClose.emit();
  }

  private getPopupStrings(): IProductPopupTextOptions {
    return {
      popupTitle: this.localizationService.loc('ProductPopupText.Title'),
      titleProduct: this.localizationService.loc('ProductPopupText.TitleProduct'),
      titleDeveloper: this.localizationService.loc('ProductPopupText.TitleDeveloper'),
      productNumberText: this.localizationService.loc('ProductPopupText.ProductNumber'),
      creationDateText: this.localizationService.loc('ProductPopupText.CreationDate'),
      productNameTexts: {
        label: this.localizationService.loc('ProductPopupText.NameLabel'),
        placeholder: this.localizationService.loc('ProductPopupText.NamePlaceholder'),
      },
      developerTexts: {
        label: this.localizationService.loc('ProductPopupText.DeveloperLabel'),
        placeholder: this.localizationService.loc('ProductPopupText.DeveloperPlaceholder'),
      },
      descriptionTexts: {
        label: this.localizationService.loc('ProductPopupText.DescriptionLabel'),
        placeholder: this.localizationService.loc('ProductPopupText.DescriptionPlaceholder'),
      },
    }
  }

  private getButtonLabel(): IProductPopupButtons {
    return {
      closeLabel: this.localizationService.loc('ProductPopupButton.CloseLabel'),
      saveLabel: this.localizationService.loc('ProductPopupButton.SaveLabel'),
      publishLabel: this.localizationService.loc('ProductPopupButton.PublishLabel'),
    }
  }
}
