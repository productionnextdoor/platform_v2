import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { PopupType } from '../../components/pm-popup/pm-popup.component';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { TextType } from '../../components/pm-text/pm-text.shared';
import {
  defaultWorkStepData,
  IWorkStepData,
  IWorkStepPopupLocalisations,
  workStepPopupLocalisations
} from './pm-work-step-popup.shared';
import {
  DefaultMargins,
  IMargin,
  PmComponentMargin
} from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-work-step-popup',
  templateUrl: './pm-work-step-popup.component.html',
  styleUrls: ['./pm-work-step-popup.component.scss']
})
export class PmWorkStepPopupComponent{

  @Input()
  public workStepData: IWorkStepData = defaultWorkStepData;

  @Input()
  public localisations: IWorkStepPopupLocalisations = workStepPopupLocalisations;

  @Output()
  onReturn: EventEmitter<void> = new EventEmitter();

  /** @ignore */
  protected readonly margins: IMargin = DefaultMargins;

  /** @ignore */
  protected readonly sectionMargin: PmComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  /** @ignore */
  protected readonly topMargin: PmComponentMargin = new PmComponentMargin(DefaultMargins.XLarge, 0, DefaultMargins.Small, 0);

  /** @ignore */
  protected readonly PopupType: typeof PopupType = PopupType;

  /** @ignore */
  protected readonly ButtonType: typeof ButtonType = ButtonType;

  /** @ignore */
  protected readonly TextType: typeof TextType = TextType;
}
