import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ButtonType } from '../../../components/pm-button/pm-button.component';
import {
  Icon,
  IconSize
} from '../../../components/pm-icon/pm-icon.shared';
import { ICardProperty } from '../../../shared/info-card-section-data.shared';
import { TextType } from '../../../components/pm-text/pm-text.shared';
import { DefaultMargins } from '../../../utils/pm-component-margin';

@Component({
  selector: 'pm-delivery-documents',
  templateUrl: './pm-delivery-documents.component.html',
  styleUrls: ['./pm-delivery-documents.component.scss']
})
export class PmDeliveryDocumentsComponent {

  @Input()
  title: string = '';

  @Input()
  fileList: ICardProperty[] = [];

  @Output()
  onDownloadClick: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;
  protected readonly Icon: typeof Icon = Icon;
  protected readonly IconSize: typeof IconSize = IconSize;
  protected readonly TextType: typeof TextType = TextType;
  protected readonly margins = DefaultMargins;
}





