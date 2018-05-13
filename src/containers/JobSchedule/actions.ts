import { createAction } from "typesafe-actions";
import { IJobSchedule } from "./IJobSchedule";

export const LOAD_JOBSCHEDULES_START =
  "zinc/JOBSCHEDULES/LOAD_JOBSCHEDULES_START";
export const LOAD_JOBSCHEDULES_SUCCESS =
  "zinc/JOBSCHEDULES/LOAD_JOBSCHEDULES_SUCCESS";
export const LOAD_JOBSCHEDULES_FAILURE =
  "zinc/JOBSCHEDULES/LOAD_JOBSCHEDULES_FAILURE";

export const jobScheduleActions = {
  loadJobSchedules: createAction(LOAD_JOBSCHEDULES_START),
  loadSchedulesSuccess: createAction(
    LOAD_JOBSCHEDULES_SUCCESS,
    (jobSchedules: IJobSchedule[]) => ({
      type: LOAD_JOBSCHEDULES_SUCCESS,
      jobSchedules
    })
  ),
  loadSchedulesFailure: createAction(
    LOAD_JOBSCHEDULES_FAILURE,
    (errorStr: string) => ({
      type: LOAD_JOBSCHEDULES_FAILURE,
      errorStr
    })
  )
};
