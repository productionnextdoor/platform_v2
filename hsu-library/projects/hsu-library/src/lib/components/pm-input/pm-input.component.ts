import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Icon,
  IconSize
} from '../pm-icon/pm-icon.shared';
import {
  IComponentMargin,
  PmComponentMargin,
} from '../../utils/pm-component-margin';

export enum EPmInputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  DATE = 'date',
  SEARCH = 'search',
}

export enum EPmAutocompleteState {
  ON = 'on',
  OFF = 'off'
}

@Component({
  selector: 'pm-input',
  templateUrl: './pm-input.component.html',
  styleUrls: ['./pm-input.component.scss']
})
export class PmInputComponent<T> implements OnInit {
  /** @ignore */
  @ViewChild('toggle', {
    static: false
  }) protected toggleElement!: ElementRef;

  /** @ignore */
  @ViewChild('inputField', {
    static: false
  }) protected inputFieldElement!: ElementRef;

  /** @ignore */
  @ViewChild('body', {
    static: false
  }) protected bodyElement!: ElementRef;

  @Input()
  public type: EPmInputType = EPmInputType.TEXT;

  @Input()
  public name: string = '';

  @Input()
  public inputId: string = this.name;

  @Input()
  public label: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public value?: T;

  @Input()
  public suggestions: T[] = [];

  @Input()
  public active: boolean = false;

  @Input()
  public disabled: boolean = false;

  @Input()
  public hovered: boolean = false;

  @Input()
  public unit: string = '';

  @Input()
  public required: boolean = false;

  @Input()
  public bold: boolean = false;

  @Input()
  public showBody: boolean = false;

  @Input()
  public activeDate: Date = new Date();

  @Input()
  public hasError: boolean = false;

  @Input()
  public errorMessages: string[] = [];

  @Input()
  public autocomplete: EPmAutocompleteState = EPmAutocompleteState.ON;

  @Input()
  public dynamicSize: boolean = false;

  @Input()
  public margin: IComponentMargin = new PmComponentMargin();

  @Input()
  public showPassword: boolean = false;

  @Input()
  public allowEmptyNumber: boolean = false;

  @Input()
  public hideErrorMessages: boolean = false;

  @Output()
  public valueChange: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  public onEmpty: EventEmitter<void> = new EventEmitter();

  /**
   * Used as a layer between the input and the datepicker so that the input field can work with a string value, while
   * the datepicker works with a Date object.
   * @ignore
   */
  protected date: Date | null = null;

  protected matchingSuggestions: T[] = [];

  /** @ignore */
  readonly EPmInputType: typeof EPmInputType = EPmInputType;

  /** @ignore */
  readonly Icon: typeof Icon = Icon;

  /** @ignore */
  readonly IconSize: typeof IconSize = IconSize;

  ngOnInit() {
    this.updateSuggestions(String(this.value ?? ''));

    if (typeof this.value === 'string' && this.type === EPmInputType.DATE) {
      this.date = this.value ? this.parseDate(this.value) : null;
    }
  }

  /** @ignore */
  @HostListener('document:mousedown', ['$event'])
  private onGlobalClick(event: Event): void {
    // Check if the click was inside the toggle button
    if (this.toggleElement?.nativeElement.contains(event.target)) {
      return;
    }

    // Check if the click was inside the datepicker
    if (this.bodyElement?.nativeElement.contains(event.target)) {
      return;
    }

    // Check if the input was clicked and there are suggestions
    if (this.suggestions.length > 0 && this.inputFieldElement?.nativeElement.contains(event.target)) {
      return;
    }

    this.showBody = false;
  }

  @HostListener('window:resize', ['$event'])
  private _windowResize(): void {
    this.updateBodyPosition();
  }

  @HostListener('window:scroll', ['$event'])
  private _windowScroll(): void {
    this.updateScrollPosition();
  }

  @ViewChild('body')
  set content(content: ElementRef) {
    this.updateBodyPosition();
  }

  protected inputOnHover(hovered: boolean): void {
    this.hovered = hovered;
  }

  protected inputOnFocus(focus: boolean): void {
    this.active = focus;

    if (this.type !== EPmInputType.DATE && focus) {
      this.showBody = true;
      this.updateBodyPosition();
    }
  }

  protected inputOnChange(event: Event): void {
    this.hasError = false;
    const element: HTMLInputElement = event.target as HTMLInputElement;
    const { value } = element;

    if (this.type === EPmInputType.NUMBER) {
      this.setNumberElementValueToString(element);
    }

    if (this.type === EPmInputType.DATE) {
      this.date = this.parseDate(value);
    }

    this.updateSuggestions(value);
    this.emitOnChangeEvents(element);
  }

  protected emitOnChangeEvents(element: HTMLInputElement): void {
    // send change event with bubbles so that other components can listen to changes directly without waiting for the
    // user to leave the input field.
    element.dispatchEvent(new Event('change', {
      bubbles: true
    }));
    const { value } = element;
    this.valueChange.emit(value as T);
    if (!this.value) {
      this.onEmpty.emit();
    }
  }

  protected setNumberElementValueToString(element: HTMLInputElement): void {
    let { value } = element;
    value = this.parseNumber(value);
    element.value = (value === '0' && this.allowEmptyNumber) ? '' : value;
  }

  protected parseNumber(value: string): string {
    return value
      .replace(/[.](?=.*[.])/g, '')
      .replace(/[^\d\-.]/g, '');
  }

  /**
   * @param str The string to parse
   * @returns The parsed date or null if the string could not be parsed
   * @ignore
   */
  protected parseDate(str: string): Date | null {
    let transformedStr: string = str
      // dd.mm.yy(yy), dd-mm-yy(yy) -> yy(yy)-mm-dd
      .replace(/^(\d\d?)[.-](\d\d?)[.-]((\d{2}){1,2})$/g, '$3-$2-$1')
      // mm/dd/yy(yy) -> yy(yy)-mm-dd
      .replace(/^(\d\d?)\/(\d\d?)\/((\d{2}){1,2})$/g, '$3-$1-$2');

    // check if year is 2 or 4 digits and add 20 if necessary
    if (transformedStr.match(/^\d{2}-\d\d?-\d\d?$/)) {
      transformedStr = '20' + transformedStr;
    }

    const date: Date = new Date(transformedStr);
    return isNaN(date.getTime()) ? null : date;
  }

  protected updateSuggestions(filterValue: string): void {
    this.matchingSuggestions = [];

    if (!filterValue) {
      return;
    }

    const value: string = filterValue.toLowerCase();
    this.matchingSuggestions = this.suggestions.filter((suggestion: T) => {
      return String(suggestion).toLowerCase().includes(value);
    });
  }

  protected toggleBodyVisibility() {
    this.showBody = !this.showBody;
    this.updateBodyPosition();
  }

  protected togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  protected onDateSelect(date: Date): void {
    this.date = date;
    this.value = date.toLocaleDateString('de-DE') as T;
    this.valueChange.emit(this.value);
    this.showBody = false;
  }

  protected onSuggestionSelection(suggestion: T): void {
    this.value = suggestion;
    this.valueChange.emit(this.value);
    this.showBody = false;
  }

  private updateBodyPosition(): void {
    if (!this.showBody || !this.bodyElement || !this.inputFieldElement) {
      return;
    }

    const { scrollY, innerHeight } = window;

    const dropdownPosition: DOMRect = this.inputFieldElement.nativeElement.getBoundingClientRect();
    const dropdownBody: HTMLElement = this.bodyElement.nativeElement;

    dropdownBody.style.top = `${scrollY + dropdownPosition.bottom}px`;
    dropdownBody.style.left = `${dropdownPosition.left}px`;
    dropdownBody.style.width = `${dropdownPosition.width}px`;

    const dropdownBodyPosition: DOMRect = dropdownBody.getBoundingClientRect();
    const dropdownBodyBottom: number = dropdownBodyPosition.bottom - scrollY;
    const windowHeight: number = innerHeight;
    const dropdownBodyHeight: number = dropdownBodyPosition.height;

    if (dropdownBodyBottom > windowHeight) {
      dropdownBody.style.top = `${scrollY + dropdownPosition.top - dropdownBodyHeight}px`;
    }

    this.updateScrollPosition();
  }

  private updateScrollPosition(): void {
    if (!this.bodyElement) {
      return;
    }

    const { scrollX, scrollY } = window;

    const dropdownBody: HTMLElement = this.bodyElement.nativeElement;

    dropdownBody.style.transform = `translate(${scrollX * -1}px, ${scrollY * -1}px)`;
  }
}
