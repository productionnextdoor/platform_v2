import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import {ButtonType} from '../../components/pm-button/pm-button.component';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { EPmInputType } from '../../components/pm-input/pm-input.component';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { TextType } from '../../components/pm-text/pm-text.shared';
import {
  IProductModel, IProductPopupButtons, IProductPopupTextOptions
} from './pm-product-popup.shared';
import {
  DefaultMargins, IMargin, PmComponentMargin
} from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-product-popup',
  templateUrl: './pm-product-popup.component.html',
  styleUrls: ['./pm-product-popup.component.scss']
})
export class PmProductPopupComponent {

  /** @ignore */
  protected readonly EButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly EPmInputType: typeof EPmInputType= EPmInputType;

  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly headerMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  /** @ignore */
  protected readonly textMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.XSmall, 0);

  @Input()
  title: string = '';

  @Input()
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
  }

  @Input()
  value: string = '';

  @Input()
  productModel: IProductModel = {
    productName: '',
    developerId: 0,
    description: '',
  }

  @Input()
  optionsDeveloper: PmDropdownOption<number>[] = [];

  @Input()
  optionsTest: PmDropdownOption<string>[] = [
    {
      key: '1',
      value: 'Selection 1'
    },
    {
      key: '2',
      value: 'Selection 2'
    },
  ];

  @Input()
  buttonLabel: IProductPopupButtons = {
    closeLabel: '',
    saveLabel: '',
    publishLabel: '',
  }

  @Input()
  inputErrorMessages: string[] = []

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  @Output()
  productModelChange: EventEmitter<IProductModel> = new EventEmitter();

  @Output()
  onSave: EventEmitter<void> = new EventEmitter();

  @Output()
  onPublish: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  onCloseHandler(): void {
    this.onClose.emit();
  }
}
