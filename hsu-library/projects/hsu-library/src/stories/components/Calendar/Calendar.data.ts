interface ICalendarData {
  value: Date | null;
  activeDate: Date;
  disabled: boolean;
}

export const CalendarData: ICalendarData = {
  value: null,
  activeDate: new Date(), // Use a fixed date when using chromatic snapshots to avoid random failures
  disabled: false,
};
