import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Icon, IconSize } from '../pm-icon/pm-icon.shared';
import { DROPDOWN_SPACING, PmDropdownOption } from './pm-dropdown.shared';
import { PmComponentMargin, IComponentMargin } from '../../utils/pm-component-margin';

@Component({
  selector: 'pm-dropdown',
  templateUrl: './pm-dropdown.component.html',
  styleUrls: ['./pm-dropdown.component.scss']
})
export class PmDropdownComponent<T> implements OnInit, OnChanges {

  protected readonly Icon: typeof Icon = Icon;

  protected readonly IconSize: typeof IconSize = IconSize;

  @Input()
  public name: string = '';

  @Input()
  public inputId: string = this.name;

  @Input()
  public label: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public options: PmDropdownOption<T>[] = [];

  @Input()
  public value?: T;

  @Input()
  public searchable: boolean = false;

  @Input()
  public hovered: boolean = false;

  @Input()
  public headHovered: boolean = false;

  @Input()
  public active: boolean = false;

  @Input()
  public hasError: boolean = false;

  @Input()
  public errorMessages: string[] = [];

  @Input()
  public disabled: boolean = false;

  @Input()
  public required: boolean = false;

  @Input()
  public margin: IComponentMargin = new PmComponentMargin();

  @Input()
  public hideErrorMessages: boolean = false;

  /** @ignore */
  protected text: string = '';

  /** @ignore */
  protected focused: boolean = false;

  /** @ignore */
  protected filteredOptions: PmDropdownOption<T>[] = [];

  /** @ignore */
  protected isZeroOptionSelected: boolean = false;

  @Output()
  onOpen: EventEmitter<void> = new EventEmitter();

  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  @Output()
  valueChange: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  onFilterOptions: EventEmitter<PmDropdownOption<T>[]> = new EventEmitter<PmDropdownOption<T>[]>();

  /** @ignore */
  @ViewChild('dropdownField', {
    static: false
  }) private dropdownFieldElement!: ElementRef;

  /** @ignore */
  @ViewChild('dropdownSearch', {
    static: false
  }) private dropdownSearchElement!: ElementRef;

  /** @ignore */
  @ViewChild('dropdownBody', {
    static: false
  }) private dropdownBodyElement!: ElementRef;

  public ngOnInit() {
    this.text = Array.isArray(this.options) ? this.options.find(
      field => field.key === this.value
    )?.value ?? '' : '';

    this.updateDropdown();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.text = Array.isArray(this.options) ? this.options.find(
        field => field.key === this.value
      )?.value ?? '' : '';
    }

    this.updateDropdown();
  }

  /** @ignore */
  @HostListener('document:mousedown', ['$event'])
  private _documentMouseDown(event: Event): void {
    if (!this.dropdownFieldElement || this.dropdownFieldElement.nativeElement.contains(event.target)) {
      return;
    }

    this.closeDropdown();
  }

  @HostListener('window:resize', ['$event'])
  private _windowResize(): void {
    this.updateBodyPosition();
  }

  @HostListener('window:scroll', ['$event'])
  private _windowScroll(): void {
    this.updateScrollPosition();
  }

  @ViewChild('contentPlaceholder')
  set content(content: ElementRef) {
    this.updateBodyPosition();
  }

  /** @ignore */
  protected inputOnHover(hovered: boolean): void {
    this.hovered = hovered;
  }

  /** @ignore */
  protected inputOnHeadHover(hovered: boolean): void {
    this.headHovered = hovered;
  }

  /** @ignore */
  protected inputOnFocus(focused: boolean): void {
    this.focused = focused;
  }

  /** @ignore */
  protected blur(): void {
    this.active = false;
    this.focused = false;

    if (!this.headHovered) {
      this.hovered = false;
    }
  }

  /** @ignore */
  protected closeDropdown(): void {
    if (this.active) {
      this.blur();
      this.onClose.emit();
    }
  }

  /** @ignore */
  protected openDropdown(): void {
    if (this.active) {
      return;
    }

    this.updateDropdown();

    this.active = true;
    this.onOpen.emit();
  }

  /** @ignore */
  protected toggleDropdown(event: Event): void {
    if (this.disabled || this.dropdownSearchElement?.nativeElement.contains(event.target)) {
      return;
    }

    if (this.active) {
      this.closeDropdown();
      return;
    }

    this.openDropdown();

    // Focus the search input after the dropdown is opened
    setTimeout(() => {
      if (this.dropdownSearchElement) {
        this.dropdownSearchElement.nativeElement.focus();
      }
    }, 0);
  }

  /** @ignore */
  protected selectOption(option: PmDropdownOption<T>): void {

    if (this.disabled) {
      return;
    }

    this.value = option.key;
    this.text = option.value;
    this.closeDropdown();

    this.valueChange.emit(this.value);

    // send change event with bubbles so that other components can listen to changes directly without waiting for the
    // user to leave the input field.
    this.dropdownFieldElement.nativeElement.dispatchEvent(new Event('change', {
      bubbles: true
    }));
  }

  private updateDropdown(): void {
    this.updateOptions();
    this.updateBodyPosition();
  }

  /** @ignore */
  protected updateOptions(): void {
    this.updateIsZeroOptionSelected();
    if (!this.searchable || !this.dropdownSearchElement) {
      this.filteredOptions = this.options;
      return;
    }

    const term: string = this.dropdownSearchElement.nativeElement.value;
    this.filteredOptions = this.options.filter(
      option => option.value.toLowerCase().includes(term.toLowerCase())
    );

    this.onFilterOptions.emit(this.filteredOptions);
  }

  /** @ignore */
  private updateIsZeroOptionSelected(): void {
    this.isZeroOptionSelected = this.options.some(
      option => option.key === 0
    ) && typeof this.value === 'number' && this.value === 0;
  }

  /** @ignore */
  private updateBodyPosition(): void {
    if (!this.dropdownBodyElement || !this.dropdownFieldElement) {
      return;
    }

    const { scrollY, innerHeight } = window;

    const dropdownPosition: DOMRect = this.dropdownFieldElement.nativeElement.getBoundingClientRect();
    const dropdownBody: HTMLElement = this.dropdownBodyElement.nativeElement;

    dropdownBody.style.top = `${scrollY + dropdownPosition.bottom + DROPDOWN_SPACING}px`;
    dropdownBody.style.left = `${dropdownPosition.left}px`;
    dropdownBody.style.width = `${dropdownPosition.width}px`;

    const dropdownBodyPosition: DOMRect = dropdownBody.getBoundingClientRect();
    const dropdownBodyBottom: number = dropdownBodyPosition.bottom - scrollY;
    const windowHeight: number = innerHeight;
    const dropdownBodyHeight: number = dropdownBodyPosition.height;

    if (dropdownBodyBottom > windowHeight) {
      dropdownBody.style.top = `${scrollY + dropdownPosition.top - dropdownBodyHeight - DROPDOWN_SPACING}px`;
    }

    this.updateScrollPosition();
  }

  private updateScrollPosition(): void {
    if (!this.dropdownBodyElement) {
      return;
    }

    const { scrollX, scrollY } = window;

    const dropdownBody: HTMLElement = this.dropdownBodyElement.nativeElement;

    dropdownBody.style.transform = `translate(${scrollX * -1}px, ${scrollY * -1}px)`;
  }
}
