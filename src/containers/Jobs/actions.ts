import { createAction } from "typesafe-actions";
import { IJobCollection } from "./IJobCollection";

export const LOAD_JOBS = "zinc/JOBS/LOAD_JOBS";
export const LOAD_JOBS_SUCCESS = "zinc/JOBS/LOAD_JOBS_SUCCESS";
export const LOAD_JOBS_FAILURE = "zinc/JOBS/LOAD_JOBS_FAILURE";



export const jobsActions = {

    loadJobs: createAction(LOAD_JOBS),
    loadJobsSuccess: createAction(LOAD_JOBS_SUCCESS, (jobs: IJobCollection) => ({
        type: LOAD_JOBS_SUCCESS,
        jobs,
    })),
    loadJobsFailure: createAction(LOAD_JOBS_FAILURE, (errorStr: string) => ({
        type: LOAD_JOBS_FAILURE,
        errorStr,
    })),

};