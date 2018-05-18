import { IJobSchedule } from "../JobSchedule/IJobSchedule";

export interface IJobScheduleDetailState {
  data: IJobSchedule;
  snackBarOpen: boolean;
  snackBarMessage: string;
}
