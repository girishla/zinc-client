export interface IPresetTabState {
  minutes: any;
  hours: any;
  dayOfWeek: any;
  dayOfMonth: any;
  month: any;
  activeTime: string;
  minutesMultiple: boolean;
  hoursMultiple: boolean;
  hoursFrom?: string;
  hoursTo?: string;
  messageOpen: false;
  messageText: string;
  messageTitle: string;
}
