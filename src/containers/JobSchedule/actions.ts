import { createAction } from "typesafe-actions";
import { IJobSchedule } from "./IJobSchedule";

export const LOAD_JOBSCHEDULES_START =
  "zinc/JOBSCHEDULES/LOAD_JOBSCHEDULES_START";
export const LOAD_JOBSCHEDULES_SUCCESS =
  "zinc/JOBSCHEDULES/LOAD_JOBSCHEDULES_SUCCESS";
export const LOAD_JOBSCHEDULES_FAILURE =
  "zinc/JOBSCHEDULES/LOAD_JOBSCHEDULES_FAILURE";

export const DELETE_JOBSCHEDULE_START =
  "zinc/JOBSCHEDULE/DELETE_JOBSCHEDULE_START";
export const DELETE_JOBSCHEDULE_SUCCESS =
  "zinc/JOBSCHEDULE/DELETE_JOBSCHEDULE_SUCCESS";
export const DELETE_JOBSCHEDULE_FAILURE =
  "zinc/JOBSCHEDULE/DELETE_JOBSCHEDULE_FAILURE";

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
  ),
  deleteJobSchedule: createAction(
    DELETE_JOBSCHEDULE_START,
    (scheduleDetail: IJobSchedule) => ({
      type: DELETE_JOBSCHEDULE_START,
      scheduleDetail
    })
  ),
  deleteScheduleDetailSuccess: createAction(
    DELETE_JOBSCHEDULE_SUCCESS,
    (JOBSCHEDULE: IJobSchedule) => ({
      type: DELETE_JOBSCHEDULE_SUCCESS,
      JOBSCHEDULE
    })
  ),
  deleteScheduleDetailFailure: createAction(
    DELETE_JOBSCHEDULE_FAILURE,
    (errorStr: string) => ({
      type: DELETE_JOBSCHEDULE_FAILURE,
      errorStr
    })
  )
};
