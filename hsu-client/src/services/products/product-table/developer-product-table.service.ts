import { Injectable } from '@angular/core';
import {
  EActionButtonElementType,
  Icon,
  PmDropdownOption,
} from 'hsu-library';
import {
  ProductState
} from '../../../shared/service-proxies/service-proxies';
import {
  EWizardType,
  ProductTableBaseService
} from './product-table-base.service';
import { AppLocalizationService } from '../../localization/app-localization.service';
import { ITableBaseService } from '../../table/itable-base.service';


@Injectable()
export class DeveloperProductTableService extends ProductTableBaseService {

  private readonly blockedFilterOptions: ProductState[] = [
    ProductState.Draft
  ]

  constructor(localizationService:AppLocalizationService, tableBaseService: ITableBaseService) {
    super(localizationService, tableBaseService, EWizardType.DeveloperProductWizard);
    this.initProductStateEnumMap();
  }

  public override getStateOptions(): PmDropdownOption<string>[] {
    return super.getStateOptions(this.blockedFilterOptions);
  }

  protected override getActionIcon(productState: ProductState): Icon {
    switch (productState) {
    case ProductState.InProcessDeveloper:
      return Icon.NEW_WINDOW;
    default:
      return Icon.ARROW;
    }
  }

  protected override getActionType(productState: ProductState): EActionButtonElementType {
    switch (productState) {
    case ProductState.InProcessDeveloper:
      return EActionButtonElementType.DEVELOPER_PRODUCT_WIZARD;
    default:
      return EActionButtonElementType.PRODUCT_DETAILS;
    }
  }
}

