export const DAYS_PER_WEEK: number = 7;
export const FIRST_YEAR: number = 1900;
export const LAST_YEAR: number = 2100;

export interface PmCalendarCell {
  hover: boolean;
  disabled: boolean;
  today: boolean;
  selected: boolean;
  date: Date;
}

export interface PmWeekDay {
  long: string;
  narrow: string;
}
