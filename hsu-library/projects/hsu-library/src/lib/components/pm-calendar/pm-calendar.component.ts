import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';
import {
  Icon,
  IconSize
} from '../pm-icon/pm-icon.shared';
import {
  PmCalendarBuilder
} from './pm-calendar-builder';
import {
  PmCalendarCell,
  PmWeekDay
} from './pm-calendar.shared';

@Component({
  selector: 'pm-calendar',
  templateUrl: './pm-calendar.component.html',
  styleUrls: ['./pm-calendar.component.scss'],
  providers: [DatePipe]
})
export class PmCalendarComponent implements OnInit, OnChanges {
  @Input()
  value: Date | null = null;

  @Input()
  activeDate: Date = new Date();

  // The offset (in days) to the first day of the week (0 = Sunday).
  // e.g. -1 for Monday
  @Input()
  daysOffset: number = -1;

  @Input()
  disabled: boolean = false;

  @Output()
  onInit: EventEmitter<PmCalendarCell[][]> = new EventEmitter();

  @Output()
  onSelect: EventEmitter<Date> = new EventEmitter();

  /**
   * List of translated weekday strings to display in the calendar header.
   * This list is generated on init and contains translations for the current locale.
   * It uses the same translations as the date pipe.
   * @ignore
   */
  protected weekdays: PmWeekDay[] = [];

  /**
   * Grid of calendar cells representing the dates of the month.
   * @ignore
   */
  protected weeks: PmCalendarCell[][] = [];

  /** @ignore */
  private pmCalendarBuilder: PmCalendarBuilder;

  /** @ignore */
  protected readonly Icon = Icon;

  /** @ignore */
  protected readonly IconSize = IconSize;

  constructor(datePipe: DatePipe) {
    this.pmCalendarBuilder = new PmCalendarBuilder(datePipe, this.daysOffset);
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Fix for storybook date argTypes being passed as integers
    if (changes['value']) {
      const newDate: Date = new Date(changes['value'].currentValue);
      this.value = newDate?.getTime() ? newDate : null;
    }

    if (changes['activeDate']) {
      const newDate: Date = new Date(changes['activeDate'].currentValue);
      this.activeDate = newDate?.getTime() ? newDate : new Date();
    }

    // Re-initialize the calendar when the input data changes (not related to the storybook fix above)
    this.init();
  }

  /** @ignore */
  public init() {
    this.checkInputData();

    this.value?.setHours(0, 0, 0, 0);
    this.activeDate.setHours(0, 0, 0, 0);

    this.pmCalendarBuilder.daysOffset = this.daysOffset;

    this.weekdays = this.pmCalendarBuilder.createWeekdayStrings();
    this.weeks = this.pmCalendarBuilder.createWeekCells(this.activeDate, this.value);

    this.onInit.emit(this.weeks);
  }

  /** @ignore */
  private checkInputData() {
    if (this.value && !this.pmCalendarBuilder.validateDate(this.value)) {
      this.value = null;
    }

    if (!this.pmCalendarBuilder.validateDate(this.activeDate)) {
      this.activeDate = new Date();
    }
  }

  /**
   * Changes the active month by the given offset
   * @param offset
   * @ignore
   */
  changeMonth(offset: number) {
    this.activeDate = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + offset, 1);

    this.init();
  }

  /** @ignore */
  protected selectDay(cell: PmCalendarCell) {
    if (this.disabled || cell.disabled) {
      return;
    }

    // unset all week days selected state
    this.weeks.forEach((week) => {
      week.forEach((day) => {
        day.selected = false;
      });
    });

    cell.selected = true;
    this.value = cell.date;

    this.onSelect.emit(new Date(this.value));
  }

  /** @ignore */
  protected hoverDay(cell: PmCalendarCell) {
    cell.hover = true;
  }

  /** @ignore */
  protected unhoverDay(cell: PmCalendarCell) {
    cell.hover = false;
  }
}
