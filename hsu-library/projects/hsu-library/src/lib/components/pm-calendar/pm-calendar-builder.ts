import {
  DatePipe
} from '@angular/common';
import {
  FIRST_YEAR,
  LAST_YEAR,
  DAYS_PER_WEEK,
  PmCalendarCell,
  PmWeekDay
} from './pm-calendar.shared';

export class PmCalendarBuilder {
  constructor(private _datePipe: DatePipe, private _daysOffset: number) {
  }

  get daysOffset(): number {
    return this._daysOffset;
  }

  set daysOffset(value: number) {
    this._daysOffset = value;
  }

  /**
   * Creates an array of weekday strings.
   */
  public createWeekdayStrings(): PmWeekDay[] {
    const date: Date = new Date();
    date.setDate(date.getDate() - (date.getDay() + this.daysOffset));
    const weekdays: PmWeekDay[] = [];
    for (let pos: number = 0; pos < DAYS_PER_WEEK; pos++) {
      weekdays.push({
        long: this.getLongWeekday(date),
        narrow: this.getNarrowWeekday(date)
      });
      date.setDate(date.getDate() + 1);
    }
    return weekdays;
  }

  /**
   * Returns true if the given date is valid.
   * A valid date is a date that is not NaN and between year 1900 and 2100.
   * @param date
   * @return True if the date is valid
   */
  public validateDate(date: Date): boolean {
    if (isNaN(date.getTime())) {
      return false;
    }

    return !(date.getFullYear() < FIRST_YEAR || date.getFullYear() > LAST_YEAR);
  }

  /**
   * Creates an array of calendar cells representing the dates of the month.
   * @return The array of calendar cells
   */
  public createWeekCells(activeDate: Date, selected: Date | null = null): PmCalendarCell[][] {
    const daysInMonth: number = this.getNumberOfDaysInMonth(activeDate);
    const offset: number = this.getMonthDayOffset(activeDate);
    const weeks: PmCalendarCell[][] = [];

    if (offset % DAYS_PER_WEEK !== 0) {
      weeks.push([]);

      // previous month days to fill the first week
      for (let idx: number = 0; idx < offset; idx++) {
        weeks[0].push(this.createLastMonthDayCell(idx, activeDate, selected));
      }
    }

    // active month days
    for (let idx: number = 0; idx < daysInMonth; idx++) {
      if ((idx + offset) % DAYS_PER_WEEK === 0) {
        weeks.push([]);
      }

      weeks[weeks.length - 1].push(this.createActiveMonthDayCell(idx, activeDate, selected));
    }

    // next month days to fill the last week
    const daysToFill: number = DAYS_PER_WEEK - weeks[weeks.length - 1].length;
    for (let idx: number = 0; idx < daysToFill; idx++) {
      weeks[weeks.length - 1].push(this.createNextMonthDayCell(idx, activeDate, selected));
    }

    return weeks;
  }

  /**
   * Returns the narrow weekday string for the given date.
   * @param date The date to get the weekday string for
   * @return The weekday string
   */
  private getNarrowWeekday(date: Date): string {
    return this._datePipe.transform(date, 'EEEEE') ?? date.toLocaleDateString(undefined, {
      weekday: 'short'
    });
  }

  /**
   * Returns the long weekday string for the given date.
   * @param date The date to get the weekday string for
   * @return The weekday string
   */
  private getLongWeekday(date: Date): string {
    return this._datePipe.transform(date, 'EEEE') ?? date.toLocaleDateString(undefined, {
      weekday: 'long'
    });
  }

  private getMonthDayOffset(date: Date): number {
    const firstOfMonth: Date = new Date(date);
    firstOfMonth.setDate(1);

    return (firstOfMonth.getDay() + DAYS_PER_WEEK + this._daysOffset) % DAYS_PER_WEEK;
  }

  /**
   * Returns the number of days in the month of the given date.
   * @param date
   * @return The number of days in the month
   */
  private getNumberOfDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  private createLastMonthDayCell(idx: number, activeDate: Date, selected: Date | null = null): PmCalendarCell {
    const offset: number = this.getMonthDayOffset(activeDate);
    const date: Date = new Date(activeDate.getFullYear(), activeDate.getMonth(), -offset + idx + 1);

    return this.createDayCell(date, true, selected);
  }

  private createActiveMonthDayCell(idx: number, activeDate: Date, selected: Date | null = null): PmCalendarCell {
    const date: Date = new Date(activeDate.getFullYear(), activeDate.getMonth(), idx + 1);

    return this.createDayCell(date, false, selected);
  }

  private createNextMonthDayCell(idx: number, activeDate: Date, selected: Date | null = null): PmCalendarCell {
    const date: Date = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, idx + 1);

    return this.createDayCell(date, true, selected);
  }

  private createDayCell(date: Date, disabled: boolean, selected: Date | null = null): PmCalendarCell {
    return {
      hover: false,
      disabled: disabled,
      today: this.isSameDay(date, new Date()),
      selected: selected ? this.isSameDay(selected, date) : false,
      date: date
    };
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }
}
