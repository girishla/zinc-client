import { createAction } from "typesafe-actions";
import { IJobSchedule } from "../JobSchedule/IJobSchedule";

export const LOAD_JOBSCHEDULEDETAIL_START =
  "zinc/JOBSCHEDULEDETAIL/LOAD_JOBSCHEDULEDETAIL_START";
export const LOAD_JOBSCHEDULEDETAIL_SUCCESS =
  "zinc/JOBSCHEDULEDETAIL/LOAD_JOBSCHEDULEDETAIL_SUCCESS";
export const LOAD_JOBSCHEDULEDETAIL_FAILURE =
  "zinc/JOBSCHEDULEDETAIL/LOAD_JOBSCHEDULEDETAIL_FAILURE";

export const jobScheduleDetailActions = {
  loadJobScheduleDetail: createAction(
    LOAD_JOBSCHEDULEDETAIL_START,
    (scheduleName: string) => ({
      type: LOAD_JOBSCHEDULEDETAIL_START,
      scheduleName
    })
  ),
  loadScheduleDetailSuccess: createAction(
    LOAD_JOBSCHEDULEDETAIL_SUCCESS,
    (jobScheduleDetail: IJobSchedule) => ({
      type: LOAD_JOBSCHEDULEDETAIL_SUCCESS,
      jobScheduleDetail
    })
  ),
  loadScheduleDetailFailure: createAction(
    LOAD_JOBSCHEDULEDETAIL_FAILURE,
    (errorStr: string) => ({
      type: LOAD_JOBSCHEDULEDETAIL_FAILURE,
      errorStr
    })
  )
};
