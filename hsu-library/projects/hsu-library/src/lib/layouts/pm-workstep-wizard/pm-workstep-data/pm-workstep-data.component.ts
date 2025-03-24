import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { TextType } from '../../../components/pm-text/pm-text.shared';
import { EPmInputType } from '../../../components/pm-input/pm-input.component';
import {
  DefaultMargins, IComponentMargin, PmComponentMargin
} from '../../../utils/pm-component-margin';
import {
  IWorkstepDataLocalisations,
  WorkstepDataLocalisations
} from './pm-workstep-data.shared';
import { PmCheckboxState } from '../../../components/pm-checkbox/pm-checkbox.shared';
import {
  IStepMeasurementVariants,
  StepMeasurementVariants
} from '../pm-workstep-wizard.shared';
import { BannerType } from '../../../components/pm-banner/pm-banner.shared';

@Component({
  selector: 'pm-workstep-data',
  templateUrl: './pm-workstep-data.component.html',
  styleUrls: ['./pm-workstep-data.component.scss']
})
export class PmWorkstepDataComponent {

  protected readonly TextType: typeof TextType = TextType;
  protected readonly EPmInputType: typeof EPmInputType = EPmInputType;
  protected readonly DefaultMargins: typeof DefaultMargins = DefaultMargins;
  protected readonly PmCheckboxState: typeof PmCheckboxState = PmCheckboxState;
  protected readonly BannerType: typeof BannerType = BannerType;

  protected materialTextMargin: IComponentMargin = new PmComponentMargin(0, 0, DefaultMargins.Small, 0);

  @Input()
  localisations: IWorkstepDataLocalisations = WorkstepDataLocalisations;

  @Input()
  productStepData:IStepMeasurementVariants = new StepMeasurementVariants();

  @Input()
  showInfoBanner: boolean = false;

  @Input()
  infoBannerText: string = '';

  @Input()
  readonly: boolean = false;

  @Input()
  assemblyOnly: boolean = false;

  @Input()
  showSupplyOtherCraftsInWeeksInput: boolean = true;

  @Output()
  productStepDataChange: EventEmitter<IStepMeasurementVariants> = new EventEmitter<IStepMeasurementVariants>();

  @Output()
  onBannerClose: EventEmitter<void> = new EventEmitter();

  valueChanged() {
    this.productStepDataChange.emit(this.productStepData);
  }
}
