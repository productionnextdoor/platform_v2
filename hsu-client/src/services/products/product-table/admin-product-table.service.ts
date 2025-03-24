import { Injectable } from '@angular/core';
import {
  EActionButtonElementType,
  Icon,
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
export class AdminProductTableService extends ProductTableBaseService {

  constructor( localizationService: AppLocalizationService, tableBaseService: ITableBaseService) {
    super(localizationService, tableBaseService, EWizardType.BaseProductWizard);
  }

  protected getActionIcon(productState: ProductState): Icon {
    switch (productState) {
    case ProductState.Draft:
      return Icon.NEW_WINDOW;
    default:
      return Icon.ARROW;
    }
  }

  protected getActionType(productState: ProductState): EActionButtonElementType {
    switch (productState) {
    case ProductState.Draft:
      return EActionButtonElementType.PRODUCT_CREATE;
    default:
      return EActionButtonElementType.PRODUCT_DETAILS;
    }
  }
}

