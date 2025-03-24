const MILLISECONDS_PER_SECOND: number = 1000;
const SECONDS_PER_MINUTE: number = 60;
const MINUTES_PER_DAY: number = 1440;
const DAYS_PER_YEAR: number = 365;

export class DateTimeService {
  static yearsToDays(years: number): number {
    return DAYS_PER_YEAR * years;
  }

  static daysToMinutes(days: number): number {
    return MINUTES_PER_DAY * days;
  }

  static minutesToSeconds(minutes: number): number {
    return SECONDS_PER_MINUTE * minutes;
  }

  static secondsToMilliseconds(seconds: number): number {
    return MILLISECONDS_PER_SECOND * seconds;
  }

  static yearsInSeconds(years: number): number {
    return years * DAYS_PER_YEAR * MINUTES_PER_DAY * SECONDS_PER_MINUTE;
  }

  static getCurrentDateAndAddSeconds(seconds: number): Date {
    return new Date(new Date().getTime() + DateTimeService.secondsToMilliseconds(seconds));
  }
}
