import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  EFillMode,
  IFillAssistantLocalisations,
  IFillRule,
  IFillSourceOption,
  FillAssistantLocalisations
} from '../pm-workstep-matrix/pm-workstep-matrix.shared';
import { IRadioButtonData, IRadioButtonEventData } from '../../components/pm-radiobutton/pm-radiobutton.shared';
import { PmDropdownOption } from '../../components/pm-dropdown/pm-dropdown.shared';
import { ButtonType } from '../../components/pm-button/pm-button.component';
import { EPmInputType } from '../../components/pm-input/pm-input.component';

@Component({
  selector: 'pm-matrix-fill-popover',
  templateUrl: './pm-matrix-fill-popover.component.html',
  styleUrls: ['./pm-matrix-fill-popover.component.scss']
})
export class PmMatrixFillPopoverComponent implements OnInit {
  protected readonly ButtonType = ButtonType;
  protected readonly EPmInputType = EPmInputType;

  @Input()
  localisations: IFillAssistantLocalisations = FillAssistantLocalisations;

  @Input()
  sourceOptions: IFillSourceOption[] = [];

  @Input()
  currentRule?: IFillRule;

  @Output()
  onApply: EventEmitter<IFillRule> = new EventEmitter<IFillRule>();

  @Output()
  onCancel: EventEmitter<void> = new EventEmitter<void>();

  radioGroup: IRadioButtonData[] = [];
  dropdownOptions: PmDropdownOption<string>[] = [];

  selectedMode: EFillMode = EFillMode.MANUAL;
  selectedSourceId?: string;
  percentageValue: number = 100;

  ngOnInit(): void {
    this.initFromCurrentRule();
    this.buildRadioGroup();
    this.buildDropdownOptions();
  }

  @HostListener('document:mousedown', ['$event'])
  private onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.onCancel.emit();
    }
  }

  constructor(private elementRef: ElementRef) {}

  private initFromCurrentRule(): void {
    if (this.currentRule) {
      this.selectedMode = this.currentRule.mode;
      this.selectedSourceId = this.currentRule.sourceId;
      this.percentageValue = this.currentRule.percentage ?? 100;
    }
  }

  private buildRadioGroup(): void {
    this.radioGroup = [
      {
        radioButtonId: EFillMode.MANUAL,
        disabled: false,
        groupName: 'fillMode',
        state: this.selectedMode === EFillMode.MANUAL,
        text: this.localisations.manualOption
      },
      {
        radioButtonId: EFillMode.COPY,
        disabled: false,
        groupName: 'fillMode',
        state: this.selectedMode === EFillMode.COPY,
        text: this.localisations.copyOption
      },
      {
        radioButtonId: EFillMode.PERCENTAGE,
        disabled: false,
        groupName: 'fillMode',
        state: this.selectedMode === EFillMode.PERCENTAGE,
        text: this.localisations.percentageOption
      }
    ];
  }

  private buildDropdownOptions(): void {
    this.dropdownOptions = this.sourceOptions.map((source: IFillSourceOption) => ({
      key: source.sourceId,
      value: source.label
    }));

    if (!this.selectedSourceId && this.dropdownOptions.length > 0) {
      this.selectedSourceId = this.dropdownOptions[0].key;
    }
  }

  onModeChange(updatedRadios: IRadioButtonEventData[]): void {
    const selected: IRadioButtonEventData | undefined = updatedRadios.find(
      (radio: IRadioButtonEventData) => radio.state
    );
    if (selected) {
      this.selectedMode = selected.radioButtonId as EFillMode;
    }
  }

  onSourceChange(sourceId: string): void {
    this.selectedSourceId = sourceId;
  }

  onPercentageChange(value: number): void {
    this.percentageValue = value;
  }

  get isApplyDisabled(): boolean {
    if (this.selectedMode === EFillMode.MANUAL) {
      return false;
    }
    if (!this.selectedSourceId) {
      return true;
    }
    if (this.selectedMode === EFillMode.PERCENTAGE && (!this.percentageValue || this.percentageValue <= 0)) {
      return true;
    }
    return false;
  }

  get showSourceDropdown(): boolean {
    return this.selectedMode === EFillMode.COPY || this.selectedMode === EFillMode.PERCENTAGE;
  }

  get showPercentageInput(): boolean {
    return this.selectedMode === EFillMode.PERCENTAGE;
  }

  apply(): void {
    const rule: IFillRule = {
      mode: this.selectedMode,
      sourceId: this.showSourceDropdown ? this.selectedSourceId : undefined,
      percentage: this.showPercentageInput ? this.percentageValue : undefined
    };
    this.onApply.emit(rule);
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
