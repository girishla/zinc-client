import { IJobCollection } from "./IJobCollection";

export interface IJobsState {
  data: IJobCollection[];
  loading: boolean;
}
