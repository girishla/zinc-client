import { createAction } from "typesafe-actions";
import { IJobCollection } from "./IJobCollection";

export const LOAD_JOBS = "zinc/JOBS/LOAD_JOBS";
export const LOAD_JOBS_SUCCESS = "zinc/JOBS/LOAD_JOBS_SUCCESS";
export const LOAD_JOBS_FAILURE = "zinc/JOBS/LOAD_JOBS_FAILURE";
export const EXECUTE_JOB = "zinc/JOB/EXECUTE_JOB";
export const EXECUTE_JOB_SUCCESS = "zinc/JOB/EXECUTE_JOB_SUCCESS";
export const EXECUTE_JOB_FAILURE = "zinc/JOB/EXECUTE_JOB_FAILURE";

export const jobsActions = {
  loadJobs: createAction(LOAD_JOBS),
  loadJobsSuccess: createAction(LOAD_JOBS_SUCCESS, (jobs: IJobCollection) => ({
    type: LOAD_JOBS_SUCCESS,
    jobs
  })),
  loadJobsFailure: createAction(LOAD_JOBS_FAILURE, (errorStr: string) => ({
    type: LOAD_JOBS_FAILURE,
    errorStr
  })),
  executeJob: createAction(EXECUTE_JOB, (jobName: string) => ({
    type: EXECUTE_JOB,
    jobName
  })),
  executeJobSuccess: createAction(EXECUTE_JOB_SUCCESS),
  executeJobFailure: createAction(EXECUTE_JOB_FAILURE, (errorStr: string) => ({
    type: EXECUTE_JOB_FAILURE,
    errorStr
  }))
};
